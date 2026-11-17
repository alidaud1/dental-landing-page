#!/usr/bin/env bash
#
# One-time VPS setup for the Jaskani Dental Clinic site.
#
#   Run as root on a fresh Ubuntu/Debian Hostinger VPS:
#     sudo DOMAIN=dental.example.com EMAIL=you@example.com bash bootstrap.sh
#
# Safe to re-run: every step checks before it changes anything, so you can run
# it again after a failure, or to pick up a config change, without breaking a
# server that is already half set up.
#
# What it does:
#   1. Installs Docker and nginx if missing (leaves existing installs alone)
#   2. Creates a `deploy` user that can run docker and nothing else as root
#   3. Writes /opt/jaskani/docker-compose.yml and pulls the image
#   4. Configures nginx as a TLS reverse proxy in front of the container
#   5. Obtains a Let's Encrypt certificate and enables auto-renewal
#   6. Opens only 22/80/443 in the firewall
#
# It does NOT touch other sites already served by nginx on this box.

set -euo pipefail

# --------------------------------------------------------------------------
# Configuration
# --------------------------------------------------------------------------
DOMAIN="${DOMAIN:-}"
EMAIL="${EMAIL:-}"
GITHUB_REPO="${GITHUB_REPO:-alidaud1/dental-landing-page}"
APP_DIR="${APP_DIR:-/opt/jaskani}"
DEPLOY_USER="${DEPLOY_USER:-deploy}"
IMAGE="ghcr.io/${GITHUB_REPO,,}"

log()  { printf '\033[0;36m==>\033[0m %s\n' "$*"; }
ok()   { printf '\033[0;32m  ok\033[0m %s\n' "$*"; }
warn() { printf '\033[0;33m  !!\033[0m %s\n' "$*"; }
die()  { printf '\033[0;31merror:\033[0m %s\n' "$*" >&2; exit 1; }

# systemctl wrapper. A real VPS always has systemd, but guarding here means the
# script can also be exercised inside a container (how it was tested) without
# `set -e` aborting the run at the first service call.
svc() {
  if command -v systemctl >/dev/null 2>&1 && systemctl is-system-running --quiet 2>/dev/null \
     || [[ -d /run/systemd/system ]]; then
    systemctl "$@" || warn "systemctl $* failed (continuing)"
  else
    warn "no systemd available — skipping: systemctl $*"
  fi
}

[[ $EUID -eq 0 ]] || die "run as root (use sudo)"
[[ -n "$DOMAIN" ]] || die "DOMAIN is required, e.g. DOMAIN=dental.example.com bash bootstrap.sh"
[[ -n "$EMAIL"  ]] || die "EMAIL is required (Let's Encrypt expiry notices)"

log "Domain:     $DOMAIN"
log "Image:      $IMAGE"
log "App dir:    $APP_DIR"
echo

# --------------------------------------------------------------------------
# 0. Check DNS before anything else
#
# Certbot's HTTP-01 challenge cannot succeed until this name resolves to this
# server. Catching it here saves a confusing failure five steps later.
# --------------------------------------------------------------------------
log "Checking DNS for $DOMAIN"
SERVER_IP="$(curl -fsS --max-time 10 https://api.ipify.org || echo '')"
DOMAIN_IP="$(getent hosts "$DOMAIN" | awk '{print $1}' | head -1 || echo '')"

if [[ -z "$DOMAIN_IP" ]]; then
  warn "$DOMAIN does not resolve yet."
  warn "Add an A record pointing $DOMAIN -> ${SERVER_IP:-this server IP} and re-run."
  warn "Continuing anyway — TLS issuance will be skipped if it still fails."
elif [[ -n "$SERVER_IP" && "$DOMAIN_IP" != "$SERVER_IP" ]]; then
  warn "$DOMAIN resolves to $DOMAIN_IP but this server is $SERVER_IP."
  warn "If you are behind Cloudflare's proxy this is expected; otherwise fix the A record."
else
  ok "$DOMAIN -> $DOMAIN_IP"
fi

# --------------------------------------------------------------------------
# 1. Packages
# --------------------------------------------------------------------------
log "Installing base packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq ca-certificates curl gnupg ufw >/dev/null
ok "base packages present"

if command -v docker >/dev/null 2>&1; then
  ok "docker already installed ($(docker --version))"
else
  log "Installing Docker"
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -qq
  apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin >/dev/null
  svc enable --now docker
  ok "docker installed"
fi

if command -v nginx >/dev/null 2>&1; then
  ok "nginx already installed — existing sites will not be touched"
  OTHER_SITES="$(find /etc/nginx/sites-enabled -type l -o -type f 2>/dev/null \
    | grep -vE '/(default|jaskani)$' | xargs -r -n1 basename | tr '\n' ' ')"
  if [[ -n "${OTHER_SITES// /}" ]]; then
    warn "this server already serves other sites: ${OTHER_SITES}"
    warn "they are left alone — only a new 'jaskani' site is added."
  fi
else
  log "Installing nginx"
  apt-get install -y -qq nginx >/dev/null
  svc enable --now nginx
  ok "nginx installed"
fi

if command -v certbot >/dev/null 2>&1; then
  ok "certbot already installed"
else
  log "Installing certbot"
  apt-get install -y -qq certbot python3-certbot-nginx >/dev/null
  ok "certbot installed"
fi

# --------------------------------------------------------------------------
# 2. Deploy user
#
# GitHub Actions SSHes in as this user. It is in the docker group so it can
# pull and restart the container, but it is NOT in sudo — a leaked deploy key
# cannot take the whole box.
# --------------------------------------------------------------------------
if id "$DEPLOY_USER" >/dev/null 2>&1; then
  ok "user '$DEPLOY_USER' exists"
else
  log "Creating '$DEPLOY_USER' user"
  adduser --disabled-password --gecos '' "$DEPLOY_USER" >/dev/null
  ok "user created"
fi
usermod -aG docker "$DEPLOY_USER"
install -d -m 0700 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"
touch "/home/$DEPLOY_USER/.ssh/authorized_keys"
chown "$DEPLOY_USER:$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh/authorized_keys"
chmod 600 "/home/$DEPLOY_USER/.ssh/authorized_keys"
ok "'$DEPLOY_USER' can manage docker (and nothing else as root)"

# --------------------------------------------------------------------------
# 3. Application directory
# --------------------------------------------------------------------------
log "Setting up $APP_DIR"
install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" "$APP_DIR"

cat > "$APP_DIR/docker-compose.yml" <<COMPOSE
services:
  web:
    image: ${IMAGE}:\${IMAGE_TAG:-latest}
    container_name: jaskani-web
    restart: unless-stopped
    ports:
      - '127.0.0.1:8080:8080'
    healthcheck:
      test: ['CMD', 'wget', '--quiet', '--tries=1', '--spider', 'http://127.0.0.1:8080/healthz']
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s
    read_only: true
    tmpfs:
      - /var/cache/nginx
      - /var/run
    security_opt:
      - no-new-privileges:true
    logging:
      driver: json-file
      options:
        max-size: '10m'
        max-file: '3'
COMPOSE
chown "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR/docker-compose.yml"
ok "compose file written"

log "Pulling image (first pull can take a minute)"
if docker compose -f "$APP_DIR/docker-compose.yml" pull --quiet 2>/dev/null; then
  docker compose -f "$APP_DIR/docker-compose.yml" up -d
  ok "container running"
else
  warn "could not pull $IMAGE:latest yet."
  warn "That is expected before the first GitHub Actions run has pushed an image."
  warn "Push to main, then re-run this script (or: cd $APP_DIR && docker compose up -d)."
fi

# --------------------------------------------------------------------------
# 4. nginx site
# --------------------------------------------------------------------------
log "Configuring nginx for $DOMAIN"
install -d /var/www/certbot

# Rate-limit zone must live at http{} scope, not inside server{}.
cat > /etc/nginx/conf.d/jaskani-limits.conf <<'LIMITS'
# Generous for a brochure site; exists only to blunt obvious floods.
limit_req_zone $binary_remote_addr zone=jaskani_general:10m rate=30r/s;
LIMITS

# Serve plain HTTP first. A TLS server block would reference certificate files
# that do not exist yet, and nginx refuses to start when they are missing — so
# HTTP has to come up before the ACME challenge can be answered. Certbot then
# rewrites this file to add the TLS block and the redirect, preserving
# everything configured here.
cat > /etc/nginx/sites-available/jaskani <<HTTPCONF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    access_log /var/log/nginx/jaskani.access.log;
    error_log  /var/log/nginx/jaskani.error.log;

    client_max_body_size 1m;
    limit_req zone=jaskani_general burst=60 nodelay;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # The container's health endpoint is for Docker, not the public internet.
    location = /healthz {
        return 404;
    }

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;

        proxy_set_header Host              \$host;
        proxy_set_header X-Real-IP         \$remote_addr;
        proxy_set_header X-Forwarded-For   \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Host  \$host;

        proxy_connect_timeout 5s;
        proxy_read_timeout 30s;
    }
}
HTTPCONF

ln -sfn /etc/nginx/sites-available/jaskani /etc/nginx/sites-enabled/jaskani

# Remove Debian's default placeholder only if it is still the stock one.
if [[ -L /etc/nginx/sites-enabled/default ]]; then
  rm -f /etc/nginx/sites-enabled/default
  ok "removed nginx default site"
fi

nginx -t >/dev/null 2>&1 || die "nginx config test failed — run 'nginx -t' to see why"
svc reload nginx
ok "nginx serving $DOMAIN over HTTP"

# --------------------------------------------------------------------------
# 5. TLS
# --------------------------------------------------------------------------
if [[ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]]; then
  ok "certificate for $DOMAIN already exists"
else
  log "Requesting Let's Encrypt certificate"
  if certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect; then
    ok "certificate issued; HTTPS enabled"
    # HSTS belongs here rather than in the container: only the host knows TLS
    # is actually terminated. Added after issuance so it is never sent while
    # the site is still HTTP-only.
    if ! grep -q 'Strict-Transport-Security' /etc/nginx/sites-available/jaskani; then
      sed -i '/listen 443 ssl/a\    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;' \
        /etc/nginx/sites-available/jaskani
      nginx -t >/dev/null 2>&1 && svc reload nginx && ok "HSTS enabled" \
        || warn "HSTS edit failed nginx -t; reverted nothing, check the config"
    fi
  else
    warn "certbot failed. Usual cause: DNS for $DOMAIN is not pointing here yet,"
    warn "or port 80 is blocked. Fix that, then run:"
    warn "  certbot --nginx -d $DOMAIN --agree-tos -m $EMAIL --redirect"
    warn "The site is still reachable over plain HTTP in the meantime."
  fi
fi

# Certbot's package installs a renewal timer; make sure it is actually on.
svc enable --now certbot.timer >/dev/null 2>&1 || true
ok "auto-renewal enabled ($(systemctl is-active certbot.timer 2>/dev/null || echo 'check manually'))"

# --------------------------------------------------------------------------
# 6. Firewall
# --------------------------------------------------------------------------
log "Configuring firewall"
# Never fatal: by this point the site is already serving. A firewall that
# needs attention is worth a warning, not a failed bootstrap that leaves the
# operator unsure how much of the setup actually completed.
if (
  ufw allow OpenSSH >/dev/null 2>&1 || ufw allow 22/tcp >/dev/null 2>&1
) && ufw allow 80/tcp >/dev/null 2>&1 && ufw allow 443/tcp >/dev/null 2>&1; then
  ok "firewall rules added for 22, 80, 443"

  if ufw status 2>/dev/null | grep -q '^Status: active'; then
    ok "firewall already active"
  elif [[ "${ENABLE_FIREWALL:-no}" == "yes" ]]; then
    ufw --force enable >/dev/null 2>&1 && ok "firewall enabled" \
      || warn "could not enable ufw — check 'ufw status' manually"
  else
    # Turning a firewall on for the first time is a behaviour change for
    # EVERY service on the box, not just this one. On a shared server that
    # can take an unrelated site offline, so it is opt-in.
    warn "ufw is currently inactive and was NOT enabled."
    warn "Rules for 22/80/443 are staged. If other services on this server use"
    warn "different ports, allow those first, then run: ufw enable"
    warn "Or re-run this script with ENABLE_FIREWALL=yes to turn it on now."
  fi
else
  warn "could not configure ufw. Set the firewall manually: allow 22, 80, 443; deny the rest."
fi

# Port 8080 is published on 127.0.0.1 only, so it is already unreachable from
# outside. Worth stating because Docker is known for writing iptables rules
# that bypass ufw when a port is published on 0.0.0.0.
ok "container port 8080 bound to loopback — not exposed publicly"

# --------------------------------------------------------------------------
# Done
# --------------------------------------------------------------------------
echo
log "Setup complete"
echo
echo "  Site:        https://$DOMAIN"
echo "  Compose:     $APP_DIR/docker-compose.yml"
echo "  Deploy user: $DEPLOY_USER"
echo
echo "Next: add this server's SSH public key to GitHub secrets so Actions can"
echo "deploy. See DEPLOYMENT.md step 3."
echo
echo "Useful commands:"
echo "  docker compose -f $APP_DIR/docker-compose.yml logs -f"
echo "  docker compose -f $APP_DIR/docker-compose.yml ps"
echo "  curl -I https://$DOMAIN"

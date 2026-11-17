# Deployment

Push to `main` → GitHub Actions builds a Docker image → VPS pulls it and
restarts. No manual step after the one-time setup below.

```
  git push origin main
         │
         ▼
  GitHub Actions ──build──▶ ghcr.io/alidaud1/dental-landing-page:<sha>
         │
         └──ssh──▶ VPS: docker compose pull && up -d
                        │
                        ▼
                  nginx (TLS) ──▶ container :8080 ──▶ static files
```

**Total setup time: about 15 minutes.** Four steps, done once.

---

## This deployment

| | |
|---|---|
| VPS | `31.97.188.80` (Hostinger, Ubuntu 22.04, nginx 1.18 already installed) |
| Hostname | `jaskani.techtrigger.org` |
| DNS | Managed at Hostinger (`ns1/ns2.dns-parking.com`) |
| Image | `ghcr.io/alidaud1/dental-landing-page` |
| Form email | `farmanbaloch47466@gmail.com` via Web3Forms |

> **This VPS already hosts `dagcai.com`.** Everything below is written to leave
> it alone — see "If the server already hosts other sites" under step 2.

> `techtrigger.org` itself resolves to Hostinger shared hosting, not this VPS.
> Adding a subdomain A record does not affect the main site.

---

## Step 1 — Point DNS at the VPS

In **hPanel → Domains → techtrigger.org → DNS / Nameservers**, add:

| Type | Name | Points to | TTL |
|---|---|---|---|
| A | `jaskani` | `31.97.188.80` | 14400 |

Leave every existing record alone — the root `A` records and the `www` CNAME
point at Hostinger shared hosting and must stay as they are.

Wait for it to propagate before step 2 — usually a few minutes:

```bash
dig +short jaskani.techtrigger.org
# must print 31.97.188.80
```

> Certbot cannot issue a certificate until this resolves to the VPS. The
> bootstrap script checks and warns you rather than failing confusingly.

---

## Step 2 — Run the bootstrap script on the VPS

SSH in as root and run:

```bash
curl -fsSL https://raw.githubusercontent.com/alidaud1/dental-landing-page/main/deploy/bootstrap.sh -o bootstrap.sh

# Read it before running it — never pipe a remote script straight into bash.
less bootstrap.sh

sudo DOMAIN=jaskani.techtrigger.org EMAIL=ahmed.media71@gmail.com bash bootstrap.sh
```

It installs Docker, nginx and certbot (skipping anything already present),
creates a `deploy` user, writes `/opt/jaskani/docker-compose.yml`, configures
nginx as a TLS reverse proxy, obtains a Let's Encrypt certificate, and limits
the firewall to ports 22, 80 and 443.

**It is safe to re-run.** Every step checks before changing anything, so if
something fails you can fix the cause and run it again.

On the first run it will warn that it cannot pull the image yet — that is
expected, because Actions has not pushed one. It gets resolved by step 4.

### If the server already hosts other sites

This VPS (31.97.188.80) already serves another production site, so the script
is deliberately conservative:

- It only adds a new `jaskani` nginx site. Other `sites-enabled` entries are
  untouched, and the script lists any it finds so nothing is a surprise.
- It removes `sites-enabled/default` — the stock nginx welcome page — only if
  that is still a symlink to Debian's default.
- Certbot is called with `-d <your domain>` only, so no existing certificate
  is touched or renewed differently.
- **It stages firewall rules but does not switch ufw on.** Enabling a firewall
  for the first time changes behaviour for every service on the box, which on
  a shared server can take an unrelated site offline. Allow any other ports
  you need first, then run `ufw enable` yourself — or re-run the script with
  `ENABLE_FIREWALL=yes`.
- Image cleanup prunes only dangling layers, never tagged images belonging to
  other projects.

---

## Step 3 — Give Actions SSH access

### Generate a deploy key

On the **VPS**:

```bash
sudo -u deploy ssh-keygen -t ed25519 -f /home/deploy/.ssh/deploy_key -N "" -C "github-actions"
sudo -u deploy sh -c 'cat /home/deploy/.ssh/deploy_key.pub >> /home/deploy/.ssh/authorized_keys'

echo "--- PRIVATE KEY (copy all of it, including BEGIN/END lines) ---"
sudo cat /home/deploy/.ssh/deploy_key

echo "--- KNOWN HOSTS ---"
ssh-keyscan -H "$(curl -fsS https://api.ipify.org)" 2>/dev/null
```

### Add the secrets

In GitHub → **Settings → Secrets and variables → Actions → Secrets**:

| Secret | Value |
|---|---|
| `VPS_HOST` | Your VPS IP address |
| `VPS_SSH_KEY` | The entire private key from above |
| `VPS_KNOWN_HOSTS` | The `ssh-keyscan` output |
| `VPS_USER` | `deploy` *(optional — defaults to `deploy`)* |
| `VPS_PORT` | `22` *(optional — only if you changed the SSH port)* |

> `VPS_KNOWN_HOSTS` is optional but worth setting. Without it the workflow
> trusts whatever host key it sees on first connection, which is one more thing
> that could go wrong quietly.

This key can run Docker and nothing else as root. If it leaks, someone can
redeploy the site — not take the server.

---

## Step 4 — Add the site variables

Same page, **Variables** tab (not Secrets):

| Variable | Value | Why |
|---|---|---|
| `SITE_DOMAIN` | `jaskani.techtrigger.org` | Used by the post-deploy health check |
| `DEPLOY_TO_VPS` | `true` | **The on/off switch.** Leave unset until steps 2 and 3 are done; deploys skip cleanly until then |
| `VITE_WEB3FORMS_KEY` | `a7eea725-1feb-4bcd-b7b8-624f972b2c2d` | **Already set.** Without it the live form runs in demo mode |

### The build-time gotcha

Vite inlines `VITE_*` variables **when the image is built**, not when the
container starts. Consequences:

- Setting the key on the VPS does nothing. It must be a **GitHub variable**.
- Changing the key requires a **rebuild**, not a restart. Push a commit, or run
  the Deploy workflow manually.

The workflow warns you in the build log and the run summary if the key is
missing, so this fails loudly rather than silently.

### Getting the key

The destination email is **not** stored in this codebase — it is whatever
address the key was registered against. For this site that is
`farmanbaloch47466@gmail.com` (client-supplied).

1. Go to <https://web3forms.com>
2. Enter `farmanbaloch47466@gmail.com` in the "Create Access Key" box
3. **The client clicks the confirmation link in that inbox.** You cannot do
   this step for them — Web3Forms will not issue the key until the address is
   confirmed by whoever owns it.
4. The client sends you the key; paste it into the `VITE_WEB3FORMS_KEY`
   repository variable

The key is public-by-design — it only permits sending to that one confirmed
address and cannot read past submissions — which is why it is a variable
rather than a secret.

### Changing the destination later

Register a new key against the new address and replace the variable, then
rebuild. Editing anything in this repo will not redirect the emails.

---

## Step 5 — Turn deployment on

Only once steps 2 and 3 are complete, set the switch:

```bash
gh variable set DEPLOY_TO_VPS --body true --repo alidaud1/dental-landing-page
```

Until this is `true`, every push builds and publishes the image but skips the
deploy with a notice. That keeps the setup period green instead of failing on
every commit — but it also means **nothing reaches the server until you flip
it**. After it is on, a missing secret is a hard failure, which is correct.

Then trigger a run:

```bash
git commit --allow-empty -m "Trigger first deploy"
git push origin main
```

Watch it in the Actions tab. It will build, push to GHCR, pull on the VPS, wait
for the container to report healthy, and then verify the live URL actually
returns the clinic site.

Then open `https://jaskani.techtrigger.org`.

### After the first successful deploy

Update the form's registered URL in the Web3Forms dashboard → your form →
**Form Details** → from `http://localhost:5173/#appointment` to:

```
https://jaskani.techtrigger.org/#appointment
```

This field is a label used to identify the form in the dashboard, not an
access restriction — submissions are not blocked by origin — so it is
cosmetic. Worth doing anyway so the dashboard is not misleading later.

Then submit one real request on the live site and confirm it arrives at
`farmanbaloch47466@gmail.com`. Testing the production build matters
separately from the local one: the key is baked in at build time, so a
working local form proves nothing about what the deployed image contains.

---

## Rolling back

Every deploy is tagged with its commit SHA, so rollback is picking an older tag:

**From GitHub:** Actions → Deploy → *Run workflow* → enter a previous short SHA
in `image_tag`. It skips the build and redeploys that image.

**From the VPS:**

```bash
cd /opt/jaskani
IMAGE_TAG=abc1234 docker compose up -d
```

The deploy also rolls back **by itself** if the new container fails its health
check — it restores the previous image rather than leaving the site down.

---

## Operations

```bash
# Logs
docker compose -f /opt/jaskani/docker-compose.yml logs -f

# What is running
docker compose -f /opt/jaskani/docker-compose.yml ps
docker inspect --format '{{.Config.Image}}' jaskani-web

# Restart
docker compose -f /opt/jaskani/docker-compose.yml restart

# nginx
sudo nginx -t && sudo systemctl reload nginx
sudo tail -f /var/log/nginx/jaskani.error.log

# Certificates (renewal is automatic via certbot.timer)
sudo certbot certificates
sudo certbot renew --dry-run
```

---

## Troubleshooting

**Form says "not sent" on the live site**
`VITE_WEB3FORMS_KEY` was not set when the image was built. Add the variable,
then push a commit or re-run the Deploy workflow. A restart will not fix it.

**Deploy succeeds but the site is unchanged**
Browsers cache `index.html` for a moment; hard-refresh. If it persists, check
which image is actually running:
`docker inspect --format '{{.Config.Image}}' jaskani-web`

**502 Bad Gateway**
nginx is up but the container is not. `docker compose ps` and
`docker compose logs web` on the VPS.

**Certbot failed during bootstrap**
Almost always DNS not yet pointing at the VPS, or port 80 blocked. Fix, then:
`sudo certbot --nginx -d jaskani.techtrigger.org --agree-tos -m ahmed.media71@gmail.com --redirect`

**Actions fails at "Check required configuration"**
A secret or variable is missing — the error message names which one.

**Permission denied (publickey)**
The private key in `VPS_SSH_KEY` must include the `-----BEGIN`/`-----END`
lines, and its public half must be in `/home/deploy/.ssh/authorized_keys`.

---

## What runs where

| Concern | Where | File |
|---|---|---|
| Build, type-check, lint | GitHub Actions | `.github/workflows/deploy.yml` |
| PR checks | GitHub Actions | `.github/workflows/ci.yml` |
| Image definition | Both | `Dockerfile` |
| Compression, caching, CSP | Container nginx | `deploy/container-nginx.conf` |
| TLS, domain, HSTS, rate limit | Host nginx | written by `deploy/bootstrap.sh` |
| Container runtime | VPS | `/opt/jaskani/docker-compose.yml` |

Caching and security headers live **inside the image** deliberately, so they are
versioned with the code and travel with a rollback instead of drifting out of
sync with the server.

---

## Cost

GHCR and Actions are free for public repositories, with no storage cap or
minute limit. The only cost is the VPS itself.

If you ever make this repository private, the free tier gives 2,000 Actions
minutes and 500 MB of GHCR storage per month. At ~55 MB per image and ~90s per
deploy, minutes are not a concern but storage is — you would want to prune to
the last few tags.

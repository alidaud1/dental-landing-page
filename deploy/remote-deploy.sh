#!/usr/bin/env bash
#
# Runs ON THE VPS, piped in over SSH by .github/workflows/deploy.yml:
#
#   ssh deploy@host "IMAGE_TAG=abc123 bash -s" < deploy/remote-deploy.sh
#
# It lives in the repo rather than inside a heredoc in the workflow so that it
# can be syntax-checked and tested like any other script — a heredoc nested in
# a YAML block scalar is both unreadable and impossible to lint.
#
# Contract: IMAGE_TAG must be set. Exits non-zero if the new container does not
# become healthy, after first restoring whatever was running before.

set -euo pipefail

APP_DIR="${APP_DIR:-/opt/jaskani}"
CONTAINER="${CONTAINER:-jaskani-web}"
HEALTH_TIMEOUT_SECONDS="${HEALTH_TIMEOUT_SECONDS:-60}"

: "${IMAGE_TAG:?IMAGE_TAG must be set}"

cd "$APP_DIR"

echo "Deploying tag: ${IMAGE_TAG}"

# Remember what is running, so a failed rollout can be undone rather than
# leaving the site down.
PREVIOUS_IMAGE="$(docker inspect --format '{{.Config.Image}}' "$CONTAINER" 2>/dev/null || true)"
echo "Currently running: ${PREVIOUS_IMAGE:-nothing}"

export IMAGE_TAG
docker compose pull --quiet
docker compose up -d --remove-orphans

echo "Waiting up to ${HEALTH_TIMEOUT_SECONDS}s for the container to report healthy..."
STATUS="unknown"
DEADLINE=$(( SECONDS + HEALTH_TIMEOUT_SECONDS ))
while (( SECONDS < DEADLINE )); do
  STATUS="$(docker inspect --format '{{.State.Health.Status}}' "$CONTAINER" 2>/dev/null || echo 'missing')"
  if [[ "$STATUS" == "healthy" ]]; then
    break
  fi
  sleep 2
done

if [[ "$STATUS" != "healthy" ]]; then
  echo "ERROR: container did not become healthy (last status: ${STATUS})." >&2
  echo "--- recent logs ---" >&2
  docker compose logs --tail 50 web >&2 || true

  if [[ -n "$PREVIOUS_IMAGE" ]]; then
    echo "Rolling back to ${PREVIOUS_IMAGE}" >&2
    IMAGE_TAG="${PREVIOUS_IMAGE##*:}" docker compose up -d || true
    echo "Rollback issued." >&2
  else
    echo "No previous image to roll back to." >&2
  fi
  exit 1
fi

echo "Container healthy."

# Keep the disk tidy. Images still referenced by a tag are untouched, so the
# rollback targets from recent deploys survive.
docker image prune -af --filter 'until=168h' >/dev/null 2>&1 || true

echo "Deploy complete: ${IMAGE_TAG}"

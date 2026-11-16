# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Stage 1 — build
#
# Vite inlines every VITE_* variable at BUILD time, so VITE_WEB3FORMS_KEY has
# to be present here, not on the server. If it is missing the site still builds
# and runs, but the appointment form falls back to demo mode and tells visitors
# their request was not sent. That is the intended safe default — never a
# silent failure — but it does mean a production build without the key will not
# deliver appointments.
# ---------------------------------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Copy manifests first so `npm ci` is cached until dependencies actually change.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_WEB3FORMS_KEY=""
ARG VITE_APPOINTMENT_ENDPOINT=""
ENV VITE_WEB3FORMS_KEY=$VITE_WEB3FORMS_KEY
ENV VITE_APPOINTMENT_ENDPOINT=$VITE_APPOINTMENT_ENDPOINT

# Fails the build on type errors as well — `npm run build` runs `tsc -b` first.
RUN npm run build

# Make the form's mode visible in the build log, so a missing key is obvious
# in CI rather than being discovered on the live site.
RUN if [ -n "$VITE_WEB3FORMS_KEY" ]; then \
      echo "Appointment form: LIVE (Web3Forms key present)"; \
    else \
      echo "WARNING: no VITE_WEB3FORMS_KEY — appointment form will run in DEMO mode"; \
    fi

# ---------------------------------------------------------------------------
# Stage 2 — serve
#
# nginx:alpine with only the built assets. No Node, no source, no node_modules
# in the final image — it comes out around 55MB, almost all of it nginx itself.
# ---------------------------------------------------------------------------
FROM nginx:1.27-alpine AS runtime

# Replace the default site with our own config.
RUN rm /etc/nginx/conf.d/default.conf
COPY deploy/container-nginx.conf /etc/nginx/conf.d/site.conf
COPY deploy/security-headers.inc /etc/nginx/conf.d/security-headers.inc

COPY --from=build /app/dist /usr/share/nginx/html

# Listens on 8080 so the container never needs a privileged port; the host
# nginx reverse-proxies to it on loopback.
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]

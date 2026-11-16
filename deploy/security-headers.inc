# Applied to HTML responses. Asset responses skip these deliberately — they
# add bytes to every file for no benefit on a .js or .webp.

add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;

# CSP tuned to what this site actually loads:
#   - Google Fonts stylesheets (fonts.googleapis.com) and font files
#     (fonts.gstatic.com)
#   - the Web3Forms endpoint, which the appointment form POSTs to
#   - 'unsafe-inline' for styles only: Tailwind emits a stylesheet, but React
#     sets a handful of inline style attributes (parallax offsets, the select
#     chevron data-URI), which inline styles cover.
# No inline scripts are used, so script-src stays strict.
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://api.web3forms.com; form-action 'self' https://api.web3forms.com; frame-ancestors 'self'; base-uri 'self'; object-src 'none'" always;

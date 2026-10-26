FROM node:24-bookworm

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl git nginx tar \
  && curl -fsSL https://github.com/cli/cli/releases/download/v2.62.0/gh_2.62.0_linux_amd64.tar.gz \
    | tar -xz -C /usr/local --strip-components=1 \
  && corepack enable \
  && corepack prepare pnpm@11.0.9 --activate \
  && rm -f /etc/nginx/sites-enabled/default \
  && rm -rf /var/lib/apt/lists/*

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]

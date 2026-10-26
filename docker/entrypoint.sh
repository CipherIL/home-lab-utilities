#!/bin/sh
set -eu

if [ -z "${GH_TOKEN:-}" ]; then
  echo "Set GH_TOKEN to a GitHub token that can read CipherIL/home-lab-utilities." >&2
  exit 1
fi

gh auth setup-git
mkdir -p /srv/utils

if [ ! -d /srv/utils/src/.git ]; then
  gh repo clone CipherIL/home-lab-utilities /srv/utils/src -- --branch main
fi

node /srv/utils/src/scripts/deploy.mjs --root /srv/utils
node /srv/utils/src/scripts/write-nginx.mjs /etc/nginx/conf.d/utils.conf
nginx -g "daemon off;"

# Utils index

A page of browser utilities for the local network. The server clones this repository, builds the page, and downloads the pinned utility releases.

## Install

Docker Compose 2.17 or newer. The repository is public, so no token is required.

1. Copy `docker-compose.yml` into an empty directory on the server.
2. From that directory, run:

```bash
docker compose up -d --build
```

3. From any machine on the LAN, open `http://<server-address>:8080/`.

The container clones `main`, installs dependencies, builds the index, and runs `scripts/fetch-web-releases.mjs` for every utility that has a `release` in `lib/utility/utilities.json`. Nginx serves the index at `/` and each downloaded utility under its own path. The site listens on port 8080.

## Update

```bash
docker compose restart
```

The container pulls `main` again and downloads the pinned releases. Run `docker compose up -d --build` when `docker-compose.yml` itself has changed.

## What is downloaded

PhotoCraft is pinned in the catalog and is downloaded as the official web zip. LightCraft and PDFCraft are listed on the index and have no release yet, so the container does not download them.

Recently used is stored in the browser under `utils-index:recent`. It does not sync between machines.

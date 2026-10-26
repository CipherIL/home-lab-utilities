# Utils index

Static index of browser utilities. The Next.js app is this page only. Each utility is a separate folder on the web server, and the browser downloads it when a normal link opens that path.

## Add a utility

1. Add an entry to `lib/utility/utilities.json`. `path` is the same-host URL the card opens. Add `release` when an official web zip should be downloaded.
2. Put that utility's files in a folder of the same name on the server. Do not import them into this app.
3. Keep the link as `<a href data-utility>`. Next.js intercepts ordinary same-host anchors, so the index handles that click itself and loads the path with `window.location`. A Next.js `<Link>` would prefetch a route in this app.

The first entries are LightCraft, PdfCraft, and PhotoCraft. LightCraft and PdfCraft are not in this repository.

`lib/utility/utilities.json` is the catalog for the page and for `pnpm fetch-utilities`. A utility with a `release` is downloaded at that tag, not at whatever release is newest. PhotoCraft is pinned to `v0.15.1`. LightCraft and PdfCraft have no release yet, so the script skips them.

## Development

Work on a branch. `pnpm dev` serves the index. `pnpm fetch-utilities` unpacks pinned releases into `public/<id>/`, which this dev server can serve and git ignores. The PhotoCraft card opens `/photo-craft/index.html`. Merge into `main` when the branch is ready. The server follows `main` only.

Do not leave `public/photo-craft/` in place for `pnpm build` if that build should stay the index only. Next copies `public/` into `out/`. A clean checkout does not contain that folder.

## Scripts

```bash
pnpm dev
pnpm build
pnpm fetch-utilities
```

`pnpm build` writes the index to `out/`. On a clean checkout `public/photo-craft/` is absent, so `out/` stays the index only.

## Server

On the server, from a checkout of this repo, with Docker running:

```bash
GH_TOKEN=<token> docker compose up -d --build
```

The token needs read access to the private repository `CipherIL/home-lab-utilities`. The container clones or updates `main`, then runs install, build, and the pinned utility fetch. Nginx serves the result on port 8080, on every interface, so another machine on the LAN opens `http://<server-address>:8080/`. Starting the container again updates `main` and fetches the pinned releases. This command has not been run on the server. The hosts name `utils.home.arpa` is still a separate step.

Recently used is stored in this browser's `localStorage` under `utils-index:recent`. It does not sync between machines.

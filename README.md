# Utils index

Static index of browser utilities. The Next.js app is this page only. Each utility is a separate folder on the web server, and the browser downloads it when a normal link opens that path.

## Add a utility

1. Add an entry to `lib/utilities.ts`. `path` is a same-host path with a trailing slash, such as `/lightcraft/`.
2. Put that utility's files in a folder of the same name on the server. Do not import them into this app.
3. Keep the link as `<a href data-utility>`. Next.js intercepts ordinary same-host anchors, so the index handles that click itself and loads the path with `window.location`. A Next.js `<Link>` would prefetch a route in this app.

The first entries are LightCraft, PdfCraft, and PhotoCraft. Their files are not in this repository.

## Scripts

```bash
pnpm dev
pnpm build
```

`pnpm build` writes the static site to `out/`. Serve `out/` at `/`. Serve each utility folder at `/<name>/`. `.wasm` files must be `application/wasm`.

Recently used is stored in this browser's `localStorage` under `utils-index:recent`. It does not sync between machines.

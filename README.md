# Envorca Website

Marketing / download site for [Envorca](https://github.com/debudebuye/envorca) — Linux development on Windows just works.

## Contents

- `index.html` — single-page site (hero, features, install, usage, requirements)
- `styles.css` — dark developer-infrastructure theme (navy + cyan, matches the brand)
- `assets/banner.svg` — the Envorca logo banner
- `favicon.svg` — site favicon

## Download link

The site links the rolling nightly binary release:

```
https://github.com/debudebuye/envorca/releases/download/nightly/envorca-windows-amd64.zip
```

This zip is rebuilt on every push to `main` of the [envorca](https://github.com/debudebuye/envorca) repo, so the link always serves the latest binaries.

## Structure

Static HTML/CSS — no build step, no dependencies. Open `index.html` in a browser or serve it with any static file server:

```sh
python -m http.server 8080
```
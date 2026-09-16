# Envorca Website

Next.js marketing / download site for [Envorca](https://github.com/debudebuye/envorca) — Linux development on Windows just works.

## Stack

- **Next.js 15** (App Router) + **React 19**
- TypeScript
- Static HTML/CSS (no runtime deps, no data fetching)

## Getting started

```sh
npm install
npm run dev      # http://localhost:3000
```

Production build:

```sh
npm run build
npm run start
```

## Download link

The site links the rolling nightly binary release:

```
https://github.com/debudebuye/envorca/releases/download/nightly/envorca-windows-amd64.zip
```

This zip is rebuilt on every push to `main` of the [envorca](https://github.com/debudebuye/envorca) repo, so the link always serves the latest binaries.

## Layout

```
app/
  layout.tsx       root layout + SEO metadata + theme script (FOUC guard)
  page.tsx         single-page site (hero, terminal demo, features, install, usage)
  globals.css      theme system: dark (default) + light, navy/cyan dev-tool theme
  ThemeProvider.tsx  light/dark context — honors prefers-color-scheme, persists in localStorage
  ThemeToggle.tsx    sun/moon toggle in the nav
  InstallSnippet.tsx install command block with a copy button
public/
  banner.svg      the Envorca logo banner
  favicon.svg     site favicon
```
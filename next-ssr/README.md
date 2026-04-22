# MovieApp (SSR — Next.js App Router)

Misma funcionalidad que la versión SPA: listado de populares, detalle y búsqueda, implementada con **Next.js 16 (App Router)** para enrutado basado en carpetas y **fetch en servidor** a TMDB.

## Rutas (directorio `app/`)

- `app/page.js` — Inicio (películas populares)
- `app/movie/[id]/page.js` — Detalle
- `app/search/page.js` — Búsqueda por `?q=` (formulario GET nativo)

## Requisitos

- Node.js LTS
- Clave API v3 de TMDB (solo servidor)

## Configuración

1. Copia `.env.example` como `.env` en esta carpeta (`next-ssr`).
2. Define `TMDB_API_KEY` (no uses el prefijo `NEXT_PUBLIC_`; la clave no debe exponerse al navegador).

## Ejecución

```bash
npm install
npm run dev
```

Producción:

```bash
npm run build
npm start
```

Lint:

```bash
npm run lint
```

## Estructura relevante

- `app/layout.js` — Metadatos, fuentes y navegación global
- `app/globals.css` — Estilos de la UI de películas
- `lib/tmdb.js` — Peticiones TMDB e invalidación (`revalidate`)
- `components/` — `SiteNav`, `MovieGrid` (usa `next/image` para pósters)

`next.config.mjs` declara `images.remotePatterns` para `image.tmdb.org`.

# MovieApp (SPA — React + Vite)

Aplicación de una sola página para explorar películas populares, ver detalle y buscar por título, usando [The Movie Database (TMDB)](https://www.themoviedb.org/) y **React Router DOM** para el enrutado en cliente.

## Rutas

- `/` — Películas populares
- `/movie/:id` — Detalle de una película
- `/search` — Búsqueda (parámetro opcional `?q=` en la URL)

## Requisitos

- Node.js LTS recomendado
- Clave API v3 de TMDB

## Configuración

1. Copia `.env.example` como `.env` en esta carpeta (`react-spa`).
2. Rellena `VITE_TMDB_API_KEY` con tu clave de [Ajustes → API](https://www.themoviedb.org/settings/api).

## Ejecución

```bash
npm install
npm run dev
```

Compilación de producción:

```bash
npm run build
npm run preview
```

Calidad de código:

```bash
npm run lint
```

Pruebas automáticas (Vitest + Testing Library, sin llamar a TMDB):

```bash
npm run test
```

Modo observador: `npm run test:watch`

## Estructura relevante

- `src/main.jsx` — Montaje de la app con `BrowserRouter`
- `src/App.jsx` — Rutas anidadas y cabecera con enlaces (`NavLink`)
- `src/pages/` — `Home`, `MovieDetail`, `Search`
- `src/services/api.js` — Cliente TMDB (idioma `es-ES`)

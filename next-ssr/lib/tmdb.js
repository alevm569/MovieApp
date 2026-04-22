const BASE = 'https://api.themoviedb.org/3'

function requireKey() {
  const key = process.env.TMDB_API_KEY
  if (!key) {
    throw new Error(
      'TMDB_API_KEY no está definida. Añádela en next-ssr/.env (ver .env.example).',
    )
  }
  return key
}

export function posterUrl(path, size = 'w500') {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}

async function tmdbGet(path, params = {}, revalidate = 3600) {
  const url = new URL(`${BASE}${path}`)
  url.searchParams.set('api_key', requireKey())
  url.searchParams.set('language', 'es-ES')
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== '') url.searchParams.set(k, String(v))
  }
  const res = await fetch(url.toString(), {
    next: { revalidate },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`TMDB ${res.status}: ${text.slice(0, 200)}`)
  }
  return res.json()
}

export function getPopularMovies(page = 1) {
  return tmdbGet('/movie/popular', { page }, 3600)
}

export function getMovieById(id) {
  return tmdbGet(`/movie/${id}`, {}, 3600)
}

export function searchMovies(query, page = 1) {
  return tmdbGet('/search/movie', { query, page }, 120)
}

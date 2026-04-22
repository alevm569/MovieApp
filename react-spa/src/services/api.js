const BASE = 'https://api.themoviedb.org/3'

function getApiKey() {
  const key = import.meta.env.VITE_TMDB_API_KEY
  if (!key) {
    throw new Error(
      'Falta VITE_TMDB_API_KEY. Crea un archivo .env en react-spa con tu clave de TMDB.',
    )
  }
  return key
}

function buildUrl(path, extraParams = {}) {
  const url = new URL(`${BASE}${path}`)
  url.searchParams.set('api_key', getApiKey())
  url.searchParams.set('language', 'es-ES')
  for (const [k, v] of Object.entries(extraParams)) {
    if (v != null && v !== '') url.searchParams.set(k, String(v))
  }
  return url.toString()
}

async function request(path, extraParams) {
  const res = await fetch(buildUrl(path, extraParams))
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`TMDB ${res.status}: ${text.slice(0, 200)}`)
  }
  return res.json()
}

export function posterUrl(path, size = 'w500') {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export function getPopularMovies(page = 1) {
  return request('/movie/popular', { page })
}

export function getMovieById(id) {
  return request(`/movie/${id}`)
}

export function searchMovies(query, page = 1) {
  return request('/search/movie', { query, page })
}

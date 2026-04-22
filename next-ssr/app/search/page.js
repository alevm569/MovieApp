import MovieGrid from '@/components/MovieGrid'
import { searchMovies } from '@/lib/tmdb'

export const dynamic = 'force-dynamic'

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams
  const q = typeof sp.q === 'string' ? sp.q.trim() : ''

  let results = []
  let error = null
  if (q) {
    try {
      const data = await searchMovies(q)
      results = data.results ?? []
    } catch (e) {
      error = e instanceof Error ? e.message : 'Error en la búsqueda.'
    }
  }

  return (
    <section className="movie-section">
      <h1 className="movie-page-title">Buscar películas</h1>
      <form className="movie-search-form" action="/search" method="get" role="search">
        <label className="movie-sr-only" htmlFor="search-q">
          Título
        </label>
        <input
          id="search-q"
          className="movie-search-input"
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Escribe un título…"
          autoComplete="off"
        />
        <button className="movie-search-btn" type="submit">
          Buscar
        </button>
      </form>

      {!q && <p className="movie-muted">Introduce un título y pulsa Buscar.</p>}

      {q && error && (
        <p className="movie-error" role="alert">
          {error}
        </p>
      )}

      {q && !error && results.length === 0 && (
        <p className="movie-muted">No hay resultados para «{q}».</p>
      )}

      {q && !error && results.length > 0 && <MovieGrid movies={results} />}
    </section>
  )
}

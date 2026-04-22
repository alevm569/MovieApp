import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { posterUrl, searchMovies } from '../services/api'

export default function Search() {
  const [params, setParams] = useSearchParams()
  const q = useMemo(() => (params.get('q') ?? '').trim(), [params])
  /** null = aún no hay respuesta para el q actual */
  const [state, setState] = useState(null)

  useEffect(() => {
    if (!q) return
    let cancelled = false
    searchMovies(q)
      .then((data) => {
        if (!cancelled) setState({ fetchedQ: q, results: data.results ?? [], error: null })
      })
      .catch((e) => {
        if (!cancelled)
          setState({
            fetchedQ: q,
            results: [],
            error: e.message ?? 'Error en la búsqueda.',
          })
      })
    return () => {
      cancelled = true
    }
  }, [q])

  function onSubmit(e) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const next = String(fd.get('q') ?? '').trim()
    setParams(next ? { q: next } : {})
  }

  const ready = state != null && state.fetchedQ === q
  const loading = q !== '' && !ready
  const results = ready ? state.results : []
  const error = ready ? state.error : null

  return (
    <section className="movie-section">
      <h1 className="movie-page-title">Buscar películas</h1>
      <form className="movie-search-form" onSubmit={onSubmit} role="search">
        <label className="movie-sr-only" htmlFor="search-q">
          Título
        </label>
        <input
          id="search-q"
          key={q || '_'}
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

      {q && loading && <p className="movie-muted">Buscando…</p>}

      {q && ready && error && (
        <p className="movie-error" role="alert">
          {error}
        </p>
      )}

      {q && ready && !error && results.length === 0 && (
        <p className="movie-muted">No hay resultados para «{q}».</p>
      )}

      {q && ready && !error && results.length > 0 && (
        <ul className="movie-grid">
          {results.map((m) => (
            <li key={m.id}>
              <Link className="movie-card" to={`/movie/${m.id}`}>
                {posterUrl(m.poster_path) ? (
                  <img
                    className="movie-card__poster"
                    src={posterUrl(m.poster_path)}
                    alt={`Póster de ${m.title}`}
                    loading="lazy"
                    width={500}
                    height={750}
                  />
                ) : (
                  <div className="movie-card__poster movie-card__poster--empty" aria-hidden />
                )}
                <span className="movie-card__title">{m.title}</span>
                {m.vote_average != null && (
                  <span className="movie-card__rating">{m.vote_average.toFixed(1)} ★</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

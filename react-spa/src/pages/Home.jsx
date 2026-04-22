import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPopularMovies, posterUrl } from '../services/api'

export default function Home() {
  /** null = cargando; luego éxito o error */
  const [state, setState] = useState(null)

  useEffect(() => {
    let cancelled = false
    getPopularMovies()
      .then((data) => {
        if (!cancelled) setState({ ok: true, movies: data.results ?? [] })
      })
      .catch((e) => {
        if (!cancelled)
          setState({ ok: false, message: e.message ?? 'No se pudieron cargar las películas.' })
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (state === null) {
    return (
      <section className="movie-section">
        <p className="movie-muted">Cargando películas populares…</p>
      </section>
    )
  }

  if (!state.ok) {
    return (
      <section className="movie-section">
        <p className="movie-error" role="alert">
          {state.message}
        </p>
      </section>
    )
  }

  return (
    <section className="movie-section">
      <h1 className="movie-page-title">Películas populares</h1>
      <p className="movie-lead">Selecciona una tarjeta para ver el detalle.</p>
      <ul className="movie-grid">
        {state.movies.map((m) => (
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
    </section>
  )
}

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMovieById, posterUrl } from '../services/api'

export default function MovieDetail() {
  const { id } = useParams()
  /** null al inicio; luego última respuesta etiquetada por id solicitado */
  const [state, setState] = useState(null)

  useEffect(() => {
    let cancelled = false
    getMovieById(id)
      .then((data) => {
        if (!cancelled) setState({ fetchedId: id, movie: data, error: null })
      })
      .catch((e) => {
        if (!cancelled)
          setState({
            fetchedId: id,
            movie: null,
            error: e.message ?? 'No se pudo cargar la película.',
          })
      })
    return () => {
      cancelled = true
    }
  }, [id])

  const ready = state != null && state.fetchedId === id
  const loading = !ready
  const movie = ready ? state.movie : null
  const error = ready ? state.error : null

  if (loading) {
    return (
      <section className="movie-section">
        <p className="movie-muted">Cargando detalle…</p>
      </section>
    )
  }

  if (error || !movie) {
    return (
      <section className="movie-section">
        <p className="movie-error" role="alert">
          {error ?? 'Película no encontrada.'}
        </p>
        <Link className="movie-back" to="/">
          Volver al inicio
        </Link>
      </section>
    )
  }

  const backdrop = posterUrl(movie.backdrop_path, 'w1280')
  const poster = posterUrl(movie.poster_path)

  return (
    <article className="movie-detail">
      {backdrop && (
        <div
          className="movie-detail__backdrop"
          style={{ backgroundImage: `url(${backdrop})` }}
          aria-hidden
        />
      )}
      <div className="movie-detail__inner">
        <Link className="movie-back" to="/">
          ← Inicio
        </Link>
        <div className="movie-detail__layout">
          {poster ? (
            <img
              className="movie-detail__poster"
              src={poster}
              alt={`Póster de ${movie.title}`}
              width={500}
              height={750}
            />
          ) : (
            <div className="movie-detail__poster movie-detail__poster--empty" aria-hidden />
          )}
          <div className="movie-detail__body">
            <h1 className="movie-detail__title">{movie.title}</h1>
            {movie.tagline && <p className="movie-detail__tagline">{movie.tagline}</p>}
            <dl className="movie-detail__meta">
              <div>
                <dt>Calificación</dt>
                <dd>
                  {movie.vote_average != null
                    ? `${movie.vote_average.toFixed(1)} / 10 (${movie.vote_count ?? 0} votos)`
                    : '—'}
                </dd>
              </div>
              {movie.release_date && (
                <div>
                  <dt>Estreno</dt>
                  <dd>{movie.release_date}</dd>
                </div>
              )}
              {movie.runtime != null && (
                <div>
                  <dt>Duración</dt>
                  <dd>{movie.runtime} min</dd>
                </div>
              )}
            </dl>
            <h2 className="movie-detail__subtitle">Sinopsis</h2>
            <p className="movie-detail__overview">
              {movie.overview?.trim() ? movie.overview : 'Sin sinopsis disponible.'}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

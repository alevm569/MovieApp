import Image from 'next/image'
import Link from 'next/link'
import { getMovieById, posterUrl } from '@/lib/tmdb'

export default async function MoviePage({ params }) {
  const { id } = await params
  let movie = null
  let error = null
  try {
    movie = await getMovieById(id)
  } catch (e) {
    error = e instanceof Error ? e.message : 'No se pudo cargar la película.'
  }

  if (error || !movie) {
    return (
      <section className="movie-section">
        <p className="movie-error" role="alert">
          {error ?? 'Película no encontrada.'}
        </p>
        <Link className="movie-back" href="/">
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
        <Link className="movie-back" href="/">
          ← Inicio
        </Link>
        <div className="movie-detail__layout">
          {poster ? (
            <Image
              className="movie-detail__poster"
              src={poster}
              alt={`Póster de ${movie.title}`}
              width={500}
              height={750}
              sizes="(max-width: 720px) 60vw, 280px"
              priority
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

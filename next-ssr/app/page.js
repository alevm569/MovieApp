import MovieGrid from '@/components/MovieGrid'
import { getPopularMovies } from '@/lib/tmdb'

export default async function Home() {
  let movies = []
  let error = null
  try {
    const data = await getPopularMovies()
    movies = data.results ?? []
  } catch (e) {
    error = e instanceof Error ? e.message : 'Error al cargar datos.'
  }

  return (
    <section className="movie-section">
      {error ? (
        <p className="movie-error" role="alert">
          {error}
        </p>
      ) : (
        <>
          <h1 className="movie-page-title">Películas populares</h1>
          <p className="movie-lead">Selecciona una tarjeta para ver el detalle (render en servidor).</p>
          <MovieGrid movies={movies} />
        </>
      )}
    </section>
  )
}

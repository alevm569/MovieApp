import Image from 'next/image'
import Link from 'next/link'
import { posterUrl } from '@/lib/tmdb'

export default function MovieGrid({ movies }) {
  return (
    <ul className="movie-grid">
      {movies.map((m) => {
        const src = posterUrl(m.poster_path)
        return (
          <li key={m.id}>
            <Link className="movie-card" href={`/movie/${m.id}`}>
              {src ? (
                <Image
                  className="movie-card__poster"
                  src={src}
                  alt={`Póster de ${m.title}`}
                  width={500}
                  height={750}
                  sizes="(max-width: 720px) 45vw, 200px"
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
        )
      })}
    </ul>
  )
}

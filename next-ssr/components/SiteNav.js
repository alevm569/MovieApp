import Link from 'next/link'

export default function SiteNav() {
  return (
    <header className="movie-header">
      <Link className="movie-brand" href="/">
        MovieApp
      </Link>
      <nav className="movie-nav" aria-label="Principal">
        <Link className="movie-nav__link" href="/">
          Inicio
        </Link>
        <Link className="movie-nav__link" href="/search">
          Buscar
        </Link>
      </nav>
    </header>
  )
}

import { NavLink, Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Search from './pages/Search'
import './App.css'

function Layout() {
  return (
    <div className="movie-app">
      <header className="movie-header">
        <NavLink className="movie-brand" to="/" end>
          MovieApp
        </NavLink>
        <nav className="movie-nav" aria-label="Principal">
          <NavLink className="movie-nav__link" to="/" end>
            Inicio
          </NavLink>
          <NavLink className="movie-nav__link" to="/search">
            Buscar
          </NavLink>
        </nav>
      </header>
      <main className="movie-main">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  )
}

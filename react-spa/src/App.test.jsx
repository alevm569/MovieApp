import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'

vi.mock('./services/api.js', async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    getPopularMovies: vi.fn(() =>
      Promise.resolve({
        results: [
          {
            id: 99,
            title: 'Película de prueba',
            poster_path: '/demo.jpg',
            vote_average: 8.1,
          },
        ],
      }),
    ),
  }
})

describe('App', () => {
  it('muestra navegación y el listado mockeado en inicio', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('navigation', { name: /principal/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^inicio$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /buscar/i })).toBeInTheDocument()

    expect(await screen.findByText('Película de prueba')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /póster de película de prueba/i })).toBeInTheDocument()
  })
})

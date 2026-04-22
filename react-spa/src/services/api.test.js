import { describe, expect, it } from 'vitest'
import { posterUrl } from './api.js'

describe('posterUrl', () => {
  it('devuelve null si no hay ruta de póster', () => {
    expect(posterUrl(null)).toBeNull()
    expect(posterUrl(undefined)).toBeNull()
    expect(posterUrl('')).toBeNull()
  })

  it('construye la URL por defecto con tamaño w500', () => {
    expect(posterUrl('/abc.jpg')).toBe('https://image.tmdb.org/t/p/w500/abc.jpg')
  })

  it('respeta el tamaño indicado', () => {
    expect(posterUrl('/x.png', 'w342')).toBe('https://image.tmdb.org/t/p/w342/x.png')
  })
})

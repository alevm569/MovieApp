import React from 'react'
import { render, screen } from '@testing-library/react'
import SiteNav from '@/components/SiteNav'

jest.mock('next/link', () => {
  const MockLink = ({ children, href, ...rest }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  )
  MockLink.displayName = 'MockLink'
  return MockLink
})

describe('SiteNav', () => {
  it('muestra la marca y los enlaces principales', () => {
    render(<SiteNav />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /principal/i })).toBeInTheDocument()

    const brand = screen.getByRole('link', { name: /^movieapp$/i })
    expect(brand).toHaveAttribute('href', '/')

    expect(screen.getByRole('link', { name: /^inicio$/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /^buscar$/i })).toHaveAttribute('href', '/search')
  })
})

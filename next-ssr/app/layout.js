import { Geist, Geist_Mono } from 'next/font/google'
import SiteNav from '@/components/SiteNav'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'MovieApp — Next.js (SSR)',
  description: 'Explorador de películas con The Movie Database y App Router.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="movie-body">
        <div className="movie-app">
          <SiteNav />
          <main className="movie-main">{children}</main>
        </div>
      </body>
    </html>
  )
}

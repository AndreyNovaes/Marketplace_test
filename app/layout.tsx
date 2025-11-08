import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quantum Market - Marketplace de Tecnologia e Eletrônicos',
  description: 'O marketplace mais completo do Brasil com os melhores produtos de tecnologia, eletrônicos, smartphones, games e muito mais. Compre com segurança e receba em casa.',
  keywords: 'marketplace, tecnologia, eletrônicos, smartphones, notebooks, games, drones, câmeras',
  authors: [{ name: 'Quantum Market' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0ea5e9',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://quantummarket.com.br',
    siteName: 'Quantum Market',
    title: 'Quantum Market - Marketplace de Tecnologia',
    description: 'O marketplace mais completo do Brasil',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Quantum Market'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantum Market - Marketplace de Tecnologia',
    description: 'O marketplace mais completo do Brasil',
    images: ['/og-image.jpg']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header cartItemCount={0} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

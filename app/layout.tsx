import type { Metadata } from 'next'
import './globals.css'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'Product Customization App',
  description: 'Customize your product with different colors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="antialiased bg-gray-50">
        <ErrorBoundary>
          <div className="min-h-screen">
            {children}
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}

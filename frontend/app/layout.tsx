import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/context/authContext'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Trabalho a3',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
      <Toaster position="top-right" />
        <AuthProvider>
          {children}
        </AuthProvider>
        </body>
    </html>
  )
}

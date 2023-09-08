import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Transportation Dashboard'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          <Toaster
            position='bottom-left'
            toastOptions={{
              className: 'bg-background dark:border-[0.1px] dark:border-gray-800 dark:text-white'
            }}
            />
            </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}

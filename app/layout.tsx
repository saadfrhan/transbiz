import { ClerkProvider, UserButton } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from '@/components/layout/navbar'
import ThemeToggler from '@/components/theme-toggler'

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
            <div
              className="flex px-5 py-5 max-lg:px-2.5 max-lg:py-2.5 border-b items-center gap-2.5"
            >
              <Navbar />
              <UserButton afterSignOutUrl="/sign-in" appearance={{
                elements: {
                  avatarBox: "w-10 h-10 rounded-md z-[-50]"
                }
              }} />
              <ThemeToggler />
            </div>
            {children}
            <Toaster
              position='bottom-left'
            />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ui/theme/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LanguageProvider } from "@/components/ui/theme/language-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | RosantiBike",
    default: "RosantiBike - Premium Motorcycle Rental in Malang, Indonesia",
  },
  description:
    "The most advanced motorcycle rental service in Malang with a wide range of premium motorcycles for your adventure needs.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rosantibike.com",
    siteName: "RosantiBike",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RosantiBike",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rosantibike",
  },
  alternates: {
    canonical: "https://rosantibike.com",
    languages: {
      "en-US": "https://rosantibike.com/en",
      "id-ID": "https://rosantibike.com/id",
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
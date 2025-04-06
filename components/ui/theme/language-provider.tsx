"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

type Language = "en" | "id"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// English translations
const enTranslations = {
  "nav.home": "Home",
  "nav.motorcycles": "Motorcycles",
  "nav.blog": "Blog",
  "nav.contact": "Contact",
  "nav.login": "Login",
  "nav.signup": "Sign Up",
  "hero.title": "Explore Indonesia on Two Wheels",
  "hero.subtitle": "Rent premium motorcycles for your adventure in Indonesia",
  "hero.cta": "Book Now",
  "benefits.title": "Why Choose Us",
  "benefits.quality": "Premium Motorcycles",
  "benefits.service": "Excellent Service",
  "benefits.price": "Competitive Prices",
  "benefits.support": "24/7 Support",
  "cta.title": "Ready for Your Adventure?",
  "cta.subtitle": "Book your motorcycle now and explore Indonesia",
  "cta.button": "Book Now",
  "footer.rights": "All rights reserved",
  // Add more translations as needed
}

// Indonesian translations
const idTranslations = {
  "nav.home": "Beranda",
  "nav.motorcycles": "Motor",
  "nav.blog": "Blog",
  "nav.contact": "Kontak",
  "nav.login": "Masuk",
  "nav.signup": "Daftar",
  "hero.title": "Jelajahi Indonesia dengan Dua Roda",
  "hero.subtitle": "Sewa motor premium untuk petualangan Anda di Indonesia",
  "hero.cta": "Pesan Sekarang",
  "benefits.title": "Mengapa Memilih Kami",
  "benefits.quality": "Motor Premium",
  "benefits.service": "Layanan Terbaik",
  "benefits.price": "Harga Kompetitif",
  "benefits.support": "Dukungan 24/7",
  "cta.title": "Siap untuk Petualangan Anda?",
  "cta.subtitle": "Pesan motor Anda sekarang dan jelajahi Indonesia",
  "cta.button": "Pesan Sekarang",
  "footer.rights": "Seluruh hak cipta dilindungi",
  // Add more translations as needed
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if language is stored in localStorage
    const storedLanguage = localStorage.getItem("language") as Language
    if (storedLanguage) {
      setLanguageState(storedLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)

    // Update URL to reflect language change
    const newPathname =
      pathname.startsWith("/en") || pathname.startsWith("/id")
        ? `/${newLanguage}${pathname.substring(3)}`
        : `/${newLanguage}${pathname}`

    router.push(newPathname)
  }

  const t = (key: string): string => {
    const translations = language === "en" ? enTranslations : idTranslations
    return translations[key as keyof typeof translations] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}


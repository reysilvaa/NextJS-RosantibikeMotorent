"use client"

// Update the import path to point to the new location of the language provider
import { useLanguage } from "@/components/ui/theme/language-provider"

export function useTranslation() {
  const { t, language, setLanguage } = useLanguage()

  return {
    t,
    language,
    setLanguage,
  }
}


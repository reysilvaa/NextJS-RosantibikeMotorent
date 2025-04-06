"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/components/ui/theme/language-provider"

interface Motorcycle {
  id: string
  name: string
  price: number
}

interface MotorcycleBookingCtaProps {
  motorcycle: Motorcycle
}

export function MotorcycleBookingCta({ motorcycle }: MotorcycleBookingCtaProps) {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col gap-4"
    >
      <Button size="lg" asChild>
        <Link href={`/booking?motorcycle=${motorcycle.id}`}>{t("hero.cta")}</Link>
      </Button>
      <Button variant="outline" size="lg">
        Contact Us
      </Button>
    </motion.div>
  )
}


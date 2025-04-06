"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/components/ui/theme/language-provider"
import { useBookingStore } from "@/store/booking-store"
import { useRouter } from "next/navigation"

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
  const router = useRouter()
  const { setMotorcycle, dateRange } = useBookingStore()

  const handleBookClick = () => {
    // Simpan ID motor yang dipilih ke store
    setMotorcycle(motorcycle.id)
    
    // Arahkan ke halaman booking
    router.push('/booking')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col gap-4"
    >
      <Button size="lg" onClick={handleBookClick}>
        Pesan Sekarang
      </Button>
      <Button variant="outline" size="lg">
        Hubungi Kami
      </Button>
    </motion.div>
  )
}


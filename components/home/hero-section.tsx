"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslation } from "@/hooks/use-translation"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Scroll down function
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 180, // Adjusted to account for QuickBookingForm
      behavior: "smooth"
    })
  }

  // Optional: Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay failed:', err)
      })
    }
  }, [])

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        {/* Video overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40 z-10" />
        
        {/* Video element - replace src with your actual video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/placeholder-video.mp4" 
          poster="/placeholder.svg?height=1080&width=1920"
          muted
          loop
          playsInline
        />
      </div>

      {/* Hero content */}
      <div className="container relative z-20">
        <div className="max-w-2xl space-y-8">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="min-w-[150px]">
              <Link href="/motorcycles">{t("hero.cta")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20 min-w-[150px]">
              <Link href="/about">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll down indicator - raised up slightly more */}
      <div className="absolute bottom-32 left-0 right-0 flex justify-center z-20">
        <motion.button
          onClick={scrollToContent}
          className="flex flex-col items-center text-white/80 hover:text-white transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </motion.button>
      </div>
    </section>
  )
}


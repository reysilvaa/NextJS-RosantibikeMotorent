"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample motorcycle data
const motorcycles = [
  {
    id: "cbr-250rr",
    name: "Honda CBR 250RR",
    brand: "Honda",
    category: "Sport",
    price: 350000,
    image: "/placeholder.svg?height=300&width=400",
    slug: "honda-cbr-250rr",
  },
  {
    id: "ninja-zx25r",
    name: "Kawasaki Ninja ZX-25R",
    brand: "Kawasaki",
    category: "Sport",
    price: 380000,
    image: "/placeholder.svg?height=300&width=400",
    slug: "kawasaki-ninja-zx25r",
  },
  {
    id: "r25",
    name: "Yamaha R25",
    brand: "Yamaha",
    category: "Sport",
    price: 320000,
    image: "/placeholder.svg?height=300&width=400",
    slug: "yamaha-r25",
  },
  {
    id: "xsr155",
    name: "Yamaha XSR 155",
    brand: "Yamaha",
    category: "Cafe Racer",
    price: 280000,
    image: "/placeholder.svg?height=300&width=400",
    slug: "yamaha-xsr155",
  },
  {
    id: "crf150l",
    name: "Honda CRF 150L",
    brand: "Honda",
    category: "Trail",
    price: 250000,
    image: "/placeholder.svg?height=300&width=400",
    slug: "honda-crf150l",
  },
]

export function MotorcycleShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxVisibleItems = 3
  const containerRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= motorcycles.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? motorcycles.length - 1 : prev - 1))
  }

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Get visible motorcycles based on current index
  const getVisibleMotorcycles = () => {
    const result = []
    for (let i = 0; i < maxVisibleItems; i++) {
      const index = (currentIndex + i) % motorcycles.length
      result.push(motorcycles[index])
    }
    return result
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Motorcycles</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={prevSlide}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div ref={containerRef} className="relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleMotorcycles().map((motorcycle, index) => (
              <motion.div
                key={motorcycle.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/motorcycles/${motorcycle.slug}`}>
                  <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg">
                    <div className="relative h-48">
                      <Image
                        src={motorcycle.image || "/placeholder.svg"}
                        alt={motorcycle.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge>{motorcycle.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{motorcycle.name}</h3>
                          <p className="text-sm text-muted-foreground">{motorcycle.brand}</p>
                        </div>
                        <p className="font-bold">
                          Rp {motorcycle.price.toLocaleString("id-ID")}
                          <span className="text-xs text-muted-foreground font-normal">/day</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/motorcycles">View All Motorcycles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}


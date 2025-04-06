"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Sample tourism destinations data
const destinations = [
  {
    id: "1",
    name: "Bromo Mountain",
    image: "/placeholder.svg?height=400&width=600",
    description: "Experience the breathtaking sunrise view at Mount Bromo, one of Indonesia's most iconic volcanoes.",
    distance: "40 km from Malang",
    category: "Nature",
  },
  {
    id: "2",
    name: "Jatim Park",
    image: "/placeholder.svg?height=400&width=600",
    description: "A family-friendly theme park with various attractions, rides, and educational exhibits.",
    distance: "15 km from Malang",
    category: "Entertainment",
  },
  {
    id: "3",
    name: "Batu Secret Zoo",
    image: "/placeholder.svg?height=400&width=600",
    description: "Modern zoo with a diverse collection of animals and interactive experiences for visitors.",
    distance: "18 km from Malang",
    category: "Wildlife",
  },
  {
    id: "4",
    name: "Coban Rondo Waterfall",
    image: "/placeholder.svg?height=400&width=600",
    description: "Beautiful waterfall surrounded by lush forest, perfect for a refreshing day trip.",
    distance: "25 km from Malang",
    category: "Nature",
  },
  {
    id: "5",
    name: "Tugu Malang",
    image: "/placeholder.svg?height=400&width=600",
    description: "Historic monument in the heart of Malang city, a symbol of the city's heritage.",
    distance: "5 km from Malang",
    category: "Heritage",
  },
  {
    id: "6",
    name: "Kampung Warna-Warni Jodipan",
    image: "/placeholder.svg?height=400&width=600",
    description: "Colorful village with vibrant painted houses, a popular Instagram spot.",
    distance: "7 km from Malang",
    category: "Culture",
  },
]

export function TourismGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = Math.max(0, destinations.length - (isMobile() ? 1 : 3))

  function isMobile() {
    if (typeof window === "undefined") return false
    return window.innerWidth < 768
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Explore Malang&apos;s Attractions</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Discover the best tourist destinations around Malang that you can easily visit with our rental
              motorcycles.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous destinations"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              aria-label="Next destinations"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / (isMobile() ? 1 : 3))}%)`,
            }}
          >
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                className="w-full px-2 md:w-1/3 flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative h-48 w-full">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <Badge className="absolute top-2 right-2">{destination.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold">{destination.name}</h3>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{destination.distance}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{destination.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/tourism-guide">View All Destinations</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}


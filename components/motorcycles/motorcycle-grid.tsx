"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"
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
    year: 2022,
    engineSize: "250cc",
  },
  {
    id: "ninja-zx25r",
    name: "Kawasaki Ninja ZX-25R",
    brand: "Kawasaki",
    category: "Sport",
    price: 380000,
    image: "/placeholder.svg?height=300&width=400",
    slug: "kawasaki-ninja-zx25r",
    year: 2021,
    engineSize: "250cc",
  },
  {
    id: "r25",
    name: "Yamaha R25",
    brand: "Yamaha",
    category: "Sport",
    price: 320000,
    image: "/placeholder.svg?height=300&width=400",
    slug: "yamaha-r25",
    year: 2022,
    engineSize: "250cc",
  },
  {
    id: "xsr155",
    name: "Yamaha XSR 155",
    brand: "Yamaha",
    category: "Cafe Racer",
    price: 280000,
    image: "/placeholder.svg?height=300&width=400",
    slug: "yamaha-xsr155",
    year: 2021,
    engineSize: "155cc",
  },
  {
    id: "crf150l",
    name: "Honda CRF 150L",
    brand: "Honda",
    category: "Trail",
    price: 250000,
    image: "/placeholder.svg?height=300&width=400",
    slug: "honda-crf150l",
    year: 2022,
    engineSize: "150cc",
  },
  {
    id: "gsx-r150",
    name: "Suzuki GSX-R150",
    brand: "Suzuki",
    category: "Sport",
    price: 300000,
    image: "/placeholder.svg?height=300&width=400",
    slug: "suzuki-gsx-r150",
    year: 2021,
    engineSize: "150cc",
  },
  {
    id: "vario-160",
    name: "Honda Vario 160",
    brand: "Honda",
    category: "Scooter",
    price: 200000,
    image: "/placeholder.svg?height=300&width=400",
    slug: "honda-vario-160",
    year: 2022,
    engineSize: "160cc",
  },
  {
    id: "nmax",
    name: "Yamaha NMAX",
    brand: "Yamaha",
    category: "Scooter",
    price: 220000,
    image: "/placeholder.svg?height=300&width=400",
    slug: "yamaha-nmax",
    year: 2022,
    engineSize: "155cc",
  },
]

export function MotorcycleGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")

  const getSortedMotorcycles = () => {
    switch (sortBy) {
      case "price-low":
        return [...motorcycles].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...motorcycles].sort((a, b) => b.price - a.price)
      case "newest":
        return [...motorcycles].sort((a, b) => b.year - a.year)
      default:
        return motorcycles
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Showing {motorcycles.length} motorcycles</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getSortedMotorcycles().map((motorcycle) => (
            <Link key={motorcycle.id} href={`/motorcycles/${motorcycle.slug}`}>
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
                      <p className="text-sm text-muted-foreground">
                        {motorcycle.brand} • {motorcycle.engineSize}
                      </p>
                    </div>
                    <p className="font-bold">
                      Rp {motorcycle.price.toLocaleString("id-ID")}
                      <span className="text-xs text-muted-foreground font-normal">/day</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {getSortedMotorcycles().map((motorcycle) => (
            <Link key={motorcycle.id} href={`/motorcycles/${motorcycle.slug}`}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-48 h-48">
                    <Image
                      src={motorcycle.image || "/placeholder.svg"}
                      alt={motorcycle.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4 flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge>{motorcycle.category}</Badge>
                          <Badge variant="outline">{motorcycle.engineSize}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg">{motorcycle.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {motorcycle.brand} • {motorcycle.year}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">
                          Rp {motorcycle.price.toLocaleString("id-ID")}
                          <span className="text-xs text-muted-foreground font-normal">/day</span>
                        </p>
                        <Button size="sm" className="mt-2">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}


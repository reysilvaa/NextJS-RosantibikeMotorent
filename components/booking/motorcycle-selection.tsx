"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useBookingStore } from "@/store/booking-store"
import type { Motorcycle } from "@/types/booking/booking-types"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample motorcycle data - in a real app, this would come from an API
const sampleMotorcycles: Motorcycle[] = [
  {
    id: "1",
    name: "Honda PCX 160",
    brand: "Honda",
    model: "PCX 160",
    category: "Scooter",
    engineSize: "160cc",
    price: 150000,
    images: ["/placeholder.svg?height=200&width=300"],
    features: ["Automatic Transmission", "Fuel Efficient", "Under-seat Storage"],
    specifications: {
      engine: "160cc",
      power: "16 HP",
      transmission: "Automatic",
      weight: "130 kg",
      fuelCapacity: "8 liters",
    },
    availability: true,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "2",
    name: "Yamaha NMAX",
    brand: "Yamaha",
    model: "NMAX",
    category: "Scooter",
    engineSize: "155cc",
    price: 170000,
    discountedPrice: 153000,
    images: ["/placeholder.svg?height=200&width=300"],
    features: ["ABS", "Smart Key System", "Digital Dashboard"],
    specifications: {
      engine: "155cc",
      power: "15 HP",
      transmission: "Automatic",
      weight: "131 kg",
      fuelCapacity: "7.1 liters",
    },
    availability: true,
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: "3",
    name: "Honda CBR 250RR",
    brand: "Honda",
    model: "CBR 250RR",
    category: "Sport",
    engineSize: "250cc",
    price: 350000,
    images: ["/placeholder.svg?height=200&width=300"],
    features: ["Dual-Channel ABS", "Riding Modes", "LED Lights"],
    specifications: {
      engine: "250cc",
      power: "41 HP",
      transmission: "6-speed Manual",
      weight: "168 kg",
      fuelCapacity: "14.5 liters",
    },
    availability: true,
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: "4",
    name: "Kawasaki Ninja ZX-25R",
    brand: "Kawasaki",
    model: "Ninja ZX-25R",
    category: "Sport",
    engineSize: "250cc",
    price: 400000,
    images: ["/placeholder.svg?height=200&width=300"],
    features: ["4-cylinder Engine", "Quick Shifter", "Traction Control"],
    specifications: {
      engine: "250cc",
      power: "51 HP",
      transmission: "6-speed Manual",
      weight: "182 kg",
      fuelCapacity: "15 liters",
    },
    availability: true,
    rating: 4.9,
    reviewCount: 67,
  },
  {
    id: "5",
    name: "Yamaha XSR 155",
    brand: "Yamaha",
    model: "XSR 155",
    category: "Cafe Racer",
    engineSize: "155cc",
    price: 250000,
    images: ["/placeholder.svg?height=200&width=300"],
    features: ["Retro Design", "Digital Speedometer", "LED Headlight"],
    specifications: {
      engine: "155cc",
      power: "19 HP",
      transmission: "6-speed Manual",
      weight: "134 kg",
      fuelCapacity: "10.4 liters",
    },
    availability: true,
    rating: 4.6,
    reviewCount: 52,
  },
]

export function MotorcycleSelection() {
  const { motorcycleId, setMotorcycle } = useBookingStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("")
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>(sampleMotorcycles)

  // Filter motorcycles based on search term and category
  useEffect(() => {
    let filtered = sampleMotorcycles

    if (searchTerm) {
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.model.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter) {
      filtered = filtered.filter((m) => m.category === categoryFilter)
    }

    setMotorcycles(filtered)
  }, [searchTerm, categoryFilter])

  // Get unique categories for filter
  const categories = Array.from(new Set(sampleMotorcycles.map((m) => m.category)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search motorcycles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {motorcycles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No motorcycles found matching your criteria.</p>
        </div>
      ) : (
        <RadioGroup value={motorcycleId} onValueChange={setMotorcycle} className="grid grid-cols-1 gap-4">
          {motorcycles.map((motorcycle) => (
            <Label
              key={motorcycle.id}
              htmlFor={`motorcycle-${motorcycle.id}`}
              className={cn(
                "flex cursor-pointer overflow-hidden rounded-lg border bg-card p-0 transition-all hover:bg-accent",
                motorcycleId === motorcycle.id && "ring-2 ring-primary",
              )}
            >
              <RadioGroupItem value={motorcycle.id} id={`motorcycle-${motorcycle.id}`} className="sr-only" />
              <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[180px_1fr]">
                <div className="relative h-full">
                  <Image
                    src={motorcycle.images[0] || "/placeholder.svg"}
                    alt={motorcycle.name}
                    width={180}
                    height={120}
                    className="h-full object-cover"
                  />
                  {motorcycleId === motorcycle.id && (
                    <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                  {motorcycle.discountedPrice && <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>}
                </div>
                <div className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{motorcycle.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(motorcycle.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({motorcycle.reviewCount} reviews)</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {motorcycle.category} • {motorcycle.engineSize}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {motorcycle.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      {motorcycle.discountedPrice ? (
                        <>
                          <p className="text-sm line-through text-muted-foreground">
                            Rp {motorcycle.price.toLocaleString()}
                          </p>
                          <p className="font-semibold text-red-500">Rp {motorcycle.discountedPrice.toLocaleString()}</p>
                        </>
                      ) : (
                        <p className="font-semibold">Rp {motorcycle.price.toLocaleString()}</p>
                      )}
                      <p className="text-xs text-muted-foreground">/day</p>
                    </div>
                  </div>
                </div>
              </div>
            </Label>
          ))}
        </RadioGroup>
      )}
    </div>
  )
}


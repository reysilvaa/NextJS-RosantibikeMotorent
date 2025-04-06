"use client"

import { useEffect } from "react"
import { format, differenceInDays } from "date-fns"
import { useBookingStore } from "@/store/booking-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Motorcycle } from "@/types/booking/booking-types"
import Image from "next/image"
import { CalendarDays, MapPin } from "lucide-react"

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
]

// Sample locations - in a real app, this would come from an API
const sampleLocations = [
  { id: "1", name: "Malang City Office" },
  { id: "2", name: "Malang Train Station" },
  { id: "3", name: "Malang Airport" },
  { id: "4", name: "Hotel Delivery (Malang City)" },
]

export function BookingSummary() {
  const { motorcycleId, dateRange, pickupLocation, returnLocation, totalPrice, calculateTotalPrice, currentStep } =
    useBookingStore()

  // Recalculate price when component mounts or dependencies change
  useEffect(() => {
    calculateTotalPrice()
  }, [calculateTotalPrice, motorcycleId, dateRange, pickupLocation, returnLocation])

  // Get motorcycle details
  const selectedMotorcycle = sampleMotorcycles.find((m) => m.id === motorcycleId)

  // Get location names
  const getLocationName = (id: string) => {
    const location = sampleLocations.find((loc) => loc.id === id)
    return location ? location.name : ""
  }

  // Calculate rental days
  const rentalDays =
    dateRange.from && dateRange.to
      ? differenceInDays(dateRange.to, dateRange.from) : 0

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {selectedMotorcycle ? (
          <div className="space-y-4">
            <div className="relative h-40 w-full rounded-md overflow-hidden">
              <Image
                src={selectedMotorcycle.images[0] || "/placeholder.svg"}
                alt={selectedMotorcycle.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-lg">{selectedMotorcycle.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedMotorcycle.category} • {selectedMotorcycle.engineSize}
              </p>
            </div>
          </div>
        ) : (
          <div className="h-40 w-full rounded-md bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No motorcycle selected</p>
          </div>
        )}

        {dateRange.from && dateRange.to ? (
          <div className="space-y-1">
            <div className="flex items-start gap-2">
              <CalendarDays className="h-4 w-4 mt-1 text-primary" />
              <div>
                <p className="font-medium">Rental Period</p>
                <p className="text-sm text-muted-foreground">
                  {format(dateRange.from, "PPP")} - {format(dateRange.to, "PPP")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {rentalDays} {rentalDays === 1 ? "day" : "days"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2">
            <CalendarDays className="h-4 w-4 mt-1 text-muted-foreground" />
            <p className="text-muted-foreground">No dates selected</p>
          </div>
        )}

        {pickupLocation && (
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-1 text-primary" />
            <div>
              <p className="font-medium">Pickup Location</p>
              <p className="text-sm text-muted-foreground">{getLocationName(pickupLocation)}</p>
            </div>
          </div>
        )}

        {returnLocation && pickupLocation !== returnLocation && (
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-1 text-primary" />
            <div>
              <p className="font-medium">Return Location</p>
              <p className="text-sm text-muted-foreground">{getLocationName(returnLocation)}</p>
            </div>
          </div>
        )}

        <div className="border-t pt-4 mt-4">
          <div className="space-y-1">
            {selectedMotorcycle && rentalDays > 0 && (
              <div className="flex justify-between text-sm">
                <span>Base Rate:</span>
                <span>
                  Rp {selectedMotorcycle.price.toLocaleString('id-ID')} x {rentalDays} {rentalDays === 1 ? "day" : "days"}
                </span>
              </div>
            )}

            {/* Add-ons would be shown here */}

            <div className="flex justify-between font-medium text-lg pt-2 border-t mt-2">
              <span>Total:</span>
              <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {currentStep === 3 && (
          <div className="rounded-md bg-primary/10 p-3 text-sm">
            <p>
              By completing this booking, you agree to our{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


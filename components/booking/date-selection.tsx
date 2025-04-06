"use client"

import { useState, useEffect } from "react"
import { format, isSameDay } from "date-fns"
import { useBookingStore } from "@/store/booking-store"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Location } from "@/types/booking/booking-types"
import { CalendarIcon, MapPin, Info } from "lucide-react"
import { DateRange } from "react-day-picker"

// Sample locations - in a real app, this would come from an API
const sampleLocations: Location[] = [
  {
    id: "1",
    name: "Malang City Office",
    address: "Jl. Soekarno Hatta No. 123, Malang",
    coordinates: { lat: -7.9666, lng: 112.6326 },
    openingHours: "08:00 - 20:00",
    contactNumber: "+62 812 3456 7890",
  },
  {
    id: "2",
    name: "Malang Train Station",
    address: "Jl. Trunojoyo No. 10, Malang",
    coordinates: { lat: -7.9775, lng: 112.6365 },
    openingHours: "07:00 - 21:00",
    contactNumber: "+62 812 3456 7891",
  },
  {
    id: "3",
    name: "Malang Airport",
    address: "Jl. Abdulrahman Saleh No. 1, Malang",
    coordinates: { lat: -7.9269, lng: 112.7158 },
    openingHours: "06:00 - 22:00",
    contactNumber: "+62 812 3456 7892",
  },
  {
    id: "4",
    name: "Hotel Delivery (Malang City)",
    address: "Various hotels in Malang City area",
    coordinates: { lat: -7.9666, lng: 112.6326 },
    openingHours: "09:00 - 19:00",
    contactNumber: "+62 812 3456 7893",
  },
]

// Sample unavailable dates - in a real app, this would come from an API
const unavailableDates = [
  new Date(2023, 6, 10),
  new Date(2023, 6, 11),
  new Date(2023, 6, 12),
  new Date(2023, 6, 20),
  new Date(2023, 6, 21),
]

export function DateSelection() {
  const {
    dateRange,
    setDateRange,
    pickupLocation,
    returnLocation,
    setPickupLocation,
    setReturnLocation,
  } = useBookingStore()

  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [sameLocation, setSameLocation] = useState(true)

  // Set both pickup and return location if "same location" is selected
  useEffect(() => {
    if (sameLocation && selectedLocation) {
      setPickupLocation(selectedLocation)
      setReturnLocation(selectedLocation)
    }
  }, [sameLocation, selectedLocation, setPickupLocation, setReturnLocation])

  // Check if a date is unavailable
  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some((unavailableDate) => isSameDay(date, unavailableDate))
  }

  // Get location details by ID
  const getLocationById = (id: string) => {
    return sampleLocations.find((location) => location.id === id)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Rental Period</Label>
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={(range: DateRange | undefined) => {
            if (range) {
              setDateRange({
                from: range.from,
                to: range.to
              });
            }
          }}
          numberOfMonths={2}
          disabled={[{ before: new Date() }, isDateUnavailable]}
          className="rounded-md border"
        />

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <p>
            {dateRange.from && dateRange.to ? (
              <>
                Selected period: {format(dateRange.from, "PPP")} - {format(dateRange.to, "PPP")} (
                {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))} days)
              </>
            ) : (
              "Please select a date range for your rental"
            )}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Tabs defaultValue="same" onValueChange={(value) => setSameLocation(value === "same")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="same">Same Pickup & Return Location</TabsTrigger>
            <TabsTrigger value="different">Different Locations</TabsTrigger>
          </TabsList>

          <TabsContent value="same" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="location">Pickup & Return Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {sampleLocations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedLocation && (
              <div className="rounded-lg border p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-primary" />
                  <div>
                    <p className="font-medium">{getLocationById(selectedLocation)?.name}</p>
                    <p className="text-sm text-muted-foreground">{getLocationById(selectedLocation)?.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <p>Opening Hours: {getLocationById(selectedLocation)?.openingHours}</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="different" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="pickupLocation">Pickup Location</Label>
              <Select value={pickupLocation} onValueChange={setPickupLocation}>
                <SelectTrigger id="pickupLocation">
                  <SelectValue placeholder="Select pickup location" />
                </SelectTrigger>
                <SelectContent>
                  {sampleLocations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {pickupLocation && (
              <div className="rounded-lg border p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-primary" />
                  <div>
                    <p className="font-medium">{getLocationById(pickupLocation)?.name}</p>
                    <p className="text-sm text-muted-foreground">{getLocationById(pickupLocation)?.address}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="returnLocation">Return Location</Label>
              <Select value={returnLocation} onValueChange={setReturnLocation}>
                <SelectTrigger id="returnLocation">
                  <SelectValue placeholder="Select return location" />
                </SelectTrigger>
                <SelectContent>
                  {sampleLocations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {returnLocation && (
              <div className="rounded-lg border p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-primary" />
                  <div>
                    <p className="font-medium">{getLocationById(returnLocation)?.name}</p>
                    <p className="text-sm text-muted-foreground">{getLocationById(returnLocation)?.address}</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


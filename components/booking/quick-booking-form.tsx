"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useBookingStore } from "@/store/booking-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Search } from "lucide-react"
import type { DateRange } from "@/types/booking/booking-types"
import { DateRange as ReactDayPickerDateRange } from "react-day-picker"

export function QuickBookingForm() {
  const router = useRouter()
  const { quickBook } = useBookingStore()

  const [motorcycleType, setMotorcycleType] = useState("")
  const [location, setLocation] = useState("")
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  })

  const handleSearch = () => {
    if (motorcycleType && location && dateRange.from && dateRange.to) {
      quickBook(motorcycleType, dateRange.from, dateRange.to, location)
      router.push("/booking")
    }
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-center">Quick Booking</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Motorcycle Type</label>
            <Select value={motorcycleType} onValueChange={setMotorcycleType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Scooter">Scooter</SelectItem>
                <SelectItem value="Sport">Sport</SelectItem>
                <SelectItem value="Cafe Racer">Cafe Racer</SelectItem>
                <SelectItem value="Adventure">Adventure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Malang City Office</SelectItem>
                <SelectItem value="2">Malang Train Station</SelectItem>
                <SelectItem value="3">Malang Airport</SelectItem>
                <SelectItem value="4">Hotel Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Dates</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM d")
                    )
                  ) : (
                    <span>Pick dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={(range: ReactDayPickerDateRange | undefined) => setDateRange(range)}
                  disabled={{ before: new Date() }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-end">
            <Button
              className="w-full gap-2"
              onClick={handleSearch}
              disabled={!motorcycleType || !location || !dateRange.from || !dateRange.to}
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


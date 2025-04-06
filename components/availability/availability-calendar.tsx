"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format, addDays } from "date-fns"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"
import Link from "next/link"
import { DateRange } from "react-day-picker"

// Sample availability data
const availabilityData = {
  "2023-07-15": { available: 5, total: 10 },
  "2023-07-16": { available: 3, total: 10 },
  "2023-07-17": { available: 2, total: 10 },
  "2023-07-18": { available: 0, total: 10 },
  "2023-07-19": { available: 1, total: 10 },
  "2023-07-20": { available: 4, total: 10 },
  "2023-07-21": { available: 6, total: 10 },
  "2023-07-22": { available: 8, total: 10 },
  "2023-07-23": { available: 7, total: 10 },
  "2023-07-24": { available: 5, total: 10 },
  "2023-07-25": { available: 3, total: 10 },
}

export function AvailabilityCalendar() {
  const [month, setMonth] = useState<Date>(new Date())
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  const handlePrevMonth = () => {
    setMonth((prev) => addDays(prev, -30))
  }

  const handleNextMonth = () => {
    setMonth((prev) => addDays(prev, 30))
  }

  // Function to determine day state based on availability
  const getDayState = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd")
    const data = availabilityData[dateStr as keyof typeof availabilityData]

    if (!data) return "default"
    if (data.available === 0) return "unavailable"
    if (data.available <= 2) return "limited"
    return "available"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Motorcycle Availability</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs">Limited</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Unavailable</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">Selected</span>
          </div>
        </div>

        <Calendar
          mode="range"
          selected={selectedRange}
          onSelect={(range) => setSelectedRange(range)}
          month={month}
          onMonthChange={setMonth}
          className="rounded-md border"
          modifiers={{
            available: (date) => getDayState(date) === "available",
            limited: (date) => getDayState(date) === "limited",
            unavailable: (date) => getDayState(date) === "unavailable",
          }}
          modifiersStyles={{
            available: { backgroundColor: "rgba(34, 197, 94, 0.1)" },
            limited: { backgroundColor: "rgba(234, 179, 8, 0.1)" },
            unavailable: { backgroundColor: "rgba(239, 68, 68, 0.1)", textDecoration: "line-through" },
          }}
          disabled={[{ before: new Date() }, (date) => getDayState(date) === "unavailable"]}
        />

        {selectedRange?.from && selectedRange?.to && (
          <div className="mt-6 rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Selected Dates</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {format(selectedRange.from, "PPP")} - {format(selectedRange.to, "PPP")}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-4 w-4 text-blue-500" />
              <p className="text-xs text-muted-foreground">
                Motorcycles are available for your selected dates. Proceed to booking to see specific models.
              </p>
            </div>
            <Button className="w-full" asChild>
              <Link
                href={`/booking?from=${format(selectedRange.from, "yyyy-MM-dd")}&to=${format(selectedRange.to, "yyyy-MM-dd")}`}
              >
                Check Available Motorcycles
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


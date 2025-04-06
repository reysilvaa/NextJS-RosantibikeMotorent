"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DateRange } from "react-day-picker"

interface MotorcycleAvailabilityProps {
  motorcycleId: string
}

// Sample data - in a real app, this would come from an API
const unavailableDates = [
  new Date(2023, 6, 10),
  new Date(2023, 6, 11),
  new Date(2023, 6, 12),
  new Date(2023, 6, 20),
  new Date(2023, 6, 21),
]

export function MotorcycleAvailability({ motorcycleId: _motorcycleId }: MotorcycleAvailabilityProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(
      (unavailableDate) =>
        date.getDate() === unavailableDate.getDate() &&
        date.getMonth() === unavailableDate.getMonth() &&
        date.getFullYear() === unavailableDate.getFullYear(),
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <span className="text-xs">Available</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-destructive"></div>
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
            disabled={[{ before: new Date() }, (date) => isDateUnavailable(date)]}
            className="rounded-md border"
          />
          {selectedRange?.from && selectedRange?.to ? (
            <div className="mt-4">
              <p className="text-sm font-medium">Selected Dates:</p>
              <p className="text-sm">
                {selectedRange.from.toLocaleDateString()} - {selectedRange.to.toLocaleDateString()}
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Select a date range to check availability</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}


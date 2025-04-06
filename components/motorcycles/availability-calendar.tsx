"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { addDays, format, differenceInDays } from "date-fns"
import { DateRange } from "react-day-picker"

interface AvailabilityCalendarProps {
  motorcycleId: string
}

// Sample unavailable dates
const unavailableDates = [
  new Date(2023, 6, 10),
  new Date(2023, 6, 11),
  new Date(2023, 6, 12),
  new Date(2023, 6, 20),
  new Date(2023, 6, 21),
  new Date(2023, 7, 5),
  new Date(2023, 7, 6),
  new Date(2023, 7, 7),
]

export function AvailabilityCalendar({ motorcycleId: _motorcycleId }: AvailabilityCalendarProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  })

  const [totalPrice, setTotalPrice] = useState(0)

  // This would normally come from an API based on the motorcycleId
  const pricePerDay = 350000

  // Update total price when date range changes
  const updateTotalPrice = (from: Date | undefined, to: Date | undefined) => {
    if (from && to) {
      const days = differenceInDays(to, from) + 1
      setTotalPrice(days * pricePerDay)
    } else if (from) {
      setTotalPrice(pricePerDay)
    }
  }

  // Check if a date is unavailable
  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(
      (unavailableDate) =>
        date.getDate() === unavailableDate.getDate() &&
        date.getMonth() === unavailableDate.getMonth() &&
        date.getFullYear() === unavailableDate.getFullYear(),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Your Dates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={(range) => {
              setDateRange(range);
              if (range?.from) {
                updateTotalPrice(range.from, range.to);
              }
            }}
            numberOfMonths={1}
            disabled={{ before: new Date() }}
            modifiers={{
              unavailable: isDateUnavailable,
            }}
            modifiersStyles={{
              unavailable: { textDecoration: "line-through", color: "red" },
            }}
          />

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Rental Period:</span>
              <span>
                {dateRange?.from && format(dateRange.from, "PPP")}
                {dateRange?.to && ` - ${format(dateRange.to, "PPP")}`}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total Price:</span>
              <span className="font-bold">Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>
            <Button className="w-full">Proceed to Booking</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


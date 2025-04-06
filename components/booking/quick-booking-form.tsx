"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useBookingStore } from "@/store/booking-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Search, Bike, MapPin } from "lucide-react"
import type { DateRange as CustomDateRange } from "@/types/booking/booking-types"
import { DateRange as ReactDayPickerDateRange } from "react-day-picker"
import { cn } from "@/lib/utils"

export function QuickBookingForm() {
  const router = useRouter()
  const { quickBook, dateRange: storeDateRange, setDateRange } = useBookingStore()

  const [motorcycleType, setMotorcycleType] = useState("")
  const [location, setLocation] = useState("")
  const [dateRange, setDateRangeState] = useState<CustomDateRange>({
    from: undefined,
    to: undefined,
  })

  useEffect(() => {
    if (storeDateRange.from || storeDateRange.to) {
      setDateRangeState({
        from: storeDateRange.from || undefined,
        to: storeDateRange.to || undefined,
      });
    }
  }, []);

  const handleSearch = () => {
    if (motorcycleType && location && dateRange.from && dateRange.to) {
      setDateRange({
        from: dateRange.from,
        to: dateRange.to
      });
      
      quickBook(motorcycleType, dateRange.from, dateRange.to, location)
      router.push("/booking")
    }
  }

  return (
    <Card className="shadow-xl border-0 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <CardHeader className="bg-primary text-primary-foreground p-5">
        <CardTitle className="text-center text-xl">Mulai Petualangan Anda</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Bike className="h-4 w-4 text-primary" />
              Tipe Motor
            </label>
            <Select value={motorcycleType} onValueChange={setMotorcycleType}>
              <SelectTrigger className="bg-background/70 backdrop-blur">
                <SelectValue placeholder="Pilih tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Scooter">Scooter</SelectItem>
                <SelectItem value="Sport">Sport</SelectItem>
                <SelectItem value="Cafe Racer">Cafe Racer</SelectItem>
                <SelectItem value="Adventure">Adventure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4 text-primary" />
              Lokasi
            </label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="bg-background/70 backdrop-blur">
                <SelectValue placeholder="Pilih lokasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Malang City Office</SelectItem>
                <SelectItem value="2">Malang Train Station</SelectItem>
                <SelectItem value="3">Malang Airport</SelectItem>
                <SelectItem value="4">Hotel Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <CalendarIcon className="h-4 w-4 text-primary" />
              Tanggal
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    "w-full justify-start text-left font-normal bg-background/70 backdrop-blur",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "d MMM")} - {format(dateRange.to, "d MMM")}
                      </>
                    ) : (
                      format(dateRange.from, "d MMM")
                    )
                  ) : (
                    <span>Pilih tanggal</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={(range: ReactDayPickerDateRange | undefined) => {
                    if (range) {
                      const newDateRange: CustomDateRange = {
                        from: range.from,
                        to: range.to,
                      };
                      setDateRangeState(newDateRange);
                    }
                  }}
                  disabled={{ before: new Date() }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-end">
            <Button
              className="w-full gap-2 h-10 text-base"
              onClick={handleSearch}
              disabled={!motorcycleType || !location || !dateRange.from || !dateRange.to}
            >
              <Search className="h-4 w-4" />
              Cari
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


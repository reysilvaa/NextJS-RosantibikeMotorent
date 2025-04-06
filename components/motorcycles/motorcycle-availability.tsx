"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DateRange as ReactDayPickerDateRange } from "react-day-picker"
import { useBookingStore } from "@/store/booking-store"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import type { DateRange } from "@/types/booking/booking-types"

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

export function MotorcycleAvailability({ motorcycleId }: MotorcycleAvailabilityProps) {
  const router = useRouter()
  const { dateRange, setDateRange, setMotorcycle } = useBookingStore()
  
  // Gunakan nilai dari store sebagai nilai awal
  const [selectedRange, setSelectedRange] = useState<ReactDayPickerDateRange>({
    from: dateRange.from,
    to: dateRange.to,
  })

  // Update state lokal ketika store berubah
  useEffect(() => {
    console.log("Store dateRange changed:", dateRange);
    
    // Jangan override state lokal jika pengguna sedang memilih tanggal
    // dan store belum memiliki nilai
    const hasStoreValue = dateRange.from || dateRange.to;
    
    if (hasStoreValue) {
      console.log("Syncing from store to local state");
      setSelectedRange({
        from: dateRange.from,
        to: dateRange.to,
      });
    }
  }, [dateRange]);

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(
      (unavailableDate) =>
        date.getDate() === unavailableDate.getDate() &&
        date.getMonth() === unavailableDate.getMonth() &&
        date.getFullYear() === unavailableDate.getFullYear(),
    )
  }

  // Fungsi untuk memulai proses booking dengan motor dan tanggal yang dipilih
  const handleBookNow = () => {
    if (selectedRange.from && selectedRange.to) {
      // Pastikan data tanggal tersimpan di store
      const currentFrom = dateRange.from?.getTime();
      const currentTo = dateRange.to?.getTime();
      const newFrom = selectedRange.from?.getTime();
      const newTo = selectedRange.to?.getTime();
      
      // Update store hanya jika ada perubahan
      if (currentFrom !== newFrom || currentTo !== newTo) {
        setDateRange({
          from: selectedRange.from,
          to: selectedRange.to
        });
      }
      
      setMotorcycle(motorcycleId);
      router.push('/booking');
    }
  }

  // Fungsi untuk mereset tanggal - dipertahankan untuk penggunaan di masa depan
  const handleResetDates = () => {
    const emptyDateRange = { from: undefined, to: undefined };
    setSelectedRange(emptyDateRange);
    
    // Update store hanya jika ada tanggal yang perlu direset
    if (dateRange.from || dateRange.to) {
      setDateRange(emptyDateRange);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Ketersediaan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <span className="text-xs">Tersedia</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-destructive"></div>
              <span className="text-xs">Tidak Tersedia</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-xs">Dipilih</span>
            </div>
          </div>
          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={(range) => {
              console.log("Calendar onSelect:", range);
              
              // Selalu update state lokal terlebih dahulu
              setSelectedRange(range || { from: undefined, to: undefined });
              
              // Hanya update store jika tanggal benar-benar berubah
              const currentFrom = dateRange.from?.getTime();
              const currentTo = dateRange.to?.getTime();
              const newFrom = range?.from?.getTime();
              const newTo = range?.to?.getTime();
              
              // Update store hanya jika ada perubahan
              if (currentFrom !== newFrom || currentTo !== newTo) {
                setDateRange({
                  from: range?.from || undefined,
                  to: range?.to || undefined
                });
                console.log("Updated store with:", range?.from, range?.to);
              }
            }}
            disabled={[{ before: new Date() }, (date) => isDateUnavailable(date)]}
            className="rounded-md border"
          />
          {selectedRange?.from && selectedRange?.to ? (
            <div className="mt-4">
              <p className="text-sm font-medium">Tanggal Dipilih:</p>
              <p className="text-sm">
                {selectedRange.from.toLocaleDateString()} - {selectedRange.to.toLocaleDateString()}
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Pilih rentang tanggal untuk memeriksa ketersediaan</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}


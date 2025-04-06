"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useBookingStore } from "@/store/booking-store"
import { MotorcycleSelection } from "@/components/booking/motorcycle-selection"
import { DateSelection } from "@/components/booking/date-selection"
import { CustomerInfoForm } from "@/components/booking/customer-info-form"
import { BookingSummary } from "@/components/booking/booking-summary"
import { BookingConfirmation } from "@/components/booking/booking-confirmation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { AddOn } from "@/types/booking/booking-types"

// Sample add-ons - in a real app, this would come from an API
const sampleAddOns: AddOn[] = [
  {
    id: "1",
    name: "Helmet",
    description: "High-quality full-face helmet",
    price: 25000,
    selected: false,
  },
  {
    id: "2",
    name: "Rain Gear",
    description: "Waterproof jacket and pants",
    price: 35000,
    selected: false,
  },
  {
    id: "3",
    name: "Phone Mount",
    description: "Secure phone holder for navigation",
    price: 15000,
    selected: false,
  },
  {
    id: "4",
    name: "Insurance Premium",
    description: "Enhanced coverage with zero deductible",
    price: 50000,
    selected: false,
  },
]

export function BookingForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [addOns, setAddOns] = useState<AddOn[]>(sampleAddOns)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const {
    currentStep,
    setStep,
    motorcycleId,
    dateRange,
    pickupLocation,
    returnLocation,
    customerInfo,
    calculateTotalPrice,
    resetBooking,
  } = useBookingStore()

  // Recalculate price when component mounts
  useEffect(() => {
    calculateTotalPrice()
    console.log("Booking form loaded with date range:", dateRange);
  }, [calculateTotalPrice, dateRange])

  const handleNextStep = () => {
    setStep(currentStep + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePrevStep = () => {
    setStep(currentStep - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsComplete(true)
      toast({
        title: "Booking Successful",
        description: "Your booking has been submitted successfully. We&apos;ll contact you shortly.",
      })
    } catch {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleAddOn = (id: string) => {
    setAddOns((prev) => prev.map((addon) => (addon.id === id ? { ...addon, selected: !addon.selected } : addon)))
  }

  const applyPromoCode = () => {
    // In a real app, this would validate the promo code with an API
    if (promoCode === "DISCOUNT10") {
      setPromoApplied(true)
    } else {
      setPromoApplied(false)
    }
  }

  const canProceedToStep2 = !!motorcycleId
  const canProceedToStep3 = !!dateRange.from && !!dateRange.to && !!pickupLocation && !!returnLocation
  const canProceedToStep4 =
    !!customerInfo.firstName &&
    !!customerInfo.lastName &&
    !!customerInfo.email &&
    !!customerInfo.phone &&
    !!customerInfo.licenseNumber
  const canSubmit = true // We can always submit from the add-ons page

  if (isComplete) {
    return (
      <BookingConfirmation
        onReset={() => {
          resetBooking()
          setIsComplete(false)
        }}
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            1
          </div>
          <div className="h-1 flex-1 bg-muted mx-2">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${currentStep > 1 ? "100%" : "0%"}` }}
            ></div>
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            2
          </div>
          <div className="h-1 flex-1 bg-muted mx-2">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${currentStep > 2 ? "100%" : "0%"}` }}
            ></div>
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            3
          </div>
          <div className="h-1 flex-1 bg-muted mx-2">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${currentStep > 3 ? "100%" : "0%"}` }}
            ></div>
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              currentStep >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            4
          </div>
        </div>
        <div className="mt-4 flex justify-between text-xs md:text-sm">
          <span className={currentStep >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>
            Pilih Motor
          </span>
          <span className={currentStep >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>Pilih Tanggal</span>
          <span className={currentStep >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>
            Informasi Pribadi
          </span>
          <span className={currentStep >= 4 ? "text-primary font-medium" : "text-muted-foreground"}>
            Extras & Add-ons
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Pilih Motor</CardTitle>
                    <CardDescription>Pilih motor yang sesuai untuk petualangan Anda</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MotorcycleSelection />
                  </CardContent>
                  <div className="p-6 pt-0 flex justify-end">
                    <Button type="button" onClick={handleNextStep} disabled={!canProceedToStep2}>
                      Lanjut ke Tanggal
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Pilih Tanggal</CardTitle>
                    <CardDescription>Pilih tanggal dan lokasi pengambilan dan pengembalian</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DateSelection />
                  </CardContent>
                  <div className="p-6 pt-0 flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStep}>
                      Kembali
                    </Button>
                    <Button type="button" onClick={handleNextStep} disabled={!canProceedToStep3}>
                      Lanjut ke Info Pribadi
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Pribadi</CardTitle>
                    <CardDescription>Mohon berikan detail kontak Anda untuk menyelesaikan booking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomerInfoForm />
                  </CardContent>
                  <div className="p-6 pt-0 flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStep}>
                      Kembali
                    </Button>
                    <Button type="button" onClick={handleNextStep} disabled={!canProceedToStep4}>
                      Lanjut ke Add-ons
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Extras & Add-ons</CardTitle>
                    <CardDescription>Pilih perlengkapan tambahan untuk perjalanan Anda</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Available Add-ons</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {addOns.map((addon) => (
                            <div key={addon.id} className="flex items-start space-x-3 border rounded-lg p-3">
                              <Checkbox
                                id={`addon-${addon.id}`}
                                checked={addon.selected}
                                onCheckedChange={() => toggleAddOn(addon.id)}
                              />
                              <div className="flex-1">
                                <Label htmlFor={`addon-${addon.id}`} className="font-medium cursor-pointer">
                                  {addon.name} - Rp {addon.price.toLocaleString('id-ID')}/hari
                                </Label>
                                <p className="text-sm text-muted-foreground">{addon.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t">
                        <Label htmlFor="promoCode">Kode Promo</Label>
                        <div className="flex gap-2">
                          <Input
                            id="promoCode"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Masukkan kode promo"
                            className="flex-1"
                          />
                          <button
                            type="button"
                            onClick={applyPromoCode}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                          >
                            Terapkan
                          </button>
                        </div>
                        {promoApplied && <p className="text-sm text-green-600">Kode promo diterapkan! Diskon 10%.</p>}
                        {promoCode && !promoApplied && <p className="text-sm text-red-500">Kode promo tidak valid.</p>}
                      </div>
                    </div>
                  </CardContent>
                  <div className="p-6 pt-0 flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStep}>
                      Kembali
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Memproses...
                        </>
                      ) : (
                        "Selesaikan Booking"
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </form>
        </div>

        <div className="md:col-span-1">
          <BookingSummary />
        </div>
      </div>
    </div>
  )
}


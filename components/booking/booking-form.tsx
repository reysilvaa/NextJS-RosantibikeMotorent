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

export function BookingForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

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
  }, [calculateTotalPrice])

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

  const canProceedToStep2 = !!motorcycleId
  const canProceedToStep3 = !!dateRange.from && !!dateRange.to && !!pickupLocation && !!returnLocation
  const canSubmit =
    !!customerInfo.firstName &&
    !!customerInfo.lastName &&
    !!customerInfo.email &&
    !!customerInfo.phone &&
    !!customerInfo.licenseNumber

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
        </div>
        <div className="mt-4 flex justify-between text-sm">
          <span className={currentStep >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>
            Select Motorcycle
          </span>
          <span className={currentStep >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>Choose Dates</span>
          <span className={currentStep >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>
            Personal Information
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
                    <CardTitle>Select Motorcycle</CardTitle>
                    <CardDescription>Choose your preferred motorcycle for your adventure</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MotorcycleSelection />
                  </CardContent>
                  <div className="p-6 pt-0 flex justify-end">
                    <Button type="button" onClick={handleNextStep} disabled={!canProceedToStep2}>
                      Continue to Dates
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
                    <CardTitle>Choose Dates</CardTitle>
                    <CardDescription>Select your pickup and return dates and locations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DateSelection />
                  </CardContent>
                  <div className="p-6 pt-0 flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStep}>
                      Back
                    </Button>
                    <Button type="button" onClick={handleNextStep} disabled={!canProceedToStep3}>
                      Continue to Personal Info
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
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Please provide your contact details to complete the booking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomerInfoForm />
                  </CardContent>
                  <div className="p-6 pt-0 flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStep}>
                      Back
                    </Button>
                    <Button type="submit" disabled={!canSubmit || isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Complete Booking"
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


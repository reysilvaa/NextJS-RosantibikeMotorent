"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Calendar, MapPin, Phone, Mail, Download, Share2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface BookingConfirmationProps {
  onReset: () => void
}

export function BookingConfirmation({ onReset }: BookingConfirmationProps) {
  // Generate a random booking reference
  const bookingReference = `RB${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="max-w-3xl mx-auto">
        <CardContent className="pt-6 pb-8">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
            <p className="text-muted-foreground">
              Your booking has been confirmed. We&apos;ve sent the details to your email.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Booking Reference</h3>
                <span className="text-lg font-mono bg-primary/10 px-3 py-1 rounded-md">{bookingReference}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Pickup Date</p>
                    <p className="text-muted-foreground">July 15, 2023 at 10:00 AM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Return Date</p>
                    <p className="text-muted-foreground">July 18, 2023 at 10:00 AM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Pickup Location</p>
                    <p className="text-muted-foreground">Malang City Office</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Return Location</p>
                    <p className="text-muted-foreground">Malang City Office</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-4">What&apos;s Next?</h3>
              <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                <li>Check your email for a detailed booking confirmation.</li>
                <li>Prepare your driver&apos;s license and ID for pickup.</li>
                <li>Arrive at the pickup location 15 minutes before your scheduled time.</li>
                <li>Our staff will assist you with the motorcycle and provide safety instructions.</li>
              </ol>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-4">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href="tel:+6281234567890" className="hover:text-primary">
                    +62 812 3456 7890
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:support@rbike.id" className="hover:text-primary">
                    support@rbike.id
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button variant="outline" className="gap-2" asChild>
                <Link href="#">
                  <Download className="h-4 w-4" />
                  Download Receipt
                </Link>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <Link href="#">
                  <Share2 className="h-4 w-4" />
                  Share Booking
                </Link>
              </Button>
              <Button onClick={onReset}>Make Another Booking</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}


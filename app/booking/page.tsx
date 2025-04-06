import type { Metadata } from "next"
import { BookingForm } from "@/components/booking/booking-form"
import { PageHeader } from "@/components/ui/page-header"

export const metadata: Metadata = {
  title: "Book Your Motorcycle",
  description: "Complete your motorcycle rental booking with our easy step-by-step process.",
}

export default function BookingPage() {
  return (
    <div className="container py-8 md:py-12">
      <PageHeader
        title="Book Your Motorcycle"
        description="Complete your booking with our easy step-by-step process."
      />
      <div className="mt-8">
        <BookingForm />
      </div>
    </div>
  )
}


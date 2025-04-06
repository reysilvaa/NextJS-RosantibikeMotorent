import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { AvailabilityCalendar } from "@/components/availability/availability-calendar"
import { AvailabilityFilter } from "@/components/availability/availability-filter"

export const metadata: Metadata = {
  title: "Check Availability | RosantiBike Motorcycle Rental",
  description: "Check the availability of motorcycles for rent in Malang, Indonesia and book your preferred dates.",
}

export default function AvailabilityPage() {
  return (
    <div className="container py-16 md:py-24">
      <PageHeader
        title="Check Availability"
        description="Find and reserve available motorcycles for your desired dates"
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <AvailabilityFilter />
        </div>
        <div className="md:col-span-2">
          <AvailabilityCalendar />
        </div>
      </div>
    </div>
  )
}


import type { Metadata } from "next"
import { MotorcycleFilters } from "@/components/motorcycles/motorcycle-filters"
import { MotorcycleGrid } from "@/components/motorcycles/motorcycle-grid"
import { PageHeader } from "@/components/ui/page-header"

export const metadata: Metadata = {
  title: "Our Motorcycle Collection",
  description:
    "Browse our extensive collection of premium motorcycles available for rent in Indonesia. Filter by brand, model, year, and price range.",
}

export default function MotorcyclesPage() {
  return (
    <div className="container py-8 md:py-12">
      <PageHeader
        title="Our Motorcycle Collection"
        description="Browse our extensive collection of premium motorcycles available for rent in Indonesia."
      />
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <MotorcycleFilters />
        </div>
        <div className="lg:col-span-3">
          <MotorcycleGrid />
        </div>
      </div>
    </div>
  )
}


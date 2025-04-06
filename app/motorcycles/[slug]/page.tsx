import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MotorcycleGallery } from "@/components/motorcycles/motorcycle-gallery"
import { MotorcycleDetails } from "@/components/motorcycles/motorcycle-details"
import { MotorcycleSpecifications } from "@/components/motorcycles/motorcycle-specifications"
import { MotorcycleAvailability } from "@/components/motorcycles/motorcycle-availability"
import { MotorcycleBookingCta } from "@/components/motorcycles/motorcycle-booking-cta"
import { getMotorcycleBySlug } from "@/lib/api/motorcycles"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const motorcycle = await getMotorcycleBySlug(params.slug)

  if (!motorcycle) {
    return {
      title: "Motorcycle Not Found",
    }
  }

  return {
    title: motorcycle.name,
    description: `Rent the ${motorcycle.name} motorcycle in Indonesia. ${motorcycle.description.substring(0, 150)}...`,
    openGraph: {
      images: [
        {
          url: motorcycle.images[0],
          width: 1200,
          height: 630,
          alt: motorcycle.name,
        },
      ],
    },
  }
}

export default async function MotorcycleDetailPage({ params }: { params: { slug: string } }) {
  const motorcycle = await getMotorcycleBySlug(params.slug)

  if (!motorcycle) {
    notFound()
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <MotorcycleGallery images={motorcycle.images} name={motorcycle.name} />
        <div className="flex flex-col gap-8">
          <MotorcycleDetails motorcycle={motorcycle} />
          <MotorcycleAvailability motorcycleId={motorcycle.id} />
          <MotorcycleBookingCta motorcycle={motorcycle} />
        </div>
      </div>
      <div className="mt-12">
        <MotorcycleSpecifications specifications={motorcycle.specifications} />
      </div>
    </div>
  )
}


import type { Metadata } from "next"
import { HeroSection } from "@/components/home/hero-section"
import { MotorcycleShowcase } from "@/components/home/motorcycle-showcase"
import { BenefitsSection } from "@/components/home/benefits-section"
import { TourismGallery } from "@/components/home/tourism-gallery"
import { CustomerGallery } from "@/components/home/customer-gallery"
import { RentalProcess } from "@/components/home/rental-process"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CtaSection } from "@/components/home/cta-section"
import { QuickBookingForm } from "@/components/booking/quick-booking-form"

export const metadata: Metadata = {
  title: "Premium Motorcycle Rental Service in Malang, Indonesia",
  description:
    "Rent premium motorcycles for your adventure in Malang, Indonesia. Wide range of bikes, competitive prices, and excellent service.",
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="container -mt-16 relative z-10">
        <QuickBookingForm />
      </div>
      <MotorcycleShowcase />
      <BenefitsSection />
      <RentalProcess />
      <TourismGallery />
      <CustomerGallery />
      <TestimonialsSection />
      <CtaSection />
    </div>
  )
}


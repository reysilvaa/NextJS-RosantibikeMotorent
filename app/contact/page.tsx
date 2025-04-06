import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"

export const metadata: Metadata = {
  title: "Contact Us | RosantiBike Motorcycle Rental",
  description: "Get in touch with RosantiBike for inquiries about motorcycle rentals in Malang, Indonesia.",
}

export default function ContactPage() {
  return (
    <div className="container py-16 md:py-24">
      <PageHeader title="Contact Us" description="Have questions or need assistance? We're here to help!" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  )
}


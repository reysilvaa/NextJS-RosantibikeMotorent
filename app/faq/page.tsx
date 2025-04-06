import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "FAQ | RosantiBike Motorcycle Rental",
  description: "Find answers to frequently asked questions about motorcycle rentals in Malang, Indonesia.",
}

// Sample FAQ data
const faqCategories = [
  {
    title: "Booking & Reservations",
    questions: [
      {
        question: "How do I book a motorcycle?",
        answer:
          "You can book a motorcycle through our website by selecting your desired motorcycle, rental dates, and completing the booking form. Alternatively, you can contact us directly via phone or email to make a reservation.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "We recommend booking at least 2-3 days in advance, especially during peak tourist seasons (June-August and December-January). For weekends and holidays, booking a week in advance is advisable to ensure availability.",
      },
      {
        question: "Can I modify or cancel my booking?",
        answer:
          "Yes, you can modify or cancel your booking up to 24 hours before the scheduled pickup time without any penalty. For cancellations within 24 hours, a 50% cancellation fee may apply.",
      },
      {
        question: "Is a deposit required for booking?",
        answer:
          "Yes, we require a 30% deposit to confirm your booking. The remaining balance is due at the time of pickup.",
      },
    ],
  },
  {
    title: "Rental Requirements",
    questions: [
      {
        question: "What documents do I need to rent a motorcycle?",
        answer:
          "You'll need a valid driver's license (international or Indonesian), a passport or ID card, and a credit card for the security deposit. For international visitors, an International Driving Permit (IDP) is recommended but not strictly required.",
      },
      {
        question: "Is there an age requirement for renting?",
        answer:
          "Yes, you must be at least 18 years old to rent a scooter and 21 years old to rent a motorcycle with an engine capacity above 250cc.",
      },
      {
        question: "Do I need prior motorcycle experience?",
        answer:
          "Yes, we require that you have experience riding motorcycles, especially for our higher-powered models. For safety reasons, we may refuse rental if we believe you lack sufficient experience.",
      },
      {
        question: "Is a security deposit required?",
        answer:
          "Yes, we require a security deposit which can be provided via credit card hold or cash. The amount varies depending on the motorcycle model, ranging from Rp 500,000 to Rp 2,000,000.",
      },
    ],
  },
  {
    title: "Pickup & Return",
    questions: [
      {
        question: "Where can I pick up and return the motorcycle?",
        answer:
          "You can pick up and return the motorcycle at our main office in Malang. We also offer delivery and pickup services to hotels and accommodations within Malang city for an additional fee.",
      },
      {
        question: "What are your operating hours?",
        answer:
          "Our office is open from 8:00 AM to 8:00 PM Monday through Saturday, and 10:00 AM to 6:00 PM on Sundays. Pickups and returns are available during these hours.",
      },
      {
        question: "Can I return the motorcycle to a different location?",
        answer:
          "One-way rentals are available for certain destinations with advance arrangement. Additional fees apply based on the distance. Please contact us for specific one-way rental options.",
      },
      {
        question: "What happens if I return the motorcycle late?",
        answer:
          "Late returns are charged at an hourly rate of 10% of the daily rental fee. If you know you'll be late, please contact us as soon as possible to avoid additional charges.",
      },
    ],
  },
  {
    title: "Insurance & Safety",
    questions: [
      {
        question: "Is insurance included in the rental price?",
        answer:
          "Basic third-party liability insurance is included in all rentals. Comprehensive insurance covering theft and damage is available for an additional fee of Rp 50,000 per day.",
      },
      {
        question: "What happens if the motorcycle breaks down?",
        answer:
          "In case of breakdown, contact our 24/7 support line immediately. We'll arrange for assistance or a replacement motorcycle as quickly as possible at no extra cost if the issue is not caused by misuse.",
      },
      {
        question: "Do you provide helmets and safety gear?",
        answer:
          "Yes, we provide DOT-certified helmets for all riders at no additional cost. We also offer optional safety gear such as gloves, jackets, and rain ponchos for rent.",
      },
      {
        question: "What happens if I have an accident?",
        answer:
          "In case of an accident, ensure your safety first, then contact local authorities if necessary. Call our emergency number to report the incident. Depending on your insurance coverage, you may be responsible for damages up to the deductible amount.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="container py-16 md:py-24">
      <PageHeader
        title="Frequently Asked Questions"
        description="Find answers to common questions about our motorcycle rental service"
      />

      <div className="mt-12 space-y-8">
        {faqCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          If you couldn&apos;t find the answer to your question, please don&apos;t hesitate to contact us directly. Our customer
          service team is ready to assist you.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}


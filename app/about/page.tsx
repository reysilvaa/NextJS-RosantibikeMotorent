import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us | RosantiBike Motorcycle Rental",
  description: "Learn about RosantiBike, the premier motorcycle rental service in Malang, Indonesia.",
}

export default function AboutPage() {
  return (
    <div className="container py-16 md:py-24">
      <PageHeader title="About RosantiBike" description="The premier motorcycle rental service in Malang, Indonesia" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        <div className="relative aspect-square md:aspect-auto rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=600&width=600" alt="RosantiBike team" fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2018, RosantiBike started with a simple mission: to provide tourists and locals with a reliable,
            affordable way to explore the beautiful city of Malang and its surroundings.
          </p>
          <p className="text-muted-foreground mb-4">
            What began as a small operation with just 5 scooters has now grown into Malang&apos;s most trusted motorcycle
            rental service with a fleet of over 50 well-maintained vehicles ranging from comfortable scooters to
            powerful motorcycles.
          </p>
          <p className="text-muted-foreground">
            Our team consists of passionate motorcycle enthusiasts who know Malang inside out and are dedicated to
            ensuring you have the best experience exploring our beautiful region.
          </p>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Quality Vehicles</h3>
            <p className="text-muted-foreground">
              All our motorcycles and scooters are regularly serviced and maintained to ensure safety and reliability.
              We only offer vehicles that we would ride ourselves.
            </p>
          </div>
          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
            <p className="text-muted-foreground">
              Our team can provide insider tips on the best routes, hidden gems, and local attractions that you won&apos;t
              find in typical tourist guides.
            </p>
          </div>
          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Customer Service</h3>
            <p className="text-muted-foreground">
              We pride ourselves on our friendly, responsive service. From booking to return, we&apos;re here to help make
              your experience smooth and enjoyable.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Budi Santoso", role: "Founder & CEO", image: "/placeholder.svg?height=300&width=300" },
            { name: "Dewi Putri", role: "Operations Manager", image: "/placeholder.svg?height=300&width=300" },
            { name: "Reza Pratama", role: "Head Mechanic", image: "/placeholder.svg?height=300&width=300" },
            { name: "Siti Aminah", role: "Customer Relations", image: "/placeholder.svg?height=300&width=300" },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative aspect-square rounded-full overflow-hidden mx-auto w-40 h-40 mb-4">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Explore Malang?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Experience the freedom of exploring Malang on two wheels with RosantiBike&apos;s premium rental service.
        </p>
        <Button size="lg" asChild>
          <Link href="/motorcycles">Browse Our Motorcycles</Link>
        </Button>
      </div>
    </div>
  )
}


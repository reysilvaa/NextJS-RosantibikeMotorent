import type { Metadata } from "next"
import Image from "next/image"
import { PageHeader } from "@/components/ui/page-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Tourism Guide | RosantiBike Motorcycle Rental",
  description: "Discover the best tourist destinations in and around Malang, Indonesia with our comprehensive guide.",
}

// Sample tourism destinations data
const destinations = [
  {
    id: "1",
    name: "Mount Bromo",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Experience the breathtaking sunrise view at Mount Bromo, one of Indonesia's most iconic volcanoes. The vast sea of sand and the smoking crater create an otherworldly landscape that's perfect for photography.",
    distance: "40 km from Malang",
    travelTime: "2 hours by motorcycle",
    category: "Nature",
    rating: 4.9,
    bestTime: "3:00 AM - 7:00 AM for sunrise",
    tips: [
      "Start early (around 3 AM) to catch the sunrise",
      "Bring warm clothing as temperatures can be very cold",
      "Wear sturdy shoes for hiking",
      "Bring cash for entrance fees and local guides",
    ],
  },
  {
    id: "2",
    name: "Jatim Park",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "A family-friendly theme park with various attractions, rides, and educational exhibits. Jatim Park is actually a series of parks (Jatim Park 1, 2, and 3) each offering different experiences from amusement rides to wildlife encounters.",
    distance: "15 km from Malang",
    travelTime: "45 minutes by motorcycle",
    category: "Entertainment",
    rating: 4.7,
    bestTime: "Weekdays to avoid crowds",
    tips: [
      "Purchase tickets online to avoid queues",
      "Plan to spend a full day to enjoy all attractions",
      "Bring sunscreen and a hat",
      "Visit on weekdays for smaller crowds",
    ],
  },
  {
    id: "3",
    name: "Batu Secret Zoo",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Modern zoo with a diverse collection of animals and interactive experiences for visitors. Part of Jatim Park 2, this zoo is known for its clean facilities, well-maintained habitats, and unique animal collection.",
    distance: "18 km from Malang",
    travelTime: "50 minutes by motorcycle",
    category: "Wildlife",
    rating: 4.8,
    bestTime: "Morning hours when animals are most active",
    tips: [
      "Visit early in the morning when animals are most active",
      "Combine with a visit to Museum Angkut nearby",
      "Check feeding schedules upon arrival",
      "Allocate at least 3-4 hours for a complete visit",
    ],
  },
  {
    id: "4",
    name: "Coban Rondo Waterfall",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Beautiful waterfall surrounded by lush forest, perfect for a refreshing day trip. The 84-meter high waterfall creates a cool microclimate and is surrounded by recreational facilities including camping grounds and picnic areas.",
    distance: "25 km from Malang",
    travelTime: "1 hour by motorcycle",
    category: "Nature",
    rating: 4.6,
    bestTime: "Morning to early afternoon",
    tips: [
      "Wear comfortable shoes as there are many steps to reach the waterfall",
      "Bring a change of clothes if you plan to swim",
      "Visit on weekdays to avoid crowds",
      "Combine with a visit to nearby apple orchards",
    ],
  },
  {
    id: "5",
    name: "Tugu Malang",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Historic monument in the heart of Malang city, a symbol of the city's heritage. This Dutch colonial-era landmark is surrounded by beautiful gardens and is a popular meeting point and photography spot.",
    distance: "5 km from Malang",
    travelTime: "15 minutes by motorcycle",
    category: "Heritage",
    rating: 4.5,
    bestTime: "Late afternoon and evening",
    tips: [
      "Visit in the evening when it's beautifully lit up",
      "Explore the surrounding cafes and restaurants",
      "Great starting point for a city tour",
      "Combine with a visit to nearby colonial buildings",
    ],
  },
  {
    id: "6",
    name: "Kampung Warna-Warni Jodipan",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Colorful village with vibrant painted houses, a popular Instagram spot. What started as a student project to revitalize a slum area has become one of Malang's most visited attractions, featuring murals and colorful decorations.",
    distance: "7 km from Malang",
    travelTime: "20 minutes by motorcycle",
    category: "Culture",
    rating: 4.7,
    bestTime: "Morning for best lighting",
    tips: [
      "Visit early morning for the best lighting and fewer crowds",
      "Respect the residents as this is a living community",
      "Small entrance fee goes to community maintenance",
      "Wear comfortable shoes as you'll be walking on stairs and slopes",
    ],
  },
]

export default function TourismGuidePage() {
  return (
    <div className="container py-16 md:py-24">
      <PageHeader
        title="Tourism Guide"
        description="Discover the best destinations to explore in and around Malang with our rental motorcycles"
      />

      <div className="mt-12 space-y-12">
        {destinations.map((destination) => (
          <Card key={destination.id} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative h-64 md:h-auto md:col-span-1">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-2 right-2">{destination.category}</Badge>
              </div>
              <div className="p-6 md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">{destination.name}</h2>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span>{destination.rating}/5</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{destination.distance}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{destination.travelTime}</span>
                  </div>
                </div>

                <p className="mb-4">{destination.description}</p>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Best Time to Visit</h3>
                  <p className="text-sm text-muted-foreground">{destination.bestTime}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Travel Tips</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {destination.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


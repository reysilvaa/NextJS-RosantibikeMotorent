"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

// Sample customer testimonials with photos
const testimonials = [
  {
    id: "1",
    name: "John Doe",
    country: "Australia",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    comment:
      "Renting a scooter from RosantiBike was the best decision for exploring Malang. The service was excellent!",
    photos: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    country: "United States",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    comment: "The motorcycle was in perfect condition and made our trip around Bromo so much more enjoyable.",
    photos: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
  },
  {
    id: "3",
    name: "Ahmad Rizki",
    country: "Indonesia",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4,
    comment: "Great service, affordable prices, and the staff was very helpful with recommending routes.",
    photos: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
  },
  {
    id: "4",
    name: "Emma Wilson",
    country: "United Kingdom",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    comment: "As a solo female traveler, I felt safe and confident exploring Malang with the scooter from RosantiBike.",
    photos: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
  },
]

export function CustomerGallery() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Our Happy Customers</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            See how our customers enjoyed exploring Malang with our rental motorcycles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <motion.div
              key={testimonials[activeIndex].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 text-yellow-500 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonials[activeIndex].rating ? "fill-current" : ""}`}
                      />
                    ))}
                  </div>

                  <div className="relative mb-6 flex-grow">
                    <Quote className="h-10 w-10 text-primary/20 absolute -top-2 -left-2" />
                    <p className="text-lg relative z-10 pl-6">{testimonials[activeIndex].comment}</p>
                  </div>

                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonials[activeIndex].avatar} alt={testimonials[activeIndex].name} />
                      <AvatarFallback>{testimonials[activeIndex].name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonials[activeIndex].name}</p>
                      <p className="text-sm text-muted-foreground">{testimonials[activeIndex].country}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              {testimonials[activeIndex].photos.map((photo, index) => (
                <motion.div
                  key={`${testimonials[activeIndex].id}-photo-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Image
                    src={photo || "/placeholder.svg"}
                    alt={`${testimonials[activeIndex].name}'s adventure`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full ${index === activeIndex ? "bg-primary" : "bg-muted"}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


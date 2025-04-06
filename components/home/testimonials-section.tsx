"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    location: "Jakarta",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "The motorcycle was in excellent condition and the rental process was smooth. I had a great time exploring Bali with the Honda CBR.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "Australia",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "As a tourist, I was worried about renting a motorcycle in Indonesia, but RBike made it so easy. The staff was helpful and the bike was perfect.",
  },
  {
    id: 3,
    name: "Dian Wijaya",
    location: "Surabaya",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    text: "Great service and competitive prices. The motorcycle was clean and well-maintained. Will definitely rent from RBike again.",
  },
  {
    id: 4,
    name: "Michael Chen",
    location: "Singapore",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "I've rented motorcycles in many countries, and RBike offers one of the best services I've experienced. Professional and reliable.",
  },
  {
    id: 5,
    name: "Putri Anggraini",
    location: "Yogyakarta",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "The online booking system was convenient, and the motorcycle was delivered to my hotel on time. Excellent service!",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const getCurrentTestimonials = () => {
    const start = currentIndex * itemsPerPage
    return testimonials.slice(start, start + itemsPerPage)
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our customers have to say about their experience with RBike.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getCurrentTestimonials().map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{testimonial.text}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <Button variant="outline" size="icon" onClick={prevSlide}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  variant={currentIndex === index ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button variant="outline" size="icon" onClick={nextSlide}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


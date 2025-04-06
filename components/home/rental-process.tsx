"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, BikeIcon as Motorcycle, CreditCard, Map } from "lucide-react"

const steps = [
  {
    icon: Calendar,
    title: "Book Online",
    description: "Choose your motorcycle and rental dates through our easy online booking system.",
  },
  {
    icon: CreditCard,
    title: "Confirm & Pay",
    description: "Secure your booking with a small deposit or pay in full for additional discounts.",
  },
  {
    icon: Motorcycle,
    title: "Pick Up",
    description: "Collect your motorcycle from our location or request delivery to your accommodation.",
  },
  {
    icon: Map,
    title: "Explore Malang",
    description: "Enjoy the freedom to explore Malang and its surroundings at your own pace.",
  },
]

export function RentalProcess() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-2 text-primary-foreground/80 max-w-2xl mx-auto">
            Renting a motorcycle with us is quick and easy. Follow these simple steps to get on the road.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary-foreground/20 p-4 mb-4">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-primary-foreground/80">{step.description}</p>
                  <div className="mt-4 text-3xl font-bold text-primary-foreground/50">{index + 1}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


"use client"

import { motion } from "framer-motion"
import { Shield, Star, CreditCard, PhoneCall } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

const benefits = [
  {
    icon: Star,
    title: "benefits.quality",
    description:
      "We offer only the best motorcycles from trusted brands, regularly maintained to ensure safety and performance.",
  },
  {
    icon: CreditCard,
    title: "benefits.price",
    description: "Get the best value for your money with our transparent pricing and no hidden fees.",
  },
  {
    icon: Shield,
    title: "benefits.service",
    description: "Our team is dedicated to providing you with the best service from booking to return.",
  },
  {
    icon: PhoneCall,
    title: "benefits.support",
    description: "Our support team is available 24/7 to assist you with any questions or issues.",
  },
]

export function BenefitsSection() {
  const { t } = useTranslation()

  return (
    <section className="container py-12 md:py-16 lg:py-20">
      <div className="text-center mb-12">
        <motion.h2
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t("benefits.title")}
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-lg border bg-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <benefit.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t(benefit.title)}</h3>
            <p className="text-sm text-muted-foreground">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


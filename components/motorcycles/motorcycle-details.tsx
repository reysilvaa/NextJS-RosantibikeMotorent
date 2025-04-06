"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface Motorcycle {
  id: string
  name: string
  brand: string
  category: string
  year: number
  description: string
  price: number
  engineSize: string
  power: string
  transmission: string
  fuelCapacity: string
  weight: string
}

interface MotorcycleDetailsProps {
  motorcycle: Motorcycle
}

export function MotorcycleDetails({ motorcycle }: MotorcycleDetailsProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center gap-2">
        <Badge variant="outline">{motorcycle.category}</Badge>
        <Badge variant="outline">{motorcycle.brand}</Badge>
        <Badge variant="outline">{motorcycle.year}</Badge>
      </div>
      <h1 className="mt-2 text-3xl font-bold">{motorcycle.name}</h1>
      <p className="mt-4 text-muted-foreground">{motorcycle.description}</p>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Engine</p>
          <p className="font-medium">{motorcycle.engineSize}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Power</p>
          <p className="font-medium">{motorcycle.power}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Transmission</p>
          <p className="font-medium">{motorcycle.transmission}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Fuel Capacity</p>
          <p className="font-medium">{motorcycle.fuelCapacity}</p>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm text-muted-foreground">Rental Price</p>
        <p className="text-2xl font-bold">Rp {motorcycle.price.toLocaleString('id-ID')} / day</p>
      </div>
    </motion.div>
  )
}


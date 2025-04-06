"use client"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Specifications {
  engine: {
    type: string
    displacement: string
    bore: string
    stroke: string
    compressionRatio: string
    valveTrain: string
    fuelSystem: string
    ignition: string
    cooling: string
    power: string
    torque: string
  }
  chassis: {
    frame: string
    frontSuspension: string
    rearSuspension: string
    frontBrake: string
    rearBrake: string
    frontTire: string
    rearTire: string
  }
  dimensions: {
    length: string
    width: string
    height: string
    seatHeight: string
    wheelbase: string
    groundClearance: string
    weight: string
    fuelCapacity: string
  }
  electrical: {
    battery: string
    headlight: string
    taillight: string
    indicators: string
  }
}

interface MotorcycleSpecificationsProps {
  specifications: Specifications
}

export function MotorcycleSpecifications({ specifications }: MotorcycleSpecificationsProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className="text-2xl font-bold mb-6">Specifications</h2>
      <Tabs defaultValue="engine">
        <TabsList className="mb-6">
          <TabsTrigger value="engine">Engine</TabsTrigger>
          <TabsTrigger value="chassis">Chassis</TabsTrigger>
          <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
          <TabsTrigger value="electrical">Electrical</TabsTrigger>
        </TabsList>
        <TabsContent value="engine">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(specifications.engine).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="chassis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(specifications.chassis).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="dimensions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(specifications.dimensions).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="electrical">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(specifications.electrical).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}


// This is a mock API function that would be replaced with a real API call in a production app

export async function getMotorcycleBySlug(slug: string) {
  // In a real app, this would fetch data from an API
  const motorcycle = {
    id: "1",
    name: "Honda CBR 250RR",
    slug: "honda-cbr-250rr",
    brand: "Honda",
    category: "Sport",
    year: 2022,
    description:
      "The Honda CBR250RR is a 250 cc sport bike made by Honda since 2017. It features a twin-cylinder engine, aggressive styling, and advanced technology for an exhilarating riding experience.",
    price: 350000,
    engineSize: "249.7 cc",
    power: "41 HP @ 13,000 rpm",
    transmission: "6-speed",
    fuelCapacity: "14.5 liters",
    weight: "168 kg",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    specifications: {
      engine: {
        type: "Liquid-cooled 4-stroke DOHC 8-valve parallel twin",
        displacement: "249.7 cc",
        bore: "62 mm",
        stroke: "41.4 mm",
        compressionRatio: "11.5:1",
        valveTrain: "DOHC",
        fuelSystem: "PGM-FI",
        ignition: "Digital transistorized",
        cooling: "Liquid-cooled",
        power: "41 HP @ 13,000 rpm",
        torque: "25 Nm @ 11,000 rpm",
      },
      chassis: {
        frame: "Steel diamond truss",
        frontSuspension: "USD fork, 120mm travel",
        rearSuspension: "Pro-link with 5-step preload, 103mm travel",
        frontBrake: "310mm disc with radial-mount 4-piston caliper",
        rearBrake: "240mm disc with single-piston caliper",
        frontTire: "110/70-17",
        rearTire: "140/70-17",
      },
      dimensions: {
        length: "2,060 mm",
        width: "724 mm",
        height: "1,098 mm",
        seatHeight: "790 mm",
        wheelbase: "1,389 mm",
        groundClearance: "145 mm",
        weight: "168 kg",
        fuelCapacity: "14.5 liters",
      },
      electrical: {
        battery: "12V 7Ah",
        headlight: "LED",
        taillight: "LED",
        indicators: "LED",
      },
    },
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Check if the slug matches
  if (slug === motorcycle.slug) {
    return motorcycle
  }

  return null
}


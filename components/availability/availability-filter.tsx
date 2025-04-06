"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function AvailabilityFilter() {
  const [priceRange, setPriceRange] = useState([100000, 500000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const handleReset = () => {
    setPriceRange([100000, 500000])
    setSelectedCategories([])
    setSelectedBrands([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="multiple" defaultValue={["price", "category", "brand"]}>
          <AccordionItem value="price">
            <AccordionTrigger>Price Range (IDR/day)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider value={priceRange} min={50000} max={1000000} step={50000} onValueChange={setPriceRange} />
                <div className="flex items-center justify-between text-sm">
                  <span>Rp {priceRange[0].toLocaleString()}</span>
                  <span>Rp {priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["Scooter", "Sport", "Cruiser", "Adventure", "Naked"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="brand">
            <AccordionTrigger>Brand</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["Honda", "Yamaha", "Kawasaki", "Suzuki", "Vespa"].map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => handleBrandChange(brand)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="pt-2">
          <Button variant="outline" size="sm" onClick={handleReset} className="w-full">
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

export function MotorcycleFilters() {
  const [priceRange, setPriceRange] = useState([100000, 500000])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input id="search" placeholder="Search motorcycles..." />
          </div>

          <div className="space-y-2">
            <Label>Brand</Label>
            <div className="space-y-2">
              {["Honda", "Yamaha", "Kawasaki", "Suzuki", "Ducati"].map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox id={`brand-${brand.toLowerCase()}`} />
                  <label
                    htmlFor={`brand-${brand.toLowerCase()}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="sport">Sport</SelectItem>
                <SelectItem value="cruiser">Cruiser</SelectItem>
                <SelectItem value="touring">Touring</SelectItem>
                <SelectItem value="trail">Trail</SelectItem>
                <SelectItem value="scooter">Scooter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Price Range (IDR)</Label>
              <span className="text-sm text-muted-foreground">
                {priceRange[0].toLocaleString("id-ID")} - {priceRange[1].toLocaleString("id-ID")}
              </span>
            </div>
            <Slider defaultValue={priceRange} min={100000} max={1000000} step={50000} onValueChange={setPriceRange} />
          </div>

          <div className="space-y-2">
            <Label>Engine Size</Label>
            <div className="grid grid-cols-2 gap-2">
              {["125cc", "150cc", "250cc", "500cc", "750cc", "1000cc"].map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox id={`size-${size}`} />
                  <label
                    htmlFor={`size-${size}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
      </div>
    </div>
  )
}


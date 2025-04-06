"use client"

import type React from "react"

import { useBookingStore } from "@/store/booking-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AddOn } from "@/types/booking/booking-types"
import { useState } from "react"

// Sample add-ons - in a real app, this would come from an API
const sampleAddOns: AddOn[] = [
  {
    id: "1",
    name: "Helmet",
    description: "High-quality full-face helmet",
    price: 25000,
    selected: false,
  },
  {
    id: "2",
    name: "Rain Gear",
    description: "Waterproof jacket and pants",
    price: 35000,
    selected: false,
  },
  {
    id: "3",
    name: "Phone Mount",
    description: "Secure phone holder for navigation",
    price: 15000,
    selected: false,
  },
  {
    id: "4",
    name: "Insurance Premium",
    description: "Enhanced coverage with zero deductible",
    price: 50000,
    selected: false,
  },
]

export function CustomerInfoForm() {
  const { customerInfo, setCustomerInfo } = useBookingStore()
  const [addOns, setAddOns] = useState<AddOn[]>(sampleAddOns)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo({ [name]: value })
  }

  const toggleAddOn = (id: string) => {
    setAddOns((prev) => prev.map((addon) => (addon.id === id ? { ...addon, selected: !addon.selected } : addon)))
  }

  const applyPromoCode = () => {
    // In a real app, this would validate the promo code with an API
    if (promoCode === "DISCOUNT10") {
      setPromoApplied(true)
    } else {
      setPromoApplied(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="extras">Extras & Add-ons</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={customerInfo.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={customerInfo.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" name="phone" value={customerInfo.phone} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="licenseNumber">Driver&apos;s License Number *</Label>
            <Input
              id="licenseNumber"
              name="licenseNumber"
              value={customerInfo.licenseNumber}
              onChange={handleInputChange}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              You&apos;ll need to present this ID when picking up the motorcycle
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address (Optional)</Label>
            <Input id="address" name="address" value={customerInfo.address || ""} onChange={handleInputChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Textarea
              id="specialRequests"
              name="specialRequests"
              value={customerInfo.specialRequests || ""}
              onChange={handleInputChange}
              rows={3}
              placeholder="Any special requirements or requests..."
            />
          </div>
        </TabsContent>

        <TabsContent value="extras" className="space-y-4 pt-4">
          <div className="space-y-4">
            <h3 className="font-medium">Available Add-ons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addOns.map((addon) => (
                <div key={addon.id} className="flex items-start space-x-3 border rounded-lg p-3">
                  <Checkbox
                    id={`addon-${addon.id}`}
                    checked={addon.selected}
                    onCheckedChange={() => toggleAddOn(addon.id)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={`addon-${addon.id}`} className="font-medium cursor-pointer">
                      {addon.name} - Rp {addon.price.toLocaleString('id-ID')}/day
                    </Label>
                    <p className="text-sm text-muted-foreground">{addon.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <Label htmlFor="promoCode">Promo Code</Label>
            <div className="flex gap-2">
              <Input
                id="promoCode"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1"
              />
              <button
                type="button"
                onClick={applyPromoCode}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Apply
              </button>
            </div>
            {promoApplied && <p className="text-sm text-green-600">Promo code applied! 10% discount.</p>}
            {promoCode && !promoApplied && <p className="text-sm text-red-500">Invalid promo code.</p>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


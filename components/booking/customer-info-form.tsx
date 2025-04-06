"use client"

import type React from "react"

import { useBookingStore } from "@/store/booking-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CustomerInfoForm() {
  const { customerInfo, setCustomerInfo } = useBookingStore()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo({ [name]: value })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nama Depan *</Label>
          <Input
            id="firstName"
            name="firstName"
            value={customerInfo.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Nama Belakang *</Label>
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
          <Label htmlFor="email">Alamat Email *</Label>
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
          <Label htmlFor="phone">Nomor Telepon *</Label>
          <Input id="phone" name="phone" value={customerInfo.phone} onChange={handleInputChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="licenseNumber">Nomor SIM *</Label>
        <Input
          id="licenseNumber"
          name="licenseNumber"
          value={customerInfo.licenseNumber}
          onChange={handleInputChange}
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Anda perlu menunjukkan ID ini saat mengambil motor
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Alamat (Opsional)</Label>
        <Input id="address" name="address" value={customerInfo.address || ""} onChange={handleInputChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialRequests">Permintaan Khusus (Opsional)</Label>
        <Textarea
          id="specialRequests"
          name="specialRequests"
          value={customerInfo.specialRequests || ""}
          onChange={handleInputChange}
          rows={3}
          placeholder="Permintaan atau kebutuhan khusus..."
        />
      </div>
    </div>
  )
}


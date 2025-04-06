// Motorcycle types
export interface Motorcycle {
  id: string
  name: string
  brand: string
  model: string
  category: string
  engineSize: string
  price: number
  discountedPrice?: number
  images: string[]
  features: string[]
  specifications: Record<string, string>
  availability: boolean
  rating: number
  reviewCount: number
}

// Location types
export interface Location {
  id: string
  name: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  openingHours: string
  contactNumber: string
}

// Booking types
export interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

export interface BookingFormData {
  motorcycleId: string
  dateRange: DateRange
  pickupLocation: string
  returnLocation: string
  customerInfo: CustomerInfo
  addOns: AddOn[]
  promoCode?: string
  totalPrice: number
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  licenseNumber: string
  address?: string
  specialRequests?: string
}

export interface AddOn {
  id: string
  name: string
  description: string
  price: number
  selected: boolean
}

// Booking status
export type BookingStatus = "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"

export interface Booking extends BookingFormData {
  id: string
  createdAt: Date
  updatedAt: Date
  status: BookingStatus
  paymentStatus: "pending" | "paid" | "refunded"
  paymentMethod?: string
  transactionId?: string
}

// Admin types
export interface AdminUser {
  id: string
  username: string
  email: string
  role: "admin" | "manager" | "staff"
  permissions: string[]
}

// Quick booking form
export interface QuickBookingFormData {
  motorcycleType: string
  startDate: Date | undefined
  endDate: Date | undefined
  location: string
}


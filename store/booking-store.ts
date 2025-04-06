import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { DateRange, CustomerInfo, AddOn, Motorcycle, Location } from "@/types/booking/booking-types"

interface BookingState {
  // Current booking data
  currentStep: number
  motorcycleId: string
  dateRange: DateRange
  pickupLocation: string
  returnLocation: string
  customerInfo: CustomerInfo
  addOns: AddOn[]
  promoCode: string
  totalPrice: number

  // Available data
  availableMotorcycles: Motorcycle[]
  availableLocations: Location[]

  // Actions
  setStep: (step: number) => void
  setMotorcycle: (motorcycleId: string) => void
  setDateRange: (dateRange: DateRange) => void
  setPickupLocation: (locationId: string) => void
  setReturnLocation: (locationId: string) => void
  setCustomerInfo: (info: Partial<CustomerInfo>) => void
  toggleAddOn: (addOnId: string) => void
  setPromoCode: (code: string) => void
  calculateTotalPrice: () => void
  resetBooking: () => void

  // Quick booking
  quickBook: (motorcycleType: string, startDate: Date, endDate: Date, location: string) => void
}

// Initial customer info
const initialCustomerInfo: CustomerInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  licenseNumber: "",
  address: "",
  specialRequests: "",
}

// Initial date range
const initialDateRange: DateRange = {
  from: undefined,
  to: undefined,
}

// Create the store with persistence
export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: 1,
      motorcycleId: "",
      dateRange: initialDateRange,
      pickupLocation: "",
      returnLocation: "",
      customerInfo: initialCustomerInfo,
      addOns: [],
      promoCode: "",
      totalPrice: 0,

      // Sample data - in a real app, this would come from an API
      availableMotorcycles: [],
      availableLocations: [],

      // Actions
      setStep: (step) => set({ currentStep: step }),

      setMotorcycle: (motorcycleId) => {
        set({ motorcycleId })
        get().calculateTotalPrice()
      },

      setDateRange: (dateRange) => {
        set({ dateRange })
        get().calculateTotalPrice()
      },

      setPickupLocation: (locationId) => set({ pickupLocation: locationId }),

      setReturnLocation: (locationId) => set({ returnLocation: locationId }),

      setCustomerInfo: (info) =>
        set({
          customerInfo: { ...get().customerInfo, ...info },
        }),

      toggleAddOn: (addOnId) => {
        const updatedAddOns = get().addOns.map((addon) =>
          addon.id === addOnId ? { ...addon, selected: !addon.selected } : addon,
        )
        set({ addOns: updatedAddOns })
        get().calculateTotalPrice()
      },

      setPromoCode: (code) => {
        set({ promoCode: code })
        get().calculateTotalPrice()
      },

      calculateTotalPrice: () => {
        const { motorcycleId, dateRange, addOns, promoCode } = get()
        const motorcycle = get().availableMotorcycles.find((m) => m.id === motorcycleId)

        if (!motorcycle || !dateRange.from || !dateRange.to) {
          set({ totalPrice: 0 })
          return
        }

        // Calculate number of days
        const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1

        // Base price
        let price = motorcycle.price * days

        // Add selected add-ons
        const addOnTotal = addOns.filter((addon) => addon.selected).reduce((sum, addon) => sum + addon.price, 0)

        price += addOnTotal

        // Apply promo code discount (simplified)
        if (promoCode === "DISCOUNT10") {
          price = price * 0.9 // 10% discount
        }

        set({ totalPrice: price })
      },

      resetBooking: () =>
        set({
          currentStep: 1,
          motorcycleId: "",
          dateRange: initialDateRange,
          pickupLocation: "",
          returnLocation: "",
          customerInfo: initialCustomerInfo,
          addOns: [],
          promoCode: "",
          totalPrice: 0,
        }),

      // Quick booking
      quickBook: (motorcycleType, startDate, endDate, location) => {
        // Find first available motorcycle of the selected type
        const motorcycle = get().availableMotorcycles.find((m) => m.category === motorcycleType && m.availability)

        if (motorcycle) {
          set({
            motorcycleId: motorcycle.id,
            dateRange: {
              from: startDate,
              to: endDate,
            },
            pickupLocation: location,
            returnLocation: location,
            currentStep: 3, // Skip to personal info step
          })
          get().calculateTotalPrice()
        }
      },
    }),
    {
      name: "booking-storage",
      partialize: (state) => ({
        motorcycleId: state.motorcycleId,
        dateRange: state.dateRange,
        pickupLocation: state.pickupLocation,
        returnLocation: state.returnLocation,
        customerInfo: state.customerInfo,
        promoCode: state.promoCode,
      }),
    },
  ),
)


"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import type { Booking, BookingStatus } from "@/types/booking/booking-types"
import {
  Bike,
  Users,
  DollarSign,
  CalendarIcon,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample bookings data
const sampleBookings: Booking[] = [
  {
    id: "B001",
    motorcycleId: "1",
    dateRange: {
      from: new Date(2023, 6, 15),
      to: new Date(2023, 6, 18),
    },
    pickupLocation: "1",
    returnLocation: "1",
    customerInfo: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+62 812 3456 7890",
      licenseNumber: "DL12345678",
    },
    addOns: [],
    totalPrice: 450000,
    createdAt: new Date(2023, 6, 10),
    updatedAt: new Date(2023, 6, 10),
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "credit_card",
    transactionId: "TRX12345",
  },
  {
    id: "B002",
    motorcycleId: "2",
    dateRange: {
      from: new Date(2023, 6, 16),
      to: new Date(2023, 6, 20),
    },
    pickupLocation: "2",
    returnLocation: "2",
    customerInfo: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "+62 812 3456 7891",
      licenseNumber: "DL87654321",
    },
    addOns: [],
    totalPrice: 680000,
    createdAt: new Date(2023, 6, 12),
    updatedAt: new Date(2023, 6, 12),
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: undefined,
    transactionId: undefined,
  },
  {
    id: "B003",
    motorcycleId: "3",
    dateRange: {
      from: new Date(2023, 6, 18),
      to: new Date(2023, 6, 22),
    },
    pickupLocation: "1",
    returnLocation: "3",
    customerInfo: {
      firstName: "David",
      lastName: "Johnson",
      email: "david.johnson@example.com",
      phone: "+62 812 3456 7892",
      licenseNumber: "DL24681012",
    },
    addOns: [],
    totalPrice: 1400000,
    createdAt: new Date(2023, 6, 15),
    updatedAt: new Date(2023, 6, 15),
    status: "in-progress",
    paymentStatus: "paid",
    paymentMethod: "bank_transfer",
    transactionId: "TRX67890",
  },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [bookings] = useState<Booking[]>(sampleBookings)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all")

  // Check authentication on client side
  useEffect(() => {
    setIsClient(true)
    const isAuthenticated = localStorage.getItem("adminAuth") === "true"

    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [router])

  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${booking.customerInfo.firstName} ${booking.customerInfo.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Get status badge variant
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "outline"
      case "in-progress":
        return "secondary"
      case "completed":
        return "success"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (!isClient) {
    return null // Prevent SSR issues
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold">Rp 45.6M</h3>
                  <p className="mt-1 flex items-center text-sm text-green-600">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    12% from last month
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <h3 className="text-2xl font-bold">1,234</h3>
                  <p className="mt-1 flex items-center text-sm text-green-600">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    8% from last month
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Motorcycles</p>
                  <h3 className="text-2xl font-bold">56</h3>
                  <p className="mt-1 flex items-center text-sm text-green-600">
                    <TrendingUp className="mr-1 h-4 w-4" />4 new this month
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Bike className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                  <h3 className="text-2xl font-bold">892</h3>
                  <p className="mt-1 flex items-center text-sm text-red-600">
                    <TrendingDown className="mr-1 h-4 w-4" />
                    3% from last month
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] flex items-center justify-center">
                <BarChart className="h-16 w-16 text-muted-foreground" />
                <p className="ml-4 text-muted-foreground">Revenue chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] flex items-center justify-center">
                <PieChart className="h-16 w-16 text-muted-foreground" />
                <p className="ml-4 text-muted-foreground">Booking distribution chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Management */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bookings..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as BookingStatus | "all")}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b p-3 font-medium">
                <div className="col-span-2">Booking ID</div>
                <div className="col-span-3">Customer</div>
                <div className="col-span-2">Dates</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Total</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
              <div className="divide-y">
                {filteredBookings.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">No bookings found matching your criteria.</div>
                ) : (
                  filteredBookings.map((booking) => (
                    <div key={booking.id} className="grid grid-cols-12 items-center p-3">
                      <div className="col-span-2 font-medium">{booking.id}</div>
                      <div className="col-span-3">
                        <div>{`${booking.customerInfo.firstName} ${booking.customerInfo.lastName}`}</div>
                        <div className="text-sm text-muted-foreground">{booking.customerInfo.email}</div>
                      </div>
                      <div className="col-span-2 text-sm">
                        <div>{booking.dateRange.from?.toLocaleDateString()}</div>
                        <div>{booking.dateRange.to?.toLocaleDateString()}</div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant={getStatusBadge(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="col-span-2">Rp {booking.totalPrice.toLocaleString('id-ID')}</div>
                      <div className="col-span-1 text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Pickups & Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Pickup Events */}
                  <div>
                    <h3 className="font-medium mb-2">Today&apos;s Pickups</h3>
                    <div className="space-y-2">
                      <div className="rounded-lg border p-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">Honda PCX 160</div>
                          <div className="text-sm text-muted-foreground">John Doe • 10:00 AM</div>
                        </div>
                        <Button size="sm">Check In</Button>
                      </div>
                      <div className="rounded-lg border p-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">Yamaha NMAX</div>
                          <div className="text-sm text-muted-foreground">Jane Smith • 2:00 PM</div>
                        </div>
                        <Button size="sm">Check In</Button>
                      </div>
                    </div>
                  </div>

                  {/* Return Events */}
                  <div>
                    <h3 className="font-medium mb-2">Today&apos;s Returns</h3>
                    <div className="space-y-2">
                      <div className="rounded-lg border p-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">Honda CBR 250RR</div>
                          <div className="text-sm text-muted-foreground">David Johnson • 4:00 PM</div>
                        </div>
                        <Button size="sm">Check Out</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                <div className="mt-4">
                  <h4 className="font-medium">Events for {date?.toLocaleDateString()}</h4>
                  <p className="text-sm text-muted-foreground">3 pickups, 2 returns scheduled</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}


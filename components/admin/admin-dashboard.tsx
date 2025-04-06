"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowUpRight, ArrowDownRight, Users, Bike, DollarSign, CalendarIcon } from "lucide-react"

// Sample data - in a real app, this would come from an API
const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 4500 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4800 },
  { month: "May", revenue: 5500 },
  { month: "Jun", revenue: 6000 },
  { month: "Jul", revenue: 6500 },
]

const bookingsData = [
  { month: "Jan", bookings: 120 },
  { month: "Feb", bookings: 140 },
  { month: "Mar", bookings: 160 },
  { month: "Apr", bookings: 150 },
  { month: "May", bookings: 180 },
  { month: "Jun", bookings: 200 },
  { month: "Jul", bookings: 220 },
]

const recentBookings = [
  {
    id: "B001",
    customer: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    motorcycle: "Honda CBR 250RR",
    startDate: "2023-07-15",
    endDate: "2023-07-18",
    status: "confirmed",
    total: 1050000,
  },
  {
    id: "B002",
    customer: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    motorcycle: "Yamaha XMAX 250",
    startDate: "2023-07-16",
    endDate: "2023-07-20",
    status: "pending",
    total: 1200000,
  },
  {
    id: "B003",
    customer: {
      name: "David Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    motorcycle: "Kawasaki Ninja ZX-25R",
    startDate: "2023-07-18",
    endDate: "2023-07-22",
    status: "confirmed",
    total: 1600000,
  },
  {
    id: "B004",
    customer: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    motorcycle: "Ducati Scrambler",
    startDate: "2023-07-20",
    endDate: "2023-07-25",
    status: "cancelled",
    total: 2500000,
  },
]

export function AdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold">Rp 45.6M</h3>
                  <p className="mt-1 flex items-center text-sm text-green-600">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    12% from last month
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <h3 className="text-2xl font-bold">1,234</h3>
                  <p className="mt-1 flex items-center text-sm text-green-600">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    8% from last month
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Motorcycles</p>
                  <h3 className="text-2xl font-bold">56</h3>
                  <p className="mt-1 flex items-center text-sm text-green-600">
                    <ArrowUpRight className="mr-1 h-4 w-4" />4 new this month
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Bike className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                  <h3 className="text-2xl font-bold">892</h3>
                  <p className="mt-1 flex items-center text-sm text-red-600">
                    <ArrowDownRight className="mr-1 h-4 w-4" />
                    3% from last month
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Bookings Overview</CardTitle>
              <CardDescription>Monthly bookings for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  bookings: {
                    label: "Bookings",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bookingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="bookings" fill="var(--color-bookings)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest booking requests and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={booking.customer.avatar} alt={booking.customer.name} />
                        <AvatarFallback>{booking.customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{booking.customer.name}</p>
                        <p className="text-sm text-muted-foreground">{booking.motorcycle}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.startDate} to {booking.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "default"
                            : booking.status === "pending"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {booking.status}
                      </Badge>
                      <p className="font-medium">Rp {booking.total.toLocaleString()}</p>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Booking Calendar</CardTitle>
              <CardDescription>View and manage upcoming bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              <div className="mt-4">
                <h4 className="font-medium">Bookings for {date?.toLocaleDateString()}</h4>
                <p className="text-sm text-muted-foreground">No bookings for this date</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Motorcycle Management</CardTitle>
            <CardDescription>View and manage your motorcycle inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="rented">Rented</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 border-b p-3 font-medium">
                    <div>ID</div>
                    <div className="col-span-2">Motorcycle</div>
                    <div>Status</div>
                    <div>Price/Day</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-6 items-center p-3">
                      <div>M001</div>
                      <div className="col-span-2">Honda CBR 250RR</div>
                      <div>
                        <Badge>Available</Badge>
                      </div>
                      <div>Rp 350,000</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 items-center p-3">
                      <div>M002</div>
                      <div className="col-span-2">Yamaha XMAX 250</div>
                      <div>
                        <Badge variant="outline">Rented</Badge>
                      </div>
                      <div>Rp 300,000</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 items-center p-3">
                      <div>M003</div>
                      <div className="col-span-2">Kawasaki Ninja ZX-25R</div>
                      <div>
                        <Badge>Available</Badge>
                      </div>
                      <div>Rp 400,000</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 items-center p-3">
                      <div>M004</div>
                      <div className="col-span-2">Ducati Scrambler</div>
                      <div>
                        <Badge variant="destructive">Maintenance</Badge>
                      </div>
                      <div>Rp 500,000</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="available" className="mt-4">
                <div className="rounded-md border">{/* Similar content for available motorcycles */}</div>
              </TabsContent>
              <TabsContent value="rented" className="mt-4">
                <div className="rounded-md border">{/* Similar content for rented motorcycles */}</div>
              </TabsContent>
              <TabsContent value="maintenance" className="mt-4">
                <div className="rounded-md border">{/* Similar content for motorcycles in maintenance */}</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}


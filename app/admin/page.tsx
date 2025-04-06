import type { Metadata } from "next"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminHeader } from "@/components/admin/admin-header"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage your motorcycle rental business with our comprehensive admin dashboard.",
}

export default function AdminPage() {
  return (
    <div className="container py-8">
      <AdminHeader />
      <div className="mt-8">
        <AdminDashboard />
      </div>
    </div>
  )
}


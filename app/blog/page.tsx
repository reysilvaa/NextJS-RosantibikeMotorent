import type { Metadata } from "next"
import { BlogGrid } from "@/components/blog/blog-grid"
import { PageHeader } from "@/components/ui/page-header"

export const metadata: Metadata = {
  title: "Motorcycle Blog",
  description: "Read our latest articles about motorcycles, riding tips, and travel destinations in Indonesia.",
}

export default function BlogPage() {
  return (
    <div className="container py-16 md:py-24">
      <PageHeader
        title="Motorcycle Blog"
        description="Read our latest articles about motorcycles, riding tips, and travel destinations in Indonesia."
      />
      <div className="mt-12">
        <BlogGrid />
      </div>
    </div>
  )
}


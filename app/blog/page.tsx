import type { Metadata } from "next"
import { BlogGrid } from "@/components/blog/blog-grid"
import { PageHeader } from "@/components/ui/page-header"

export const metadata: Metadata = {
  title: "Motorcycle Blog",
  description: "Read our latest articles about motorcycles, riding tips, and travel destinations in Indonesia.",
}

export default function BlogPage() {
  return (
    <div className="container py-8 md:py-12">
      <PageHeader
        title="Motorcycle Blog"
        description="Read our latest articles about motorcycles, riding tips, and travel destinations in Indonesia."
      />
      <div className="mt-8">
        <BlogGrid />
      </div>
    </div>
  )
}


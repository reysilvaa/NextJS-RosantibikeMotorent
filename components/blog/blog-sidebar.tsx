"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

// Sample data - in a real app, this would come from an API
const recentPosts = [
  {
    id: "1",
    title: "Top 10 Motorcycle Routes in Bali",
    slug: "top-10-motorcycle-routes-in-bali",
    coverImage: "/placeholder.svg?height=80&width=120",
    publishedAt: "2023-06-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Motorcycle Maintenance Tips for Tropical Climate",
    slug: "motorcycle-maintenance-tips-for-tropical-climate",
    coverImage: "/placeholder.svg?height=80&width=120",
    publishedAt: "2023-06-10T10:00:00Z",
  },
  {
    id: "3",
    title: "Choosing the Right Motorcycle for Your Indonesian Adventure",
    slug: "choosing-the-right-motorcycle-for-your-indonesian-adventure",
    coverImage: "/placeholder.svg?height=80&width=120",
    publishedAt: "2023-06-05T10:00:00Z",
  },
]

const categories = [
  { name: "Travel", count: 12 },
  { name: "Maintenance", count: 8 },
  { name: "Guide", count: 10 },
  { name: "Safety", count: 6 },
  { name: "History", count: 4 },
  { name: "Gear", count: 7 },
]

const tags = [
  "Bali",
  "Jakarta",
  "Adventure",
  "Touring",
  "Sport",
  "Scooter",
  "Maintenance",
  "Safety",
  "Gear",
  "Weather",
  "Routes",
  "Tips",
]

export function BlogSidebar() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Search articles..." />
              <Button type="submit">Search</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex gap-3">
                  <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium leading-tight">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary hover:underline">
                        {post.title}
                      </Link>
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
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
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.name} className="flex justify-between">
                  <Link
                    href={`/blog/category/${category.name.toLowerCase()}`}
                    className="hover:text-primary hover:underline"
                  >
                    {category.name}
                  </Link>
                  <span className="text-sm text-muted-foreground">({category.count})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  <Link href={`/blog/tag/${tag.toLowerCase()}`} className="hover:text-primary">
                    {tag}
                  </Link>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Newsletter</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe to our newsletter to get the latest updates on motorcycle rentals and travel tips in Indonesia.
            </p>
            <div className="space-y-2">
              <Input placeholder="Your email address" type="email" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}


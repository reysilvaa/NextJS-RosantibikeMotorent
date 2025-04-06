"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  publishedAt: string
  readingTime: string
  category: string
  author: {
    name: string
    avatar: string
  }
}

// Sample data - in a real app, this would come from an API
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Motorcycle Routes in Bali",
    slug: "top-10-motorcycle-routes-in-bali",
    excerpt: "Discover the most scenic and thrilling motorcycle routes in Bali, from coastal roads to mountain passes.",
    coverImage: "/placeholder.svg?height=400&width=600",
    publishedAt: "2023-06-15T10:00:00Z",
    readingTime: "5 min read",
    category: "Travel",
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "2",
    title: "Motorcycle Maintenance Tips for Tropical Climate",
    slug: "motorcycle-maintenance-tips-for-tropical-climate",
    excerpt:
      "Learn how to maintain your motorcycle in Indonesia's tropical climate to ensure optimal performance and longevity.",
    coverImage: "/placeholder.svg?height=400&width=600",
    publishedAt: "2023-06-10T10:00:00Z",
    readingTime: "7 min read",
    category: "Maintenance",
    author: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "3",
    title: "Choosing the Right Motorcycle for Your Indonesian Adventure",
    slug: "choosing-the-right-motorcycle-for-your-indonesian-adventure",
    excerpt:
      "A comprehensive guide to selecting the perfect motorcycle for your adventure in Indonesia based on terrain and travel style.",
    coverImage: "/placeholder.svg?height=400&width=600",
    publishedAt: "2023-06-05T10:00:00Z",
    readingTime: "6 min read",
    category: "Guide",
    author: {
      name: "David Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "4",
    title: "Safety Tips for Riding Motorcycles in Indonesia",
    slug: "safety-tips-for-riding-motorcycles-in-indonesia",
    excerpt:
      "Essential safety tips and best practices for riding motorcycles in Indonesia's unique traffic conditions.",
    coverImage: "/placeholder.svg?height=400&width=600",
    publishedAt: "2023-05-28T10:00:00Z",
    readingTime: "4 min read",
    category: "Safety",
    author: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "5",
    title: "The History of Motorcycles in Indonesia",
    slug: "the-history-of-motorcycles-in-indonesia",
    excerpt:
      "Explore the rich history of motorcycles in Indonesia, from their introduction to their current cultural significance.",
    coverImage: "/placeholder.svg?height=400&width=600",
    publishedAt: "2023-05-20T10:00:00Z",
    readingTime: "8 min read",
    category: "History",
    author: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "6",
    title: "Best Motorcycle Gear for Indonesian Weather",
    slug: "best-motorcycle-gear-for-indonesian-weather",
    excerpt:
      "Find out what motorcycle gear works best for Indonesia's tropical climate while still providing adequate protection.",
    coverImage: "/placeholder.svg?height=400&width=600",
    publishedAt: "2023-05-15T10:00:00Z",
    readingTime: "5 min read",
    category: "Gear",
    author: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
]

export function BlogGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="h-full overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              <Badge className="absolute top-2 right-2">{post.category}</Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <time dateTime={post.publishedAt}>
                  {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
                </time>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className="mt-2 text-xl font-semibold">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary hover:underline">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 pt-0">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs">{post.author.name}</span>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/blog/${post.slug}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}


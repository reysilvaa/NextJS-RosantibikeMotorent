"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"

interface MotorcycleGalleryProps {
  images: string[]
  name: string
}

export function MotorcycleGallery({ images, name }: MotorcycleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fullscreenIndex, setFullscreenIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleFullscreenPrev = () => {
    setFullscreenIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleFullscreenNext = () => {
    setFullscreenIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index)
    setIsFullscreen(true)
  }

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-lg">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-[4/3] w-full"
          >
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`${name} - Image ${currentIndex + 1}`}
              fill
              className="object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 hover:bg-background/90"
              onClick={() => openFullscreen(currentIndex)}
            >
              <Maximize2 className="h-4 w-4" />
              <span className="sr-only">View fullscreen</span>
            </Button>
          </motion.div>
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous image</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
          onClick={handleNext}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next image</span>
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative aspect-square overflow-hidden rounded-md ${
              index === currentIndex ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${name} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-screen-lg p-0">
          <div className="relative aspect-video w-full">
            <Image
              src={images[fullscreenIndex] || "/placeholder.svg"}
              alt={`${name} - Fullscreen ${fullscreenIndex + 1}`}
              fill
              className="object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
              onClick={handleFullscreenPrev}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
              onClick={handleFullscreenNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


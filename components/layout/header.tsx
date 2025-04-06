"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import { LanguageToggle } from "@/components/ui/theme/language-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export function Header() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll event to detect when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    // Set initial scroll state
    handleScroll()
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const routes = [
    {
      href: "/",
      label: t("nav.home"),
      active: pathname === "/",
    },
    {
      href: "/motorcycles",
      label: t("nav.motorcycles"),
      active: pathname === "/motorcycles" || pathname.startsWith("/motorcycles/"),
    },
    {
      href: "/about",
      label: t("nav.about"),
      active: pathname === "/about",
    },
    {
      href: "/contact",
      label: t("nav.contact"),
      active: pathname === "/contact",
    },
    {
      href: "/blog",
      label: t("nav.blog"),
      active: pathname === "/blog" || pathname.startsWith("/blog/"),
    },
  ]

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
      scrolled 
        ? "bg-background/80 backdrop-blur-md shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="container flex h-20 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className={cn(
              "font-bold text-xl transition-colors duration-300",
              scrolled ? "text-foreground" : "text-white"
            )}>RBike</span>
          </Link>
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center">
          <div className="mx-auto">
            <nav className="flex items-center space-x-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative py-2 group",
                    route.active 
                      ? scrolled ? "text-foreground" : "text-white" 
                      : scrolled ? "text-muted-foreground" : "text-white/80"
                  )}
                >
                  {route.label}
                  <span className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full",
                    route.active ? "w-full" : ""
                  )} />
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center justify-end space-x-4">
            <LanguageToggle />
            <ThemeToggle />
            <Button asChild variant={scrolled ? "default" : "outline"} className={!scrolled ? "border-white text-white hover:bg-white/20" : ""}>
              <Link href="/booking">{t("hero.cta")}</Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "ml-2",
                  !scrolled && "text-white hover:bg-white/10"
                )}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      route.active ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <Link href="/booking">{t("hero.cta")}</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
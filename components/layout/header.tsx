"use client"

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
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">RBike</span>
          </Link>
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <nav className="flex items-center space-x-6">
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
          </nav>
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <ThemeToggle />
            <Button asChild>
              <Link href="/booking">{t("hero.cta")}</Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
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


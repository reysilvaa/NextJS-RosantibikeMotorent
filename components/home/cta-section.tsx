"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"

export function CtaSection() {
  const { t } = useTranslation()

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("cta.title")}
          </motion.h2>
          <motion.p
            className="mt-4 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("cta.subtitle")}
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" variant="secondary" asChild>
              <Link href="/motorcycles">{t("cta.button")}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


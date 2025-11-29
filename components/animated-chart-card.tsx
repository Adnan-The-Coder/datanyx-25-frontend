"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"

interface AnimatedChartCardProps {
  title: string
  description?: string
  children: ReactNode
  delay?: number
}

export function AnimatedChartCard({ title, description, children, delay = 0 }: AnimatedChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-xl transition-all">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {title}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  )
}

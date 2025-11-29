"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface HospitalConfig {
  alertThreshold: number
  updateInterval: number
  backupSchedule: string
  twoFactorAuth: boolean
  ipWhitelist: boolean
  sessionTimeout: boolean
  auditLogging: boolean
  criticalAlerts: boolean
  emailNotifications: boolean
  smsAlerts: boolean
  dailyReports: boolean
}

interface HospitalContextType {
  config: HospitalConfig
  updateConfig: (key: keyof HospitalConfig, value: any) => void
}

const defaultConfig: HospitalConfig = {
  alertThreshold: 80,
  updateInterval: 5,
  backupSchedule: "Daily at 2:00 AM",
  twoFactorAuth: true,
  ipWhitelist: false,
  sessionTimeout: true,
  auditLogging: true,
  criticalAlerts: true,
  emailNotifications: true,
  smsAlerts: false,
  dailyReports: true,
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined)

export function HospitalProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<HospitalConfig>(defaultConfig)

  const updateConfig = (key: keyof HospitalConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <HospitalContext.Provider value={{ config, updateConfig }}>
      {children}
    </HospitalContext.Provider>
  )
}

export function useHospital() {
  const context = useContext(HospitalContext)
  if (context === undefined) {
    throw new Error("useHospital must be used within a HospitalProvider")
  }
  return context
}

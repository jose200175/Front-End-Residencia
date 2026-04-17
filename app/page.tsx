"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { LoginPage } from "@/components/login-page"
import { SchoolSelectionPage } from "@/components/school-selection-page"

type AppState = "login" | "school-selection" | "app"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("login")
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null)

  const handleLogin = () => {
    setAppState("school-selection")
  }

  const handleSelectSchool = (schoolId: string) => {
    setSelectedSchool(schoolId)
    setAppState("app")
  }

  if (appState === "login") {
    return <LoginPage onLogin={handleLogin} />
  }

  if (appState === "school-selection") {
    return <SchoolSelectionPage onSelectSchool={handleSelectSchool} />
  }

  return <AppLayout />
}

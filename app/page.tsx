"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { LoginPage } from "@/components/login-page"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />
  }

  return <AppLayout />
}

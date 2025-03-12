"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useStore } from "@/lib/store"
import { Toaster } from "@/components/ui/toaster"
import { initializeDB } from "@/lib/indexeddb"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [isLoading, setIsLoading] = useState(true)
  const setOnlineStatus = useStore((state) => state.setOnlineStatus)

  useEffect(() => {
    // Initialize IndexedDB
    initializeDB().then(() => {
      setIsLoading(false)
    })

    // Set up online/offline detection
    const handleOnline = () => setOnlineStatus(true)
    const handleOffline = () => setOnlineStatus(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Set initial status
    setOnlineStatus(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [setOnlineStatus])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}


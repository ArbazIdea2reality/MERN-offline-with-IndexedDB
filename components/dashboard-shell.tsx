import type React from "react"
import { AppShell } from "@/components/app-shell"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <AppShell>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 max-w-7xl mx-auto">{children}</div>
    </AppShell>
  )
}


import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ConflictResolutionTable } from "@/components/conflict-resolution-table"
import { SyncStatus } from "@/components/sync-status"

export const metadata: Metadata = {
  title: "Sync | Financial Management",
  description: "Resolve conflicts and sync your data",
}

export default function SyncPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Data Synchronization" text="Resolve conflicts and sync your data" />
      <SyncStatus />
      <ConflictResolutionTable />
    </DashboardShell>
  )
}


import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { TransactionsTable } from "@/components/transactions-table"
import { TransactionsHeader } from "@/components/transactions-header"

export const metadata: Metadata = {
  title: "Transactions | Financial Management",
  description: "Manage your financial transactions",
}

export default function TransactionsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Transactions" text="Manage your financial transactions" />
      <TransactionsHeader />
      <TransactionsTable />
    </DashboardShell>
  )
}


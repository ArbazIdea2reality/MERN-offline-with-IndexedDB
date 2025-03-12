import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { FinancialMetrics } from "@/components/financial-metrics"
import { RecentTransactions } from "@/components/recent-transactions"
import { ExpenseBreakdown } from "@/components/expense-breakdown"
import { CashFlow } from "@/components/cash-flow"

export const metadata: Metadata = {
  title: "Dashboard | Financial Management",
  description: "View your financial metrics and recent transactions",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="View your financial metrics and recent transactions" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <FinancialMetrics />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <RecentTransactions />
        </div>
        <div className="col-span-3 space-y-4">
          <ExpenseBreakdown />
          <CashFlow />
        </div>
      </div>
    </DashboardShell>
  )
}


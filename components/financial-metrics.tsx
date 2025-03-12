"use client"

import { useEffect, useState } from "react"
import { ArrowUpIcon, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { formatCurrency } from "@/lib/utils"

export function FinancialMetrics() {
  const { fetchFinancialMetrics } = useStore()
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    currentBalance: 0,
    pendingTransactions: 0,
  })

  useEffect(() => {
    const getMetrics = async () => {
      const data = await fetchFinancialMetrics()
      setMetrics(data)
    }

    getMetrics()
  }, [fetchFinancialMetrics])

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(metrics.totalRevenue)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 flex items-center">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              12.5%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(metrics.totalExpenses)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-500 flex items-center">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              8.2%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(metrics.currentBalance)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 flex items-center">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              4.3%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.pendingTransactions}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.pendingTransactions > 0 ? (
              <span className="text-amber-500">Needs synchronization</span>
            ) : (
              <span className="text-green-500">All synced</span>
            )}
          </p>
        </CardContent>
      </Card>
    </>
  )
}


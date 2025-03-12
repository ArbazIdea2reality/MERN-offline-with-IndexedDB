"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"

type CashFlowData = {
  month: string
  income: number
  expenses: number
}

export function CashFlow() {
  const { fetchCashFlowData } = useStore()
  const [cashFlowData, setCashFlowData] = useState<CashFlowData[]>([])

  useEffect(() => {
    const getCashFlowData = async () => {
      const data = await fetchCashFlowData()
      setCashFlowData(data)
    }

    getCashFlowData()
  }, [fetchCashFlowData])

  // This would ideally be a chart, but for simplicity we'll use a table
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Flow</CardTitle>
        <CardDescription>Income vs expenses over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-3 text-sm font-medium">
            <div>Month</div>
            <div>Income</div>
            <div>Expenses</div>
          </div>
          {cashFlowData.map((item) => (
            <div key={item.month} className="grid grid-cols-3 text-sm">
              <div>{item.month}</div>
              <div className="text-green-500">${item.income.toLocaleString()}</div>
              <div className="text-red-500">${item.expenses.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


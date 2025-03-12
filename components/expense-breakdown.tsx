"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { formatCurrency } from "@/lib/utils"

type ExpenseCategory = {
  category: string
  amount: number
  percentage: number
}

export function ExpenseBreakdown() {
  const { fetchExpenseBreakdown } = useStore()
  const [categories, setCategories] = useState<ExpenseCategory[]>([])

  useEffect(() => {
    const getExpenseBreakdown = async () => {
      const data = await fetchExpenseBreakdown()
      setCategories(data)
    }

    getExpenseBreakdown()
  }, [fetchExpenseBreakdown])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
        <CardDescription>Your spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{category.category}</span>
                <span className="text-sm text-muted-foreground">{formatCurrency(category.amount)}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${category.percentage}%` }} />
              </div>
              <p className="text-xs text-muted-foreground text-right">{category.percentage}% of total</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


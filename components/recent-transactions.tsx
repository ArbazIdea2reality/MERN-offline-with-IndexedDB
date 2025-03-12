"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { formatCurrency, formatDate } from "@/lib/utils"
import type { Transaction } from "@/lib/types"

export function RecentTransactions() {
  const { fetchRecentTransactions } = useStore()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchRecentTransactions()
      setTransactions(data)
    }

    getTransactions()
  }, [fetchRecentTransactions])

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your most recent financial transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
              <p className="text-sm text-muted-foreground">No transactions found</p>
            </div>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{transaction.description}</span>
                    <Badge variant={transaction.status === "Online" ? "default" : "outline"}>
                      {transaction.status}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(transaction.date)}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={transaction.type === "income" ? "text-green-500" : "text-red-500"}>
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link href="/transactions" className="flex items-center justify-center gap-1">
            View all transactions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}


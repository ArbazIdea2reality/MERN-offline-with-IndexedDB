"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SyncButton } from "@/components/sync-button"
import { Badge } from "@/components/ui/badge"

export function SyncStatus() {
  const { isOnline, pendingTransactions, lastSyncTime } = useStore()

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Sync Status</CardTitle>
          <CardDescription>Manage your data synchronization</CardDescription>
        </div>
        <SyncButton />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Connection Status</span>
            <Badge variant={isOnline ? "default" : "destructive"} className="w-fit">
              {isOnline ? "Online" : "Offline"}
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Pending Transactions</span>
            <span className={pendingTransactions > 0 ? "text-amber-500" : "text-green-500"}>
              {pendingTransactions} {pendingTransactions === 1 ? "transaction" : "transactions"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Last Synced</span>
            <span className="text-muted-foreground">
              {lastSyncTime ? new Date(lastSyncTime).toLocaleString() : "Never"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


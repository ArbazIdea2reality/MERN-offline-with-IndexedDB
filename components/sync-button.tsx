"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export function SyncButton() {
  const { syncData, isOnline, pendingTransactions } = useStore()
  const { toast } = useToast()
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    if (!isOnline) {
      toast({
        title: "You're offline",
        description: "Please connect to the internet to sync your data.",
        variant: "destructive",
      })
      return
    }

    if (pendingTransactions === 0) {
      toast({
        title: "No pending changes",
        description: "All your data is already synced.",
      })
      return
    }

    setIsSyncing(true)
    try {
      const result = await syncData()

      if (result.conflicts.length > 0) {
        toast({
          title: "Sync completed with conflicts",
          description: `${result.conflicts.length} conflicts need to be resolved.`,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Sync completed",
          description: `Successfully synced ${result.synced} transactions.`,
        })
      }
    } catch (error) {
      toast({
        title: "Sync failed",
        description: "An error occurred while syncing your data.",
        variant: "destructive",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleSync}
      disabled={isSyncing || !isOnline || pendingTransactions === 0}
      className={pendingTransactions > 0 ? "animate-pulse" : ""}
    >
      <RefreshCw className={cn("h-5 w-5", isSyncing && "animate-spin")} />
      <span className="sr-only">Sync data</span>
    </Button>
  )
}


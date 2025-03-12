"use client"

import { Bell, Settings, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SyncButton } from "@/components/sync-button"
import { useStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export function AppHeader() {
  const isOnline = useStore((state) => state.isOnline)
  const pendingTransactions = useStore((state) => state.pendingTransactions)

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="h-9 w-9 rounded-md border border-input bg-background" />
        <h1 className="hidden text-xl font-bold md:block">Financial Manager</h1>
      </div>
      <div className="hidden max-w-md flex-1 px-6 md:block">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="h-9 w-full pl-8 pr-4" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant={isOnline ? "default" : "destructive"} className="rounded-md px-2 py-1">
          {isOnline ? "Online" : "Offline"}
        </Badge>
        {pendingTransactions > 0 && (
          <Badge variant="outline" className="rounded-md bg-amber-50 text-amber-700 border-amber-200 px-2 py-1">
            {pendingTransactions} pending
          </Badge>
        )}
        <SyncButton />
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}


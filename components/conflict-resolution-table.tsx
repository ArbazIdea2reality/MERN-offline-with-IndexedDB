"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStore } from "@/lib/store"
import { formatCurrency, formatDate } from "@/lib/utils"
import type { ConflictItem } from "@/lib/types"

export function ConflictResolutionTable() {
  const { fetchConflicts, resolveConflict } = useStore()
  const [conflicts, setConflicts] = useState<ConflictItem[]>([])

  useEffect(() => {
    const getConflicts = async () => {
      const data = await fetchConflicts()
      setConflicts(data)
    }

    getConflicts()
  }, [fetchConflicts])

  const handleResolve = async (id: string, useLocal: boolean) => {
    await resolveConflict(id, useLocal)
    setConflicts(conflicts.filter((conflict) => conflict.id !== id))
  }

  if (conflicts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Conflict Resolution</CardTitle>
          <CardDescription>No conflicts to resolve</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">All data is in sync</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conflict Resolution</CardTitle>
        <CardDescription>Resolve conflicts between local and server data</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Local Version</TableHead>
              <TableHead>Server Version</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conflicts.map((conflict) => (
              <TableRow key={conflict.id}>
                <TableCell className="font-medium">{conflict.description}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">{formatDate(conflict.localVersion.date)}</div>
                    <div className="text-sm">{conflict.localVersion.category}</div>
                    <div className={conflict.localVersion.type === "income" ? "text-green-500" : "text-red-500"}>
                      {conflict.localVersion.type === "income" ? "+" : "-"}
                      {formatCurrency(conflict.localVersion.amount)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">{formatDate(conflict.serverVersion.date)}</div>
                    <div className="text-sm">{conflict.serverVersion.category}</div>
                    <div className={conflict.serverVersion.type === "income" ? "text-green-500" : "text-red-500"}>
                      {conflict.serverVersion.type === "income" ? "+" : "-"}
                      {formatCurrency(conflict.serverVersion.amount)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                      onClick={() => handleResolve(conflict.id, true)}
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Use Local
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
                      onClick={() => handleResolve(conflict.id, false)}
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Use Server
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


export type Transaction = {
  id: string
  description: string
  amount: number
  date: string | Date
  type: "income" | "expense"
  category: string
  status: "Online" | "Offline"
}

export type ConflictItem = {
  id: string
  description: string
  localVersion: Transaction
  serverVersion: Transaction
}

export type SyncResult = {
  synced: number
  conflicts: ConflictItem[]
}


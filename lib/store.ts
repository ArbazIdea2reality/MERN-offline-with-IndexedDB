"use client"

import { create } from "zustand"
import {
  getTransactions,
  saveTransaction,
  deleteTransactionFromDB,
  getConflicts,
  resolveConflictInDB,
} from "@/lib/indexeddb"
import type { Transaction, ConflictItem, SyncResult } from "@/lib/types"

interface StoreState {
  isOnline: boolean
  pendingTransactions: number
  lastSyncTime: number | null

  // Status setters
  setOnlineStatus: (status: boolean) => void

  // Data fetching
  fetchTransactions: () => Promise<Transaction[]>
  fetchRecentTransactions: () => Promise<Transaction[]>
  fetchFinancialMetrics: () => Promise<{
    totalRevenue: number
    totalExpenses: number
    currentBalance: number
    pendingTransactions: number
  }>
  fetchExpenseBreakdown: () => Promise<
    {
      category: string
      amount: number
      percentage: number
    }[]
  >
  fetchCashFlowData: () => Promise<
    {
      month: string
      income: number
      expenses: number
    }[]
  >
  fetchConflicts: () => Promise<ConflictItem[]>

  // CRUD operations
  addTransaction: (transaction: Partial<Transaction>) => Promise<Transaction>
  updateTransaction: (transaction: Transaction) => Promise<Transaction>
  deleteTransaction: (id: string) => Promise<void>

  // Sync operations
  syncData: () => Promise<SyncResult>
  resolveConflict: (id: string, useLocal: boolean) => Promise<void>
}

export const useStore = create<StoreState>((set, get) => ({
  isOnline: true,
  pendingTransactions: 0,
  lastSyncTime: null,

  setOnlineStatus: (status: boolean) => {
    set({ isOnline: status })
  },

  fetchTransactions: async () => {
    const transactions = await getTransactions()
    const pendingCount = transactions.filter((t) => t.status === "Offline").length
    set({ pendingTransactions: pendingCount })
    return transactions
  },

  fetchRecentTransactions: async () => {
    const transactions = await getTransactions()
    return transactions.slice(0, 5)
  },

  fetchFinancialMetrics: async () => {
    const transactions = await getTransactions()

    const totalRevenue = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

    const pendingCount = transactions.filter((t) => t.status === "Offline").length

    set({ pendingTransactions: pendingCount })

    return {
      totalRevenue,
      totalExpenses,
      currentBalance: totalRevenue - totalExpenses,
      pendingTransactions: pendingCount,
    }
  },

  fetchExpenseBreakdown: async () => {
    const transactions = await getTransactions()
    const expensesByCategory: Record<string, number> = {}

    // Calculate total expenses by category
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount
      })

    const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0)

    // Convert to array with percentages
    return Object.entries(expensesByCategory)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: Math.round((amount / totalExpenses) * 100),
      }))
      .sort((a, b) => b.amount - a.amount)
  },

  fetchCashFlowData: async () => {
    // Mock data for cash flow
    return [
      { month: "Jan", income: 5200, expenses: 3800 },
      { month: "Feb", income: 5300, expenses: 3900 },
      { month: "Mar", income: 5400, expenses: 3700 },
      { month: "Apr", income: 5500, expenses: 4100 },
      { month: "May", income: 5600, expenses: 4000 },
      { month: "Jun", income: 5700, expenses: 4200 },
    ]
  },

  fetchConflicts: async () => {
    return await getConflicts()
  },

  addTransaction: async (transaction) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      description: transaction.description || "",
      amount: transaction.amount || 0,
      date: transaction.date || new Date(),
      type: transaction.type || "expense",
      category: transaction.category || "other",
      status: "Offline", // New transactions start as offline
    }

    await saveTransaction(newTransaction)

    // Update pending count
    const transactions = await getTransactions()
    const pendingCount = transactions.filter((t) => t.status === "Offline").length
    set({ pendingTransactions: pendingCount })

    return newTransaction
  },

  updateTransaction: async (transaction: Transaction) => {
    // Mark as offline if it was previously online
    const updatedTransaction: Transaction = {
      ...transaction,
      status: "Offline" as const,
    }

    await saveTransaction(updatedTransaction)

    // Update pending count
    const transactions = await getTransactions()
    const pendingCount = transactions.filter((t) => t.status === "Offline").length
    set({ pendingTransactions: pendingCount })

    return updatedTransaction
  },

  deleteTransaction: async (id) => {
    await deleteTransactionFromDB(id)

    // Update pending count
    const transactions = await getTransactions()
    const pendingCount = transactions.filter((t) => t.status === "Offline").length
    set({ pendingTransactions: pendingCount })
  },

  syncData: async () => {
    // In a real app, this would communicate with a server
    // For this demo, we'll simulate a sync by marking all transactions as online
    const transactions = await getTransactions()
    const offlineTransactions = transactions.filter((t) => t.status === "Offline")

    // Simulate some conflicts (in a real app, these would come from the server)
    const conflicts: ConflictItem[] = offlineTransactions
      .slice(0, Math.min(2, offlineTransactions.length))
      .map((transaction) => ({
        id: transaction.id,
        description: transaction.description,
        localVersion: transaction,
        serverVersion: {
          ...transaction,
          amount: transaction.amount * 0.9, // Simulate a difference
          date: new Date(new Date(transaction.date).getTime() - 86400000), // One day earlier
        },
      }))

    // Mark non-conflicting transactions as online
    const nonConflictingIds = offlineTransactions.filter((t) => !conflicts.some((c) => c.id === t.id)).map((t) => t.id)

    for (const id of nonConflictingIds) {
      const transaction = transactions.find((t) => t.id === id)
      if (transaction) {
        await saveTransaction({
          ...transaction,
          status: "Online",
        })
      }
    }

    // Save conflicts to IndexedDB
    for (const conflict of conflicts) {
      // In a real app, you would store these conflicts in a separate table
      // For this demo, we'll just keep them as offline transactions
    }

    // Update store state
    const updatedTransactions = await getTransactions()
    const pendingCount = updatedTransactions.filter((t) => t.status === "Offline").length
    set({
      pendingTransactions: pendingCount,
      lastSyncTime: Date.now(),
    })

    return {
      synced: nonConflictingIds.length,
      conflicts,
    }
  },

  resolveConflict: async (id: string, useLocal: boolean) => {
    const conflicts = await getConflicts()
    const conflict = conflicts.find((c) => c.id === id)

    if (!conflict) return

    if (useLocal) {
      // Keep local version but mark as online
      await saveTransaction({
        ...conflict.localVersion,
        status: "Online",
      })
    } else {
      // Use server version
      await saveTransaction({
        ...conflict.serverVersion,
        status: "Online",
      })
    }

    await resolveConflictInDB(id)

    // Update pending count
    const transactions = await getTransactions()
    const pendingCount = transactions.filter((t) => t.status === "Offline").length
    set({ pendingTransactions: pendingCount })
  },
}))


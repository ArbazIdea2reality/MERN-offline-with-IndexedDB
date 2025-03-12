import type { Transaction, ConflictItem } from "@/lib/types"

// Mock data for the demo
const mockTransactions: Transaction[] = [
  {
    id: "1",
    description: "Salary",
    amount: 5000,
    date: "2023-03-01",
    type: "income",
    category: "salary",
    status: "Online",
  },
  {
    id: "2",
    description: "Rent",
    amount: 1500,
    date: "2023-03-05",
    type: "expense",
    category: "housing",
    status: "Online",
  },
  {
    id: "3",
    description: "Groceries",
    amount: 200,
    date: "2023-03-10",
    type: "expense",
    category: "food",
    status: "Online",
  },
  {
    id: "4",
    description: "Utilities",
    amount: 150,
    date: "2023-03-15",
    type: "expense",
    category: "utilities",
    status: "Online",
  },
  {
    id: "5",
    description: "Freelance Work",
    amount: 1000,
    date: "2023-03-20",
    type: "income",
    category: "other",
    status: "Offline",
  },
]

// Mock conflicts for the demo
const mockConflicts: ConflictItem[] = [
  {
    id: "conflict1",
    description: "Client Payment",
    localVersion: {
      id: "conflict1",
      description: "Client Payment",
      amount: 2500,
      date: "2023-03-25",
      type: "income",
      category: "other",
      status: "Offline",
    },
    serverVersion: {
      id: "conflict1",
      description: "Client Payment",
      amount: 2300,
      date: "2023-03-24",
      type: "income",
      category: "other",
      status: "Online",
    },
  },
]

// IndexedDB mock implementation for the demo
let transactions = [...mockTransactions]
let conflicts = [...mockConflicts]

export const initializeDB = async (): Promise<void> => {
  // In a real app, this would initialize IndexedDB
  // For this demo, we're just using in-memory arrays
  return Promise.resolve()
}

export const getTransactions = async (): Promise<Transaction[]> => {
  // Simulate async operation
  return Promise.resolve([...transactions])
}

export const saveTransaction = async (transaction: Transaction): Promise<void> => {
  const index = transactions.findIndex((t) => t.id === transaction.id)

  if (index >= 0) {
    transactions[index] = transaction
  } else {
    transactions.push(transaction)
  }

  return Promise.resolve()
}

export const deleteTransactionFromDB = async (id: string): Promise<void> => {
  transactions = transactions.filter((t) => t.id !== id)
  return Promise.resolve()
}

export const getConflicts = async (): Promise<ConflictItem[]> => {
  return Promise.resolve([...conflicts])
}

export const resolveConflictInDB = async (id: string): Promise<void> => {
  conflicts = conflicts.filter((c) => c.id !== id)
  return Promise.resolve()
}


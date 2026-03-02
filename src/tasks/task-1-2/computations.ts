import type { Transaction } from './types'

export function computeCategoryBreakdown(
  transactions: Transaction[]
): { category: string; count: number; revenue: number }[] {
  const map = new Map<string, { count: number; revenue: number }>()

  for (const t of transactions) {
    const entry = map.get(t.category) ?? { count: 0, revenue: 0 }
    entry.count += 1
    entry.revenue += t.amount * t.quantity
    map.set(t.category, entry)
  }

  return Array.from(map.entries())
    .map(([category, data]) => ({ category, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
}

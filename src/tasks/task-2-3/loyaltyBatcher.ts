import type { LoyaltyInfo } from '@/mocks/data/generators'

// Singleton class for unique brands loyalty requests queueing

type QueueEntry = {
  brandId: number
  resolve: (value: LoyaltyInfo) => void
  reject: (reason: unknown) => void
}

class LoyaltyBatcher {
  private queue: QueueEntry[] = []
  private scheduled = false

  fetch(brandId: number): Promise<LoyaltyInfo> {
    return new Promise<LoyaltyInfo>((resolve, reject) => {
      this.queue.push({ brandId, resolve, reject })

      if (!this.scheduled) {
        this.scheduled = true
        queueMicrotask(() => this.flush())
      }
    })
  }

  private async flush() {
    const entries = this.queue
    this.queue = []
    this.scheduled = false

    const uniqueBrandIds = [...new Set(entries.map((e) => e.brandId))]

    const rejectAll = (error: unknown) => {
      for (const entry of entries) {
        entry.reject(error)
      }
    }

    const res = await window
      .fetch(`/api/loyalty?brandIds=${uniqueBrandIds.join(',')}`)
      .catch(rejectAll)
    if (!res) return

    if (!res.ok) {
      rejectAll(new Error('Failed to fetch loyalty data'))
      return
    }

    const data: { loyalty: Record<number, LoyaltyInfo> } = await res.json()

    for (const entry of entries) {
      const info = data.loyalty[entry.brandId]
      if (info) {
        entry.resolve(info)
      } else {
        entry.reject(new Error(`No loyalty data for brand ${entry.brandId}`))
      }
    }
  }
}

export const loyaltyBatcher = new LoyaltyBatcher()

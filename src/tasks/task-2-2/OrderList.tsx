import { format } from 'date-fns'

import type { Order } from '@/mocks/data/generators'

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
}

type OrderListProps = {
  orders: Order[]
  selectedOrderId: number | null
  onSelectOrder: (id: number) => void
  onCreateOrder: () => void
  isCreating: boolean
}

export function OrderList({
  orders,
  selectedOrderId,
  onSelectOrder,
  onCreateOrder,
  isCreating,
}: OrderListProps) {
  return (
    <div className="space-y-3">
      <button
        onClick={onCreateOrder}
        disabled={isCreating}
        className="bg-primary text-primary-foreground w-full rounded-md px-4 py-2 text-sm disabled:opacity-50"
      >
        {isCreating ? 'Creating...' : 'Create Order'}
      </button>

      {orders.map((order) => (
        <button
          key={order.id}
          onClick={() => onSelectOrder(order.id)}
          className={`w-full rounded-lg border p-3 text-left transition-colors ${
            selectedOrderId === order.id
              ? 'border-primary bg-primary/5'
              : 'hover:bg-muted/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Order #{order.id}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-800'}`}
            >
              {order.status}
            </span>
          </div>
          <div className="text-muted-foreground mt-1 flex items-center justify-between text-xs">
            <span>${order.total.toFixed(2)}</span>
            <span>{format(new Date(order.createdAt), 'MMM d, yyyy')}</span>
          </div>
        </button>
      ))}
    </div>
  )
}

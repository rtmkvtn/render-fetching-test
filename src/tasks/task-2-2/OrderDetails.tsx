import { format } from 'date-fns'

import type { OrderDetail } from '@/mocks/data/generators'

const NEXT_STATUS: Record<string, string> = {
  pending: 'processing',
  processing: 'shipped',
  shipped: 'delivered',
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Start Processing',
  processing: 'Mark as Shipped',
  shipped: 'Mark as Delivered',
}

type OrderDetailsProps = {
  order: OrderDetail
  onUpdateStatus: (orderId: number, status: string) => void
  isUpdating: boolean
}

export function OrderDetails({
  order,
  onUpdateStatus,
  isUpdating,
}: OrderDetailsProps) {
  const nextStatus = NEXT_STATUS[order.status]

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
        <span className="text-muted-foreground text-sm">
          {format(new Date(order.createdAt), 'MMM d, yyyy')}
        </span>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left font-medium">Product</th>
            <th className="py-2 text-right font-medium">Qty</th>
            <th className="py-2 text-right font-medium">Price</th>
            <th className="py-2 text-right font-medium">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id} className="border-b last:border-0">
              <td className="py-2">{item.productName}</td>
              <td className="py-2 text-right">{item.quantity}</td>
              <td className="py-2 text-right">${item.price.toFixed(2)}</td>
              <td className="py-2 text-right">
                ${(item.quantity * item.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t pt-3">
        <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
        {nextStatus && (
          <button
            onClick={() => onUpdateStatus(order.id, nextStatus)}
            disabled={isUpdating}
            className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm disabled:opacity-50"
          >
            {isUpdating ? 'Updating...' : STATUS_LABELS[order.status]}
          </button>
        )}
        {!nextStatus && (
          <span className="text-sm font-medium text-green-600">Delivered</span>
        )}
      </div>
    </div>
  )
}

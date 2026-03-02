import { useState } from 'react'

import { OrderDetails } from './OrderDetails'
import { OrderList } from './OrderList'
import { UserInfo } from './UserInfo'
import {
  useCreateOrder,
  useCurrentUser,
  useOrderDetails,
  useUpdateOrderStatus,
  useUserOrders,
} from './useUserOrders'

function UserSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <div className="bg-muted h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <div className="bg-muted h-4 w-32 rounded" />
          <div className="bg-muted h-3 w-48 rounded" />
        </div>
      </div>
    </div>
  )
}

function OrderListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="animate-pulse rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div className="bg-muted h-4 w-24 rounded" />
            <div className="bg-muted h-5 w-16 rounded-full" />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="bg-muted h-3 w-16 rounded" />
            <div className="bg-muted h-3 w-20 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

function OrderDetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="bg-muted h-5 w-28 rounded" />
        <div className="bg-muted h-4 w-24 rounded" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="bg-muted h-4 w-40 rounded" />
            <div className="bg-muted h-4 w-16 rounded" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t pt-3">
        <div className="bg-muted h-5 w-24 rounded" />
        <div className="bg-muted h-9 w-32 rounded" />
      </div>
    </div>
  )
}

function ErrorBlock({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-lg border border-dashed">
      <p className="text-destructive text-sm">{message}</p>
      <button
        onClick={onRetry}
        className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm"
      >
        Try again
      </button>
    </div>
  )
}

export function DependentQueries() {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    error: userErr,
    refetch: refetchUser,
  } = useCurrentUser()

  const {
    data: orders,
    isLoading: ordersLoading,
    isError: ordersError,
    error: ordersErr,
    refetch: refetchOrders,
  } = useUserOrders(user?.id)

  const orderIds = orders?.map((o) => o.id) ?? []
  const {
    data: orderDetails,
    isLoading: detailsLoading,
    isError: detailsError,
    error: detailsErr,
    refetch: refetchDetails,
  } = useOrderDetails(orderIds)

  // Mutations
  const createOrder = useCreateOrder(user?.id)
  const updateStatus = useUpdateOrderStatus(user?.id)

  const selectedDetail = orderDetails?.find((d) => d.id === selectedOrderId)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Dependent Queries</h1>
        <p className="text-muted-foreground text-sm">
          Sequential query chain: User → Orders → Order Details
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        {/* Left column: User info + Order list */}
        <div className="space-y-4">
          {/* User info */}
          {userLoading && <UserSkeleton />}
          {userError && (
            <ErrorBlock
              message={userErr?.message ?? 'Failed to load user'}
              onRetry={() => refetchUser()}
            />
          )}
          {user && <UserInfo user={user} />}

          {/* Order list */}
          {user && ordersLoading && <OrderListSkeleton />}
          {ordersError && (
            <ErrorBlock
              message={ordersErr?.message ?? 'Failed to load orders'}
              onRetry={() => refetchOrders()}
            />
          )}
          {orders && (
            <OrderList
              orders={orders}
              selectedOrderId={selectedOrderId}
              onSelectOrder={setSelectedOrderId}
              onCreateOrder={() => createOrder.mutate()}
              isCreating={createOrder.isPending}
            />
          )}
        </div>

        {/* Right column: Order details */}
        <div>
          {user && orders && detailsLoading && <OrderDetailsSkeleton />}
          {detailsError && (
            <ErrorBlock
              message={detailsErr?.message ?? 'Failed to load order details'}
              onRetry={() => refetchDetails()}
            />
          )}
          {selectedDetail ? (
            <OrderDetails
              order={selectedDetail}
              onUpdateStatus={(orderId, status) =>
                updateStatus.mutate({ orderId, status })
              }
              isUpdating={updateStatus.isPending}
            />
          ) : (
            orderDetails &&
            !detailsLoading && (
              <div className="text-muted-foreground flex min-h-40 items-center justify-center rounded-lg border border-dashed text-sm">
                Select an order to view details
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

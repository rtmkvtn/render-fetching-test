import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { Order, OrderDetail, User } from '@/mocks/data/generators'

// Query hooks

export function useCurrentUser() {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await fetch('/api/user')
      if (!res.ok) throw new Error('Failed to fetch user')
      return res.json()
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useUserOrders(userId: number | undefined) {
  return useQuery<{ orders: Order[] }, Error, Order[]>({
    queryKey: ['user', userId, 'orders'],
    queryFn: async () => {
      const res = await fetch(`/api/user/${userId}/orders`)
      if (!res.ok) throw new Error('Failed to fetch orders')
      return res.json()
    },
    enabled: !!userId,
    select: (data) => data.orders,
    staleTime: 2 * 60 * 1000,
  })
}

export function useOrderDetails(orderIds: number[]) {
  const sortedIds = [...orderIds].sort((a, b) => a - b)
  return useQuery<{ orders: OrderDetail[] }, Error, OrderDetail[]>({
    queryKey: ['orders', 'details', sortedIds],
    queryFn: async () => {
      const res = await fetch(`/api/orders/details?ids=${sortedIds.join(',')}`)
      if (!res.ok) throw new Error('Failed to fetch order details')
      return res.json()
    },
    enabled: orderIds.length > 0,
    select: (data) => data.orders,
    staleTime: 5 * 60 * 1000,
  })
}

// Mutation hooks

export function useCreateOrder(userId: number | undefined) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
      if (!res.ok) throw new Error('Failed to create order')
      return res.json()
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user', userId, 'orders'],
      })
    },
  })
}

export function useUpdateOrderStatus(userId: number | undefined) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: number
      status: string
    }) => {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Failed to update order status')
      return res.json()
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['user', userId, 'orders'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['orders', 'details'],
        }),
      ])
    },
  })
}

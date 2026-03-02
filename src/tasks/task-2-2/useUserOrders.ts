import { useMemo } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { Order, OrderDetail, User } from '@/mocks/data/generators'

function selectOrders<T extends { orders: O[] }, O>(data: T): O[] {
  return data.orders
}

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
    select: selectOrders,
    staleTime: 2 * 60 * 1000,
  })
}

export function useOrderDetails(orderIds: number[]) {
  const sortedIds = useMemo(
    () => [...orderIds].sort((a, b) => a - b),
    [orderIds.join(',')]
  )
  return useQuery<{ orders: OrderDetail[] }, Error, OrderDetail[]>({
    queryKey: ['orders', 'details', sortedIds],
    queryFn: async () => {
      const res = await fetch(`/api/orders/details?ids=${sortedIds.join(',')}`)
      if (!res.ok) throw new Error('Failed to fetch order details')
      return res.json()
    },
    enabled: orderIds.length > 0,
    select: selectOrders,
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
      return (await res.json()) as { order: Order }
    },
    onSuccess: (data) => {
      queryClient.setQueryData<{ orders: Order[] }>(
        ['user', userId, 'orders'],
        (old) => {
          if (!old) return old
          return { orders: [...old.orders, data.order] }
        }
      )
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
    onMutate: async ({ orderId, status }) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ['user', userId, 'orders'] }),
        queryClient.cancelQueries({ queryKey: ['orders', 'details'] }),
      ])

      const prevOrders = queryClient.getQueryData<{ orders: Order[] }>([
        'user',
        userId,
        'orders',
      ])

      const prevDetails = queryClient.getQueriesData<{
        orders: OrderDetail[]
      }>({ queryKey: ['orders', 'details'] })

      queryClient.setQueryData<{ orders: Order[] }>(
        ['user', userId, 'orders'],
        (old) => {
          if (!old) return old
          return {
            orders: old.orders.map((o) =>
              o.id === orderId ? { ...o, status } : o
            ),
          }
        }
      )

      queryClient.setQueriesData<{ orders: OrderDetail[] }>(
        { queryKey: ['orders', 'details'] },
        (old) => {
          if (!old) return old
          return {
            orders: old.orders.map((o) =>
              o.id === orderId ? { ...o, status } : o
            ),
          }
        }
      )

      return { prevOrders, prevDetails }
    },
    onError: (_err, _variables, context) => {
      if (context?.prevOrders) {
        queryClient.setQueryData(['user', userId, 'orders'], context.prevOrders)
      }
      if (context?.prevDetails) {
        for (const [key, data] of context.prevDetails) {
          queryClient.setQueryData(key, data)
        }
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['orders', 'details'] })
    },
  })
}

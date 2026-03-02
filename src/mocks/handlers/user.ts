import { faker } from '@faker-js/faker'
import { delay, http, HttpResponse } from 'msw'

import {
  CURRENT_USER,
  ORDER_DETAILS,
  USER_ORDERS,
} from '@/mocks/data/generators'
import type { OrderLineItem } from '@/mocks/data/generators'

const randomDelay = () => Math.floor(Math.random() * 300) + 200

export const userHandlers = [
  http.get('/api/user', async () => {
    await delay(randomDelay())
    return HttpResponse.json(CURRENT_USER)
  }),

  http.get('/api/user/:id/orders', async ({ params }) => {
    await delay(randomDelay())

    const id = Number(params.id)
    if (id !== CURRENT_USER.id) {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return HttpResponse.json({ orders: USER_ORDERS })
  }),

  http.get('/api/orders/details', async ({ request }) => {
    await delay(randomDelay())

    const url = new URL(request.url)
    const idsParam = url.searchParams.get('ids') ?? ''
    const ids = idsParam
      .split(',')
      .map(Number)
      .filter((id) => !isNaN(id))

    const orders = ids
      .map((id) => ORDER_DETAILS.get(id))
      .filter((order): order is NonNullable<typeof order> => order != null)

    return HttpResponse.json({ orders })
  }),

  http.post('/api/orders', async ({ request }) => {
    await delay(randomDelay())

    const { userId } = (await request.json()) as { userId: number }
    if (userId !== CURRENT_USER.id) {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const nextId = USER_ORDERS.reduce((max, o) => Math.max(max, o.id), 0) + 1
    const lineItemCount = faker.number.int({ min: 1, max: 5 })
    const items: OrderLineItem[] = Array.from(
      { length: lineItemCount },
      (_, j) => ({
        id: j + 1,
        productName: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 5 }),
        price: parseFloat(faker.commerce.price({ min: 5, max: 100 })),
      })
    )
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

    const order = {
      id: nextId,
      status: 'pending',
      total: parseFloat(total.toFixed(2)),
      createdAt: new Date().toISOString(),
    }

    USER_ORDERS.push(order)
    ORDER_DETAILS.set(nextId, { ...order, items })

    return HttpResponse.json({ order }, { status: 201 })
  }),

  http.patch('/api/orders/:id/status', async ({ params, request }) => {
    await delay(randomDelay())

    const id = Number(params.id)
    const { status } = (await request.json()) as { status: string }

    const order = USER_ORDERS.find((o) => o.id === id)
    if (!order) {
      return HttpResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    order.status = status
    const detail = ORDER_DETAILS.get(id)
    if (detail) detail.status = status

    return HttpResponse.json({ order })
  }),
]

import { delay, http, HttpResponse } from 'msw'

import {
  CURRENT_USER,
  ORDER_DETAILS,
  USER_ORDERS,
} from '@/mocks/data/generators'

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
]

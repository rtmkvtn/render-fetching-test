import { delay, http, HttpResponse } from 'msw'

import { ITEMS_DATA } from '@/mocks/data/generators'

const randomDelay = () => Math.floor(Math.random() * 300) + 200

export const itemsHandlers = [
  http.get('/api/items', async ({ request }) => {
    await delay(randomDelay())

    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? '1')
    const limit = Number(url.searchParams.get('limit') ?? '20')

    const start = (page - 1) * limit
    const items = ITEMS_DATA.slice(start, start + limit)
    const hasMore = start + limit < ITEMS_DATA.length

    return HttpResponse.json({
      items,
      nextPage: hasMore ? page + 1 : null,
      total: ITEMS_DATA.length,
    })
  }),
]

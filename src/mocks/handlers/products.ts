import { delay, http, HttpResponse } from 'msw'

import { getLoyaltyForBrand, PRODUCTS_DATA } from '@/mocks/data/generators'
import type { LoyaltyInfo } from '@/mocks/data/generators'

const randomDelay = () => Math.floor(Math.random() * 300) + 200

export const productsHandlers = [
  http.get('/api/products', async ({ request }) => {
    await delay(randomDelay())

    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? '1')
    const limit = Number(url.searchParams.get('limit') ?? '24')

    const start = (page - 1) * limit
    const products = PRODUCTS_DATA.slice(start, start + limit)
    const hasMore = start + limit < PRODUCTS_DATA.length

    return HttpResponse.json({
      products,
      nextPage: hasMore ? page + 1 : null,
      total: PRODUCTS_DATA.length,
    })
  }),

  http.get('/api/loyalty', async ({ request }) => {
    await delay(randomDelay())

    const url = new URL(request.url)
    const brandIdsParam = url.searchParams.get('brandIds') ?? ''
    const brandIds = brandIdsParam
      .split(',')
      .map(Number)
      .filter((id) => !isNaN(id))

    const loyalty: Record<number, LoyaltyInfo> = {}
    for (const brandId of brandIds) {
      loyalty[brandId] = getLoyaltyForBrand(brandId)
    }

    return HttpResponse.json({ loyalty })
  }),
]

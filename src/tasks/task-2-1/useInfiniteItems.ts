import { useInfiniteQuery } from '@tanstack/react-query'

import type { Item } from '@/mocks/data/generators'

type ItemsResponse = {
  items: Item[]
  hasMore: boolean
  total: number
}

async function fetchItems(page: number): Promise<ItemsResponse> {
  const res = await fetch(`/api/items?page=${page}&limit=20`)
  if (!res.ok) throw new Error('Failed to fetch items')
  return res.json()
}

export function useInfiniteItems() {
  return useInfiniteQuery<
    ItemsResponse,
    Error,
    { items: Item[]; total: number },
    string[],
    number
  >({
    queryKey: ['items'],
    queryFn: ({ pageParam }) => fetchItems(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.hasMore ? lastPageParam + 1 : undefined,
    select: (data) => ({
      items: data.pages.flatMap((page) => page.items),
      total: data.pages[data.pages.length - 1].total,
    }),
    staleTime: Infinity,
  })
}

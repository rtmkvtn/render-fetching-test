import { useEffect } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'

import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import type { Product } from '@/mocks/data/generators'

import { ProductCard } from './ProductCard'

type ProductsResponse = {
  products: Product[]
  nextPage: number | null
  total: number
}

async function fetchProducts(page: number): Promise<ProductsResponse> {
  const res = await fetch(`/api/products?page=${page}&limit=24`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

function selectProducts(data: { pages: ProductsResponse[] }) {
  return {
    products: data.pages.flatMap((page) => page.products),
    total: data.pages[data.pages.length - 1].total,
  }
}

function PageHeader({ total }: { total?: number }) {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold">Request Batching</h1>
      <p className="text-muted-foreground text-sm">
        {total !== undefined
          ? `${total} products — loyalty data batched per tick`
          : 'Loading products...'}
      </p>
    </div>
  )
}

function GridSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-lg border"
        >
          <div className="bg-muted h-40 w-full" />
          <div className="space-y-2 p-3">
            <div className="bg-muted h-4 w-2/3 rounded" />
            <div className="bg-muted h-3 w-1/3 rounded" />
            <div className="bg-muted mt-2 h-5 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </>
  )
}

export function ProductGrid() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery<
    ProductsResponse,
    Error,
    { products: Product[]; total: number },
    string[],
    number
  >({
    queryKey: ['products'],
    queryFn: ({ pageParam }) => fetchProducts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    select: selectProducts,
    staleTime: Infinity,
  })

  const { ref: sentinelRef, isIntersecting } =
    useIntersectionObserver<HTMLDivElement>({
      rootMargin: '200px',
      enabled: hasNextPage && !isFetchingNextPage,
    })

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage()
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage])

  const allProducts = data?.products ?? []
  const total = data?.total

  if (isLoading) {
    return (
      <div>
        <PageHeader />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          <GridSkeleton count={24} />
        </div>
      </div>
    )
  }

  if (isError && !data) {
    return (
      <div>
        <PageHeader />
        <div className="flex min-h-60 flex-col items-center justify-center gap-3">
          <p className="text-destructive">
            {error?.message ?? 'Failed to load products'}
          </p>
          <button
            onClick={() => refetch()}
            className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader total={total} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {isFetchingNextPage && <GridSkeleton count={24} />}
      </div>

      {!isFetchingNextPage && isError && (
        <div className="mt-4 flex items-center justify-center gap-3 rounded-lg border border-dashed p-4">
          <p className="text-destructive text-sm">Failed to load more</p>
          <button
            onClick={() => fetchNextPage()}
            className="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {!hasNextPage && allProducts.length > 0 && (
        <p className="text-muted-foreground py-4 text-center text-sm">
          All {total} products loaded
        </p>
      )}

      {hasNextPage && <div ref={sentinelRef} />}
    </div>
  )
}

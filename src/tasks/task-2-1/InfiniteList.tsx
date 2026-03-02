import { useEffect } from 'react'

import { useIntersectionObserver } from '@/hooks/use-intersection-observer'

import { InfiniteListItem } from './InfiniteListItem'
import { useInfiniteItems } from './useInfiniteItems'

function PageHeader({ total }: { total?: number }) {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold">Infinite Scroll</h1>
      <p className="text-muted-foreground text-sm">
        {total !== undefined
          ? `${total} items loaded via infinite scroll`
          : 'Loading items...'}
      </p>
    </div>
  )
}

function InitialSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="animate-pulse rounded-lg border p-4">
          <div className="flex gap-3">
            <div className="bg-muted h-10 w-10 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="bg-muted h-4 w-1/3 rounded" />
              <div className="bg-muted h-3 w-full rounded" />
              <div className="bg-muted h-3 w-2/3 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function NextPageSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="animate-pulse rounded-lg border p-4">
          <div className="flex gap-3">
            <div className="bg-muted h-10 w-10 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="bg-muted h-4 w-1/3 rounded" />
              <div className="bg-muted h-3 w-full rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function InfiniteList() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteItems()

  const { ref: sentinelRef, isIntersecting } =
    useIntersectionObserver<HTMLDivElement>({
      rootMargin: '200px',
      enabled: hasNextPage && !isFetchingNextPage,
    })

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage])

  const allItems = data?.items ?? []
  const total = data?.total

  if (isLoading) {
    return (
      <div>
        <PageHeader />
        <InitialSkeleton />
      </div>
    )
  }

  if (isError && !data) {
    return (
      <div>
        <PageHeader />
        <div className="flex min-h-60 flex-col items-center justify-center gap-3">
          <p className="text-destructive">
            {error?.message ?? 'Failed to load items'}
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
    <div className="space-y-3">
      <PageHeader total={total} />

      {allItems.map((item) => (
        <InfiniteListItem key={item.id} item={item} />
      ))}

      {isFetchingNextPage && <NextPageSkeleton />}

      {!isFetchingNextPage && isError && (
        <div className="flex items-center justify-center gap-3 rounded-lg border border-dashed p-4">
          <p className="text-destructive text-sm">Failed to load more</p>
          <button
            onClick={() => fetchNextPage()}
            className="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {!hasNextPage && allItems.length > 0 && (
        <p className="text-muted-foreground py-4 text-center text-sm">
          All {total} items loaded
        </p>
      )}

      {hasNextPage && <div ref={sentinelRef} />}
    </div>
  )
}

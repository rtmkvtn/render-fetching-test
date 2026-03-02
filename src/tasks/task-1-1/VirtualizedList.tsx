import { useRef } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'

import { items } from './data'
import { ListCard } from './ListCard'

export function VirtualizedList() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 112,
    overscan: 5,
  })

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Virtualized List</h1>
        <p className="text-muted-foreground text-sm">
          10,000 items rendered with @tanstack/react-virtual
        </p>
      </div>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-auto rounded-lg border"
      >
        <div
          className="relative w-full"
          style={{ height: virtualizer.getTotalSize() }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <ListCard
              key={virtualRow.key}
              ref={virtualizer.measureElement}
              data-index={virtualRow.index}
              item={items[virtualRow.index]}
              className="absolute left-0 top-0 w-full"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

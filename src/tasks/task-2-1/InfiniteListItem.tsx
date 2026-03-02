import { format } from 'date-fns'

import type { Item } from '@/mocks/data/generators'

export function InfiniteListItem({ item }: { item: Item }) {
  return (
    <div className="flex gap-3 rounded-lg border p-4">
      <img
        src={item.avatar}
        alt={item.name}
        className="h-10 w-10 shrink-0 rounded-full"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="truncate font-medium">{item.name}</h3>
          <span className="text-muted-foreground shrink-0 text-xs">
            {format(new Date(item.createdAt), 'MMM d, yyyy')}
          </span>
        </div>
        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
          {item.description}
        </p>
      </div>
    </div>
  )
}

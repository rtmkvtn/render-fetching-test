import type { ComponentProps, Ref } from 'react'

import { cn } from '@/lib/utils'

import type { ListItem } from './data'

export function ListCard({
  item,
  ref,
  className,
  ...rest
}: {
  item: ListItem
  ref?: Ref<HTMLDivElement>
} & Omit<ComponentProps<'div'>, 'children'>) {
  return (
    <div
      ref={ref}
      className={cn('flex items-start gap-3 border-b px-4 py-3', className)}
      {...rest}
    >
      <img
        src={item.avatar}
        alt={item.name}
        width={40}
        height={40}
        className="bg-muted shrink-0 rounded-full"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-medium">{item.name}</span>
          <span className="text-muted-foreground shrink-0 text-xs">
            {item.formattedDate}
          </span>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
      </div>
    </div>
  )
}

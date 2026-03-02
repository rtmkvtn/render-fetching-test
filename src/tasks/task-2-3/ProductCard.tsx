import type { Product } from '@/mocks/data/generators'

import { useBatchedLoyalty } from './useBatchedLoyalty'

function LoyaltySkeleton() {
  return (
    <div className="mt-2 flex animate-pulse gap-2">
      <div className="bg-muted h-5 w-16 rounded" />
      <div className="bg-muted h-5 w-12 rounded" />
    </div>
  )
}

export function ProductCard({ product }: { product: Product }) {
  const { data: loyalty, isLoading } = useBatchedLoyalty(product.brandId)

  return (
    <div className="overflow-hidden rounded-lg border">
      <img
        src={product.image}
        alt={product.name}
        className="bg-muted h-40 w-full object-cover"
        loading="lazy"
      />
      <div className="p-3">
        <h3 className="truncate text-sm font-medium">{product.name}</h3>
        <p className="text-muted-foreground text-sm">
          ${product.price.toFixed(2)}
        </p>

        {isLoading ? (
          <LoyaltySkeleton />
        ) : loyalty ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-xs font-medium">
              {loyalty.tier}
            </span>
            <span className="text-muted-foreground text-xs leading-5">
              {loyalty.points} pts
            </span>
            <span className="text-xs leading-5 text-green-600">
              -{loyalty.discount}%
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

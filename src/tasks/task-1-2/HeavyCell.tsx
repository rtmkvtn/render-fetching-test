/*
 * HeavyCell — the sole expensive computation at render time.
 *
 * This component receives a `transactions` array and computes the category
 * breakdown on every render. Because the data is generated at module scope
 * (stable reference), when the user types in the filter, rows that remain
 * visible keep the same `transactions` reference. The React Compiler skips
 * re-rendering this component entirely — no expensive recomputation.
 *
 * Without the Compiler, you'd need:
 *   - React.memo(HeavyCell) to bail out on shallow-equal props
 *   - useMemo inside for the computation result
 * The Compiler handles both automatically.
 */
import { Badge } from '@/components/ui/badge'
import { TableCell } from '@/components/ui/table'

import { computeCategoryBreakdown } from './computations'
import type { Transaction } from './types'

interface HeavyCellProps {
  transactions: Transaction[]
}

export function HeavyCell({ transactions }: HeavyCellProps) {
  const breakdown = computeCategoryBreakdown(transactions)

  return (
    <TableCell>
      <div className="flex flex-wrap gap-1">
        {breakdown.slice(0, 3).map((b) => (
          <Badge key={b.category} variant="secondary" className="text-xs">
            {b.category}: {b.count}
          </Badge>
        ))}
        {breakdown.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{breakdown.length - 3}
          </Badge>
        )}
      </div>
    </TableCell>
  )
}

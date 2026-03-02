// SalesRow — named to avoid collision with shadcn's TableRow export.
//
// The React Compiler auto-memoizes this component. When the parent
// re-renders due to filter changes, rows whose `rep` prop reference
// hasn't changed will be skipped entirely, including the HeavyCell
// child and its expensive category breakdown computation.
import { TableCell, TableRow } from '@/components/ui/table'

import { HeavyCell } from './HeavyCell'
import type { SalesRep } from './types'

interface SalesRowProps {
  rep: SalesRep
}

export function SalesRow({ rep }: SalesRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <img
            src={rep.avatar}
            alt=""
            className="size-8 rounded-full bg-muted"
          />
          <div>
            <div className="font-medium">{rep.name}</div>
            <div className="text-muted-foreground text-xs">{rep.region}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>{rep.gender}</TableCell>
      <TableCell className="text-right">{rep.age}</TableCell>
      <TableCell>{rep.married ? 'Yes' : 'No'}</TableCell>
      <HeavyCell transactions={rep.transactions} />
    </TableRow>
  )
}

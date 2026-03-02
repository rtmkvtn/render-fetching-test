import { useState } from 'react'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { salesReps } from './data'
import { FilterBar } from './FilterBar'
import { SalesRow } from './SalesRow'

export function ExpensiveTable() {
  const [nameFilter, setNameFilter] = useState('')

  const filteredReps = salesReps.filter((rep) => {
    return rep.name.toLowerCase().includes(nameFilter.toLowerCase())
  })

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Expensive Table</h1>
        <p className="text-muted-foreground text-sm">
          500 sales reps with a heavy category breakdown cell. No manual
          memo/useMemo/useCallbacks, as react compiler already manages
          memoization. Just correct separation of components matters here
        </p>
      </div>

      <div className="mb-4">
        <FilterBar
          nameFilter={nameFilter}
          onNameFilterChange={setNameFilter}
          resultCount={filteredReps.length}
          totalCount={salesReps.length}
        />
      </div>

      <div className="min-h-0 flex-1 overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-50">Sales Rep</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className="text-right">Age</TableHead>
              <TableHead>Married</TableHead>
              <TableHead>Top Categories</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReps.map((rep) => (
              <SalesRow key={rep.id} rep={rep} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

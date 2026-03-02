import { Input } from '@/components/ui/input'

interface FilterBarProps {
  nameFilter: string
  onNameFilterChange: (value: string) => void
  resultCount: number
  totalCount: number
}

export function FilterBar({
  nameFilter,
  onNameFilterChange,
  resultCount,
  totalCount,
}: FilterBarProps) {
  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Filter by name..."
        value={nameFilter}
        onChange={(e) => onNameFilterChange(e.target.value)}
        className="max-w-xs"
      />
      <span className="text-muted-foreground text-sm">
        {resultCount} of {totalCount} reps
      </span>
    </div>
  )
}

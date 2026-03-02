'use no memo'
import { useFormState } from 'react-hook-form'

import { Badge } from '@/components/ui/badge'

import type { FormValues } from './schema'

export function FormStatus() {
  const { errors, dirtyFields } = useFormState<FormValues>()
  const dirtyCount = Object.keys(dirtyFields).length
  const errorCount = Object.keys(errors).length

  return (
    <div className="flex gap-2">
      {dirtyCount > 0 && (
        <Badge variant="secondary">
          {dirtyCount} field{dirtyCount !== 1 ? 's' : ''} modified
        </Badge>
      )}
      {errorCount > 0 && (
        <Badge variant="destructive">
          {errorCount} error{errorCount !== 1 ? 's' : ''}
        </Badge>
      )}
    </div>
  )
}

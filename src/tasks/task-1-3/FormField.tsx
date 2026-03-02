'use no memo'
import { useFormContext, useFormState } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import type { FieldConfig } from './fields'
import type { FormValues } from './schema'

interface FormFieldProps {
  field: FieldConfig
}

export function FormField({ field }: FormFieldProps) {
  const { register } = useFormContext<FormValues>()
  const { errors } = useFormState<FormValues>({ name: field.name })
  const error = errors[field.name]

  if (field.type === 'checkbox') {
    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={field.name}
          {...register(field.name)}
          className="size-4 rounded border-input"
        />
        <Label htmlFor={field.name}>{field.label}</Label>
        {error && <p className="text-sm text-destructive">{error.message}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={field.name}>{field.label}</Label>
      {field.type === 'select' ? (
        <select
          id={field.name}
          {...register(field.name)}
          className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm"
        >
          <option value="">Select...</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea
          id={field.name}
          {...register(field.name)}
          placeholder={field.placeholder}
          rows={3}
          className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
        />
      ) : (
        <Input
          id={field.name}
          {...register(field.name)}
          placeholder={field.placeholder}
        />
      )}
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  )
}

import { fields, type Section } from './fields'
import { FormField } from './FormField'

interface FormSectionProps {
  section: Section
}

export function FormSection({ section }: FormSectionProps) {
  const sectionFields = fields.filter((f) => f.section === section)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {sectionFields.map((field) => (
        <FormField key={field.name} field={field} />
      ))}
    </div>
  )
}

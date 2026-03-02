import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { DEFAULT_VALUES, type Section, SECTION_LABELS } from './fields'
import { FormSection } from './FormSection'
import { FormStatus } from './FormStatus'
import { formSchema, type FormValues } from './schema'

const sections: Section[] = [
  'personal',
  'address',
  'employment',
  'education',
  'preferences',
]

export function LargeForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  })

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data)
  }

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Task 1.3 — Large Form</h1>
            <p className="text-muted-foreground text-sm">
              50+ fields across 5 tabs — zero extensive re-renders on keystroke
            </p>
            <p className="text-muted-foreground text-sm">
              For re-renders tracking I would use React DevTools Profiler with
              "Highlight re-rendering components" option on. Also, logging
              inside Field component is useful
            </p>
          </div>
          <FormStatus />
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="personal">
            <TabsList>
              {sections.map((section) => (
                <TabsTrigger key={section} value={section}>
                  {SECTION_LABELS[section]}
                </TabsTrigger>
              ))}
            </TabsList>
            {/*All tabs always mounted and inactive are hidden by CSS*/}
            {sections.map((section) => (
              <TabsContent
                key={section}
                value={section}
                forceMount
                className="data-[state=inactive]:hidden"
              >
                <FormSection section={section} />
              </TabsContent>
            ))}
          </Tabs>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </FormProvider>
  )
}

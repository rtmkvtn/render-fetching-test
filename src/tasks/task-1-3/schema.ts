import { z } from 'zod'

export const formSchema = z.object({
  // Personal
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email('Invalid email address'),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  ssn: z.string().optional(),
  maritalStatus: z.string().optional(),
  nationality: z.string().optional(),
  preferredLanguage: z.string().optional(),

  // Address
  street: z.string().optional(),
  apartment: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  addressType: z.string().optional(),
  landmark: z.string().optional(),
  deliveryInstructions: z.string().optional(),
  sameAsBilling: z.boolean().optional(),

  // Employment
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  employeeId: z.string().optional(),
  startDate: z.string().optional(),
  salary: z.string().optional(),
  workEmail: z.string().optional(),
  workPhone: z.string().optional(),
  manager: z.string().optional(),
  employmentType: z.string().optional(),

  // Education
  university: z.string().optional(),
  degree: z.string().optional(),
  major: z.string().optional(),
  graduationYear: z.string().optional(),
  gpa: z.string().optional(),
  certifications: z.string().optional(),
  skills: z.string().optional(),
  publications: z.string().optional(),
  awards: z.string().optional(),
  linkedIn: z.url('Invalid URL').optional().or(z.literal('')),

  // Preferences
  newsletter: z.boolean().optional(),
  notifications: z.boolean().optional(),
  theme: z.string().optional(),
  timezone: z.string().optional(),
  currency: z.string().optional(),
  bio: z.string().optional(),
  website: z.url('Invalid URL').optional().or(z.literal('')),
  twitter: z.string().optional(),
  github: z.string().optional(),
  notes: z.string().optional(),
})

export type FormValues = z.infer<typeof formSchema>

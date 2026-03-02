import type { FormValues } from './schema'

export type FieldType = 'text' | 'select' | 'checkbox' | 'textarea'

export type Section =
  | 'personal'
  | 'address'
  | 'employment'
  | 'education'
  | 'preferences'

export interface FieldConfig {
  name: keyof FormValues
  label: string
  section: Section
  type: FieldType
  placeholder?: string
  options?: { value: string; label: string }[]
}

export const SECTION_LABELS: Record<Section, string> = {
  personal: 'Personal',
  address: 'Address',
  employment: 'Employment',
  education: 'Education',
  preferences: 'Preferences',
}

export const fields: FieldConfig[] = [
  // Personal
  {
    name: 'firstName',
    label: 'First Name',
    section: 'personal',
    type: 'text',
    placeholder: 'John',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    section: 'personal',
    type: 'text',
    placeholder: 'Doe',
  },
  {
    name: 'email',
    label: 'Email',
    section: 'personal',
    type: 'text',
    placeholder: 'john@example.com',
  },
  {
    name: 'phone',
    label: 'Phone',
    section: 'personal',
    type: 'text',
    placeholder: '+1 (555) 000-0000',
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    section: 'personal',
    type: 'text',
    placeholder: 'YYYY-MM-DD',
  },
  {
    name: 'gender',
    label: 'Gender',
    section: 'personal',
    type: 'select',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
      { value: 'prefer-not-to-say', label: 'Prefer not to say' },
    ],
  },
  {
    name: 'ssn',
    label: 'SSN',
    section: 'personal',
    type: 'text',
    placeholder: 'XXX-XX-XXXX',
  },
  {
    name: 'maritalStatus',
    label: 'Marital Status',
    section: 'personal',
    type: 'select',
    options: [
      { value: 'single', label: 'Single' },
      { value: 'married', label: 'Married' },
      { value: 'divorced', label: 'Divorced' },
      { value: 'widowed', label: 'Widowed' },
    ],
  },
  {
    name: 'nationality',
    label: 'Nationality',
    section: 'personal',
    type: 'text',
    placeholder: 'e.g. American',
  },
  {
    name: 'preferredLanguage',
    label: 'Preferred Language',
    section: 'personal',
    type: 'select',
    options: [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' },
      { value: 'zh', label: 'Chinese' },
    ],
  },

  // Address
  {
    name: 'street',
    label: 'Street',
    section: 'address',
    type: 'text',
    placeholder: '123 Main St',
  },
  {
    name: 'apartment',
    label: 'Apartment / Suite',
    section: 'address',
    type: 'text',
    placeholder: 'Apt 4B',
  },
  {
    name: 'city',
    label: 'City',
    section: 'address',
    type: 'text',
    placeholder: 'New York',
  },
  {
    name: 'state',
    label: 'State',
    section: 'address',
    type: 'text',
    placeholder: 'NY',
  },
  {
    name: 'zipCode',
    label: 'Zip Code',
    section: 'address',
    type: 'text',
    placeholder: '10001',
  },
  {
    name: 'country',
    label: 'Country',
    section: 'address',
    type: 'select',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
    ],
  },
  {
    name: 'addressType',
    label: 'Address Type',
    section: 'address',
    type: 'select',
    options: [
      { value: 'home', label: 'Home' },
      { value: 'work', label: 'Work' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    name: 'landmark',
    label: 'Landmark',
    section: 'address',
    type: 'text',
    placeholder: 'Near Central Park',
  },
  {
    name: 'deliveryInstructions',
    label: 'Delivery Instructions',
    section: 'address',
    type: 'textarea',
    placeholder: 'Leave at door...',
  },
  {
    name: 'sameAsBilling',
    label: 'Same as billing address',
    section: 'address',
    type: 'checkbox',
  },

  // Employment
  {
    name: 'company',
    label: 'Company',
    section: 'employment',
    type: 'text',
    placeholder: 'Acme Inc.',
  },
  {
    name: 'jobTitle',
    label: 'Job Title',
    section: 'employment',
    type: 'text',
    placeholder: 'Software Engineer',
  },
  {
    name: 'department',
    label: 'Department',
    section: 'employment',
    type: 'text',
    placeholder: 'Engineering',
  },
  {
    name: 'employeeId',
    label: 'Employee ID',
    section: 'employment',
    type: 'text',
    placeholder: 'EMP-001',
  },
  {
    name: 'startDate',
    label: 'Start Date',
    section: 'employment',
    type: 'text',
    placeholder: 'YYYY-MM-DD',
  },
  {
    name: 'salary',
    label: 'Salary',
    section: 'employment',
    type: 'text',
    placeholder: '100,000',
  },
  {
    name: 'workEmail',
    label: 'Work Email',
    section: 'employment',
    type: 'text',
    placeholder: 'john@company.com',
  },
  {
    name: 'workPhone',
    label: 'Work Phone',
    section: 'employment',
    type: 'text',
    placeholder: '+1 (555) 000-0000',
  },
  {
    name: 'manager',
    label: 'Manager',
    section: 'employment',
    type: 'text',
    placeholder: 'Jane Smith',
  },
  {
    name: 'employmentType',
    label: 'Employment Type',
    section: 'employment',
    type: 'select',
    options: [
      { value: 'full-time', label: 'Full-time' },
      { value: 'part-time', label: 'Part-time' },
      { value: 'contract', label: 'Contract' },
      { value: 'intern', label: 'Intern' },
    ],
  },

  // Education
  {
    name: 'university',
    label: 'University',
    section: 'education',
    type: 'text',
    placeholder: 'MIT',
  },
  {
    name: 'degree',
    label: 'Degree',
    section: 'education',
    type: 'select',
    options: [
      { value: 'bachelors', label: "Bachelor's" },
      { value: 'masters', label: "Master's" },
      { value: 'phd', label: 'PhD' },
      { value: 'associate', label: 'Associate' },
    ],
  },
  {
    name: 'major',
    label: 'Major',
    section: 'education',
    type: 'text',
    placeholder: 'Computer Science',
  },
  {
    name: 'graduationYear',
    label: 'Graduation Year',
    section: 'education',
    type: 'text',
    placeholder: '2020',
  },
  {
    name: 'gpa',
    label: 'GPA',
    section: 'education',
    type: 'text',
    placeholder: '3.8',
  },
  {
    name: 'certifications',
    label: 'Certifications',
    section: 'education',
    type: 'textarea',
    placeholder: 'AWS Solutions Architect, ...',
  },
  {
    name: 'skills',
    label: 'Skills',
    section: 'education',
    type: 'textarea',
    placeholder: 'React, TypeScript, ...',
  },
  {
    name: 'publications',
    label: 'Publications',
    section: 'education',
    type: 'textarea',
    placeholder: 'List your publications...',
  },
  {
    name: 'awards',
    label: 'Awards',
    section: 'education',
    type: 'textarea',
    placeholder: "Dean's List, ...",
  },
  {
    name: 'linkedIn',
    label: 'LinkedIn',
    section: 'education',
    type: 'text',
    placeholder: 'https://linkedin.com/in/...',
  },

  // Preferences
  {
    name: 'newsletter',
    label: 'Subscribe to newsletter',
    section: 'preferences',
    type: 'checkbox',
  },
  {
    name: 'notifications',
    label: 'Enable notifications',
    section: 'preferences',
    type: 'checkbox',
  },
  {
    name: 'theme',
    label: 'Theme',
    section: 'preferences',
    type: 'select',
    options: [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
      { value: 'system', label: 'System' },
    ],
  },
  {
    name: 'timezone',
    label: 'Timezone',
    section: 'preferences',
    type: 'select',
    options: [
      { value: 'utc', label: 'UTC' },
      { value: 'est', label: 'Eastern (EST)' },
      { value: 'cst', label: 'Central (CST)' },
      { value: 'mst', label: 'Mountain (MST)' },
      { value: 'pst', label: 'Pacific (PST)' },
    ],
  },
  {
    name: 'currency',
    label: 'Currency',
    section: 'preferences',
    type: 'select',
    options: [
      { value: 'usd', label: 'USD ($)' },
      { value: 'eur', label: 'EUR (\u20AC)' },
      { value: 'gbp', label: 'GBP (\u00A3)' },
      { value: 'jpy', label: 'JPY (\u00A5)' },
    ],
  },
  {
    name: 'bio',
    label: 'Bio',
    section: 'preferences',
    type: 'textarea',
    placeholder: 'Tell us about yourself...',
  },
  {
    name: 'website',
    label: 'Website',
    section: 'preferences',
    type: 'text',
    placeholder: 'https://example.com',
  },
  {
    name: 'twitter',
    label: 'Twitter',
    section: 'preferences',
    type: 'text',
    placeholder: '@handle',
  },
  {
    name: 'github',
    label: 'GitHub',
    section: 'preferences',
    type: 'text',
    placeholder: 'username',
  },
  {
    name: 'notes',
    label: 'Notes',
    section: 'preferences',
    type: 'textarea',
    placeholder: 'Any additional notes...',
  },
]

export const DEFAULT_VALUES = Object.fromEntries(
  fields.map((f) => [f.name, f.type === 'checkbox' ? false : ''])
) as FormValues

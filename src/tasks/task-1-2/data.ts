import { en, Faker } from '@faker-js/faker'

import type { SalesRep, Transaction } from './types'

const faker = new Faker({ locale: [en] })
faker.seed(1002)

const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Food',
  'Furniture',
  'Books',
  'Sports',
  'Toys',
  'Health',
]

export const REGIONS = ['North', 'South', 'East', 'West', 'Central']

function generateTransactions(count: number): Transaction[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    amount: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
    quantity: faker.number.int({ min: 1, max: 20 }),
    date: faker.date
      .between({ from: '2023-01-01', to: '2024-12-31' })
      .toISOString(),
    category: faker.helpers.arrayElement(CATEGORIES),
    region: faker.helpers.arrayElement(REGIONS),
  }))
}

export const salesReps: SalesRep[] = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  region: faker.helpers.arrayElement(REGIONS),
  avatar: `https://picsum.photos/seed/rep-${i + 1}/32/32`,
  gender: faker.person.sex(),
  age: faker.number.int({ min: 22, max: 65 }),
  married: faker.datatype.boolean(),
  transactions: generateTransactions(faker.number.int({ min: 50, max: 200 })),
}))

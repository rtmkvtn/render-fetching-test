import { en, Faker } from '@faker-js/faker'
import { format } from 'date-fns'

import type { Item } from '@/mocks/data/generators'

const faker = new Faker({ locale: [en] })
faker.seed(1001)

export type ListItem = Item & { formattedDate: string }

export const items: ListItem[] = Array.from({ length: 10_000 }, (_, i) => {
  const createdAt = faker.date.past().toISOString()
  return {
    id: i + 1,
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    avatar: `https://picsum.photos/seed/${i + 1}/40/40`,
    createdAt,
    formattedDate: format(new Date(createdAt), 'MMM d, yyyy'),
  }
})

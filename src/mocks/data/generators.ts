import { faker } from '@faker-js/faker'

faker.seed(42)

// --- Types ---

export type Item = {
  id: number
  name: string
  description: string
  avatar: string
  createdAt: string
}

export type User = {
  id: number
  name: string
  email: string
  avatar: string
}

export type Order = {
  id: number
  status: string
  total: number
  createdAt: string
}

export type OrderLineItem = {
  id: number
  productName: string
  quantity: number
  price: number
}

export type OrderDetail = {
  id: number
  status: string
  total: number
  createdAt: string
  items: OrderLineItem[]
}

export type Brand = {
  id: number
  name: string
}

export type Product = {
  id: number
  name: string
  price: number
  brandId: number
  image: string
}

export type LoyaltyInfo = {
  points: number
  tier: string
  discount: number
}

// --- Data ---

export const ITEMS_DATA: Item[] = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  avatar: `https://picsum.photos/seed/${i + 1}/40/40`,
  createdAt: faker.date.past().toISOString(),
}))

export const CURRENT_USER: User = {
  id: 1,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  avatar: `https://picsum.photos/seed/user/40/40`,
}

const orderCount = faker.number.int({ min: 5, max: 10 })

export const USER_ORDERS: Order[] = Array.from(
  { length: orderCount },
  (_, i) => ({
    id: i + 1,
    status: faker.helpers.arrayElement([
      'pending',
      'processing',
      'shipped',
      'delivered',
    ]),
    total: parseFloat(faker.commerce.price({ min: 20, max: 500 })),
    createdAt: faker.date.past().toISOString(),
  })
)

export const ORDER_DETAILS: Map<number, OrderDetail> = new Map(
  USER_ORDERS.map((order) => {
    const lineItemCount = faker.number.int({ min: 1, max: 5 })
    const items: OrderLineItem[] = Array.from(
      { length: lineItemCount },
      (_, j) => ({
        id: j + 1,
        productName: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 5 }),
        price: parseFloat(faker.commerce.price({ min: 5, max: 100 })),
      })
    )
    return [
      order.id,
      {
        id: order.id,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt,
        items,
      },
    ]
  })
)

export const BRANDS: Brand[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: faker.company.name(),
}))

export const PRODUCTS_DATA: Product[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price({ min: 10, max: 200 })),
  brandId: faker.helpers.arrayElement(BRANDS).id,
  image: `https://picsum.photos/seed/product-${i + 1}/200/200`,
}))

// --- Functions ---

const TIERS = ['bronze', 'silver', 'gold', 'platinum'] as const

export function getLoyaltyForBrand(brandId: number): LoyaltyInfo {
  const points = ((brandId * 137 + 42) % 1000) + 100
  const tierIndex = brandId % TIERS.length
  const discount = (tierIndex + 1) * 5
  return {
    points,
    tier: TIERS[tierIndex],
    discount,
  }
}

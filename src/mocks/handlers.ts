import { itemsHandlers } from '@/mocks/handlers/items'
import { productsHandlers } from '@/mocks/handlers/products'
import { userHandlers } from '@/mocks/handlers/user'

export const handlers = [...itemsHandlers, ...userHandlers, ...productsHandlers]

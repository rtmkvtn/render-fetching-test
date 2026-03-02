export interface Transaction {
  id: number
  amount: number
  quantity: number
  date: string
  category: string
  region: string
}

export interface SalesRep {
  id: number
  name: string
  region: string
  avatar: string
  gender: string
  age: number
  married: boolean
  transactions: Transaction[]
}

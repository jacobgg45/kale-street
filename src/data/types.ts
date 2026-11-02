export type Flavor = 'green' | 'citrus' | 'beet' | 'ginger'

export interface Product {
  id: string
  name: string
  kind: 'juice' | 'shot'
  ingredients: string[]
  /** Farm ids from farms.ts */
  farmIds: string[]
  sizeOz: number
  price: number
  flavor: Flavor
}

export interface Market {
  id: string
  name: string
  city: string
  day: string
  hours: string
}

export interface Farm {
  id: string
  name: string
  city: string
  grows: string[]
}

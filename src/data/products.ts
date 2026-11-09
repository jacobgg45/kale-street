// MOCK DATA: menu from the PRD. Two juices and one shot are placeholders.
import type { Product } from './types'

export const products: Product[] = [
  {
    id: 'green',
    name: 'Green',
    kind: 'juice',
    ingredients: ['Celery', 'Cucumber', 'Apple', 'Lemon', 'Ginger'],
    farmIds: ['sunrise', 'orchard', 'canyon', 'redroot'],
    sizeOz: 16,
    price: 12,
    flavor: 'green',
  },
  {
    id: 'citrus',
    name: 'Citrus',
    kind: 'juice',
    ingredients: ['Orange', 'Carrot', 'Lemon', 'Turmeric'],
    farmIds: ['canyon', 'redroot'],
    sizeOz: 16,
    price: 12,
    flavor: 'citrus',
  },
  {
    id: 'beet',
    name: 'Beet',
    kind: 'juice',
    ingredients: ['Beet', 'Apple', 'Lemon', 'Ginger', '24k gold'],
    farmIds: ['redroot', 'orchard', 'canyon'],
    sizeOz: 16,
    price: 12,
    flavor: 'beet',
  },
  {
    id: 'garden-mint', // placeholder
    name: 'Garden Mint',
    kind: 'juice',
    ingredients: ['Kale', 'Spinach', 'Pineapple', 'Mint', 'Lemon'],
    farmIds: ['sunrise', 'orchard', 'canyon'],
    sizeOz: 16,
    price: 12,
    flavor: 'green',
  },
  {
    id: 'sunset', // placeholder
    name: 'Sunset',
    kind: 'juice',
    ingredients: ['Grapefruit', 'Carrot', 'Apple', 'Ginger'],
    farmIds: ['canyon', 'redroot', 'orchard'],
    sizeOz: 16,
    price: 12,
    flavor: 'citrus',
  },
  {
    id: 'ginger-shot',
    name: 'Ginger Shot',
    kind: 'shot',
    ingredients: ['Ginger', 'Lemon'],
    farmIds: ['redroot', 'canyon'],
    sizeOz: 2,
    price: 5,
    flavor: 'ginger',
  },
  {
    id: 'citrus-shot', // placeholder
    name: 'Citrus Ginger Shot',
    kind: 'shot',
    ingredients: ['Ginger', 'Orange', 'Lemon'],
    farmIds: ['redroot', 'canyon'],
    sizeOz: 2,
    price: 5,
    flavor: 'citrus',
  },
]

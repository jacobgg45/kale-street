// MOCK DATA: placeholder market schedule. Confirm real markets and hours before launch.
import type { Market } from './types'

export const markets: Market[] = [
  { id: 'irvine', name: 'Irvine Saturday Farmers Market', city: 'Irvine', day: 'Saturday', hours: '8 AM – 12 PM' },
  { id: 'costa-mesa', name: 'Costa Mesa Saturday Market', city: 'Costa Mesa', day: 'Saturday', hours: '9 AM – 1 PM' },
  { id: 'laguna', name: 'Laguna Beach Sunday Market', city: 'Laguna Beach', day: 'Sunday', hours: '8 AM – 12 PM' },
]

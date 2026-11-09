// MOCK DATA: placeholder market schedule. Confirm real markets and hours before launch.
import type { Market } from './types'

export const markets: Market[] = [
  { id: 'costa-mesa', name: 'Costa Mesa Wednesday Market', city: 'Costa Mesa', day: 'Wednesday', hours: '9 AM – 1 PM' },
  { id: 'irvine', name: 'Irvine Saturday Farmers Market', city: 'Irvine', day: 'Saturday', hours: '8 AM – 12 PM' },
  { id: 'laguna', name: 'Laguna Beach Sunday Market', city: 'Laguna Beach', day: 'Sunday', hours: '8 AM – 12 PM' },
]

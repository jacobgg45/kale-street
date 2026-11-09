import { BUNDLE_BOTTLE_PRICE, BUNDLE_MIN_BOTTLES } from '../config'
import type { Product } from '../data'

export interface PricedLine {
  product: Product
  count: number
}

export interface Totals {
  /** Full menu price of everything, before the bundle discount */
  subtotal: number
  /** Glass bottles (juices); shots don't count toward bundles */
  bottles: number
  discount: number
  total: number
}

/** Plain name/count/price rows for OrderSummary and saved orders. */
export const summaryLines = (lines: PricedLine[]) =>
  lines.map((l) => ({ name: l.product.name, count: l.count, price: l.product.price }))

export function priceLines(lines: PricedLine[]): Totals {
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.count, 0)
  const juices = lines.filter((l) => l.product.kind === 'juice')
  const bottles = juices.reduce((sum, l) => sum + l.count, 0)
  const discount =
    bottles >= BUNDLE_MIN_BOTTLES
      ? juices.reduce((sum, l) => sum + Math.max(0, l.product.price - BUNDLE_BOTTLE_PRICE) * l.count, 0)
      : 0
  return { subtotal, bottles, discount, total: subtotal - discount }
}

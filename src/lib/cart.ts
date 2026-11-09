import { createContext, useContext } from 'react'
import type { Product } from '../data'

export interface CartLine {
  product: Product
  count: number
}

export interface CartState {
  lines: CartLine[]
  /** Total number of items (bottles + shots) */
  count: number
  subtotal: number
  /** Glass bottles in the cart (juices, not shots) */
  bottles: number
  /** Bundle savings (4+ juices at the bundle price) */
  discount: number
  total: number
  add: (id: string) => void
  setCount: (id: string, count: number) => void
  clear: () => void
}

export const CartContext = createContext<CartState | null>(null)

export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) throw new Error('useCart must be used inside CartProvider')
  return cart
}

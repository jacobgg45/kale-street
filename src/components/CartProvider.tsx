import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { BOTTLE_DEPOSIT } from '../config'
import { products } from '../data'
import { CartContext, type CartState } from '../lib/cart'

const STORAGE_KEY = 'kale-street-cart'
const MAX_PER_ITEM = 12

function loadCart(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [counts, setCounts] = useState<Record<string, number>>(loadCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(counts))
    } catch {
      // Storage blocked: the cart still works for this visit.
    }
  }, [counts])

  const value = useMemo<CartState>(() => {
    const lines = products.filter((p) => (counts[p.id] ?? 0) > 0).map((p) => ({ product: p, count: counts[p.id] }))
    const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.count, 0)
    const bottles = lines.filter((l) => l.product.kind === 'juice').reduce((sum, l) => sum + l.count, 0)
    const deposit = bottles * BOTTLE_DEPOSIT
    const setCount = (id: string, count: number) =>
      setCounts((c) => ({ ...c, [id]: Math.min(MAX_PER_ITEM, Math.max(0, count)) }))

    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.count, 0),
      subtotal,
      bottles,
      deposit,
      total: subtotal + deposit,
      add: (id) => setCount(id, (counts[id] ?? 0) + 1),
      setCount,
      clear: () => setCounts({}),
    }
  }, [counts])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

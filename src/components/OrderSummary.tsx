import { formatPrice } from '../config'
import type { CartLine } from '../lib/cart'

interface Props {
  lines: CartLine[]
  bottles: number
  deposit: number
  total: number
}

export function OrderSummary({ lines, bottles, deposit, total }: Props) {
  return (
    <dl className="space-y-1">
      {lines.map((l) => (
        <div key={l.product.id} className="flex justify-between gap-4">
          <dt>
            {l.count} × {l.product.name}
          </dt>
          <dd>{formatPrice(l.product.price * l.count)}</dd>
        </div>
      ))}
      {deposit > 0 && (
        <div className="flex justify-between gap-4 text-muted">
          <dt>Bottle deposit ({bottles}, refundable)</dt>
          <dd>{formatPrice(deposit)}</dd>
        </div>
      )}
      <div className="mt-2 flex justify-between border-t border-leaf/30 pt-2 text-lg font-extrabold">
        <dt>Total</dt>
        <dd>{formatPrice(total)}</dd>
      </div>
    </dl>
  )
}

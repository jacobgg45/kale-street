import { BUNDLE_BOTTLE_PRICE, BUNDLE_MIN_BOTTLES, formatPrice } from '../config'

interface Props {
  lines: { name: string; count: number; price: number }[]
  bottles: number
  discount: number
  deposit: number
  total: number
  totalLabel?: string
}

export function OrderSummary({ lines, bottles, discount, deposit, total, totalLabel = 'Total' }: Props) {
  return (
    <dl className="space-y-1">
      {lines.map((l) => (
        <div key={l.name} className="flex justify-between gap-4">
          <dt>
            {l.count} × {l.name}
          </dt>
          <dd>{formatPrice(l.price * l.count)}</dd>
        </div>
      ))}
      {discount > 0 && (
        <div className="flex justify-between gap-4 font-semibold text-leaf-dark">
          <dt>
            Bundle: {bottles} juices at {formatPrice(BUNDLE_BOTTLE_PRICE)}
          </dt>
          <dd>−{formatPrice(discount)}</dd>
        </div>
      )}
      {deposit > 0 && (
        <div className="flex justify-between gap-4 text-muted">
          <dt>Bottle deposit ({bottles}, refundable)</dt>
          <dd>{formatPrice(deposit)}</dd>
        </div>
      )}
      <div className="mt-2 flex justify-between border-t border-leaf/30 pt-2 text-lg font-extrabold">
        <dt>{totalLabel}</dt>
        <dd>{formatPrice(total)}</dd>
      </div>
    </dl>
  )
}

/** Nudge shown under the summary when the shopper is close to bundle pricing. */
export function BundleHint({ bottles }: { bottles: number }) {
  const needed = BUNDLE_MIN_BOTTLES - bottles
  if (needed <= 0) return null
  return (
    <p className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-leaf-dark">
      Add {needed} more {needed === 1 ? 'juice' : 'juices'} and every bottle drops to {formatPrice(BUNDLE_BOTTLE_PRICE)} ({BUNDLE_MIN_BOTTLES} for{' '}
      {formatPrice(BUNDLE_MIN_BOTTLES * BUNDLE_BOTTLE_PRICE)}).
    </p>
  )
}

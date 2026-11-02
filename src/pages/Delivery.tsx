import { useState } from 'react'
import { BOTTLE_DEPOSIT, formatPrice } from '../config'
import { products } from '../data'
import { flavorBg } from '../lib/flavor'
import { PageHeading } from '../components/PageHeading'
import { saveLocal } from '../lib/storage'

type Frequency = 'once' | 'weekly'

export default function Delivery() {
  const [qty, setQty] = useState<Record<string, number>>({})
  const [frequency, setFrequency] = useState<Frequency>('weekly')
  const [placed, setPlaced] = useState(false)

  const lines = products.filter((p) => (qty[p.id] ?? 0) > 0).map((p) => ({ product: p, count: qty[p.id] }))
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.count, 0)
  const bottles = lines.filter((l) => l.product.kind === 'juice').reduce((sum, l) => sum + l.count, 0)
  const deposit = bottles * BOTTLE_DEPOSIT

  const change = (id: string, delta: number) =>
    setQty((q) => ({ ...q, [id]: Math.min(12, Math.max(0, (q[id] ?? 0) + delta)) }))

  function handlePlace() {
    saveLocal('kale-street-orders', { lines: lines.map((l) => [l.product.id, l.count]), frequency, at: new Date().toISOString() })
    setPlaced(true)
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center" role="status">
        <h1 className="text-3xl font-extrabold text-leaf-dark">Order request saved</h1>
        <p className="mt-4 text-lg text-muted">
          This is a demo, so nothing was charged or sent. In the real version we'd confirm your delivery day by text.
        </p>
        <button
          type="button"
          onClick={() => {
            setPlaced(false)
            setQty({})
          }}
          className="mt-8 rounded-full bg-leaf px-6 py-3 font-bold text-white hover:bg-leaf-dark"
        >
          Start a new order
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <PageHeading title="Weekly delivery">
        For regulars who can't make it to market. Pick your juices and we'll bring them to your door. Leave your empties
        out and we'll swap them.
      </PageHeading>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <ul className="divide-y divide-mint rounded-2xl border border-mint">
          {products.map((p) => (
            <li key={p.id} className="flex items-center gap-3 p-4">
              <span className={`h-10 w-2 shrink-0 rounded-full ${flavorBg[p.flavor]}`} aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="font-bold">{p.name}</p>
                <p className="text-sm text-muted">
                  {p.sizeOz} oz · {formatPrice(p.price)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => change(p.id, -1)}
                  className="h-10 w-10 rounded-full border-2 border-mint text-xl font-bold hover:border-leaf"
                  aria-label={`Remove one ${p.name}`}
                >
                  −
                </button>
                <span className="w-6 text-center font-bold" aria-live="polite">
                  {qty[p.id] ?? 0}
                </span>
                <button
                  type="button"
                  onClick={() => change(p.id, 1)}
                  className="h-10 w-10 rounded-full bg-leaf text-xl font-bold text-white hover:bg-leaf-dark"
                  aria-label={`Add one ${p.name}`}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl bg-mint p-5 lg:sticky lg:top-24">
          <h2 className="text-xl font-extrabold text-leaf-dark">Your order</h2>

          <fieldset className="mt-4">
            <legend className="font-semibold">How often?</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(['weekly', 'once'] as const).map((f) => (
                <label
                  key={f}
                  className={`cursor-pointer rounded-lg border-2 px-3 py-2 text-center font-semibold ${
                    frequency === f ? 'border-leaf bg-white' : 'border-transparent bg-white/60'
                  }`}
                >
                  <input type="radio" name="frequency" value={f} checked={frequency === f} onChange={() => setFrequency(f)} className="sr-only" />
                  {f === 'weekly' ? 'Every week' : 'One time'}
                </label>
              ))}
            </div>
          </fieldset>

          {lines.length === 0 ? (
            <p className="mt-4 text-muted">Add a juice or shot to get started.</p>
          ) : (
            <dl className="mt-4 space-y-1">
              {lines.map((l) => (
                <div key={l.product.id} className="flex justify-between">
                  <dt>
                    {l.count} × {l.product.name}
                  </dt>
                  <dd>{formatPrice(l.product.price * l.count)}</dd>
                </div>
              ))}
              {deposit > 0 && (
                <div className="flex justify-between text-muted">
                  <dt>Bottle deposit ({bottles}, refundable)</dt>
                  <dd>{formatPrice(deposit)}</dd>
                </div>
              )}
              <div className="mt-2 flex justify-between border-t border-leaf/30 pt-2 text-lg font-extrabold">
                <dt>{frequency === 'weekly' ? 'Each week' : 'Total'}</dt>
                <dd>{formatPrice(subtotal + deposit)}</dd>
              </div>
            </dl>
          )}

          <button
            type="button"
            disabled={lines.length === 0}
            onClick={handlePlace}
            className="mt-5 w-full rounded-full bg-orange px-6 py-3 font-bold text-ink hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Request delivery
          </button>
          <p className="mt-2 text-xs text-muted">Demo only. No payment is taken.</p>
        </aside>
      </div>
    </div>
  )
}

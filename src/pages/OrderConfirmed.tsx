import { Link, Navigate, useLocation } from 'react-router-dom'
import { formatPrice } from '../config'
import { markets } from '../data'

export interface ConfirmedOrder {
  number: string
  name: string
  email: string
  phone: string
  marketId: string
  lines: { name: string; count: number; price: number; kind: 'juice' | 'shot' }[]
  bottles: number
  deposit: number
  total: number
  cardBrand: string
  cardLast4: string
  textList: boolean
}

export default function OrderConfirmed() {
  const order = useLocation().state as ConfirmedOrder | null
  if (!order) return <Navigate to="/menu" replace />

  const market = markets.find((m) => m.id === order.marketId)

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div role="status" className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf text-white" aria-hidden>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold text-leaf-dark">Thanks, {order.name.split(' ')[0]}! You're all set.</h1>
        <p className="mt-2 text-lg text-muted">Order {order.number}</p>
      </div>

      <section className="mt-8 space-y-4 rounded-2xl bg-mint p-5">
        <div>
          <h2 className="font-bold">Pick up</h2>
          <p>
            {market?.name}, {market?.day} {market?.hours}
          </p>
        </div>
        <dl className="space-y-1">
          {order.lines.map((l) => (
            <div key={l.name} className="flex justify-between gap-4">
              <dt>
                {l.count} × {l.name}
              </dt>
              <dd>{formatPrice(l.price * l.count)}</dd>
            </div>
          ))}
          {order.deposit > 0 && (
            <div className="flex justify-between gap-4 text-muted">
              <dt>Bottle deposit ({order.bottles}, refundable)</dt>
              <dd>{formatPrice(order.deposit)}</dd>
            </div>
          )}
          <div className="mt-2 flex justify-between border-t border-leaf/30 pt-2 text-lg font-extrabold">
            <dt>Paid</dt>
            <dd>{formatPrice(order.total)}</dd>
          </div>
        </dl>
        <p className="text-sm text-muted">
          {order.cardBrand} ending in {order.cardLast4} · Receipt to {order.email}
        </p>
        {order.textList && <p className="font-semibold text-leaf-dark">You're on the text list at {order.phone}.</p>}
      </section>

      <p className="mt-4 text-center text-sm text-muted">Demo order: no card was charged and nothing was sent.</p>

      <div className="mt-8 text-center">
        <Link to="/menu" className="inline-block rounded-full bg-leaf px-6 py-3 font-bold text-white hover:bg-leaf-dark">
          Back to the menu
        </Link>
      </div>
    </div>
  )
}

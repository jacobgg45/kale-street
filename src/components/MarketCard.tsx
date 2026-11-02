import type { Market } from '../data'

export function MarketCard({ market }: { market: Market }) {
  return (
    <article className="rounded-2xl border border-mint bg-white p-5 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-wide text-leaf">{market.day}</p>
      <h3 className="mt-1 text-lg font-extrabold">{market.name}</h3>
      <p className="mt-2 text-muted">
        {market.city} · {market.hours}
      </p>
    </article>
  )
}

import { Link } from 'react-router-dom'
import { BOTTLE_RETURN_CREDIT, formatPrice } from '../config'
import { markets, products } from '../data'
import { flavorBg } from '../lib/flavor'
import { MarketCard } from '../components/MarketCard'

const points = [
  { title: 'Never heated', body: 'Cold-pressed and sold raw. No pasteurization, no high-pressure processing.' },
  { title: 'Local farms', body: 'Organic ingredients from farms around Orange County, named on every bottle.' },
  { title: 'Glass, returned', body: `Every bottle is glass. Bring it back for ${formatPrice(BOTTLE_RETURN_CREDIT)} off your next juice, and we reuse it.` },
]

export default function Home() {
  return (
    <>
      <section className="bg-leaf text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Raw juice from Orange County farms, in glass.
          </h1>
          <p className="mt-4 max-w-xl text-lg sm:text-xl">
            Never heated. Pressed fresh for every market. $12 a bottle.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="rounded-full bg-orange px-6 py-3 text-lg font-bold text-ink hover:brightness-95">
              Join the list
            </Link>
            <Link
              to="/menu"
              className="rounded-full border-2 border-white px-6 py-3 text-lg font-bold text-white hover:bg-white hover:text-leaf-dark"
            >
              See the menu
            </Link>
          </div>
          <div className="mt-10 flex gap-2" aria-hidden>
            {products.map((p) => (
              <span key={p.id} className={`h-3 w-10 rounded-full ${flavorBg[p.flavor]}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-14 sm:grid-cols-3">
        {points.map((p) => (
          <div key={p.title}>
            <h2 className="text-xl font-extrabold text-leaf-dark">{p.title}</h2>
            <p className="mt-2 text-muted">{p.body}</p>
          </div>
        ))}
      </section>

      <section className="bg-mint">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-leaf-dark">Find us this week</h2>
            <Link to="/markets" className="font-bold text-leaf-dark underline underline-offset-4">
              All markets
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {markets.map((m) => (
              <MarketCard key={m.id} market={m} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

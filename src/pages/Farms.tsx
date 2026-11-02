import { farms, products } from '../data'
import { PageHeading } from '../components/PageHeading'

export default function Farms() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <PageHeading title="Our farms">
        We buy organic produce from farms around Orange County and name them on every bottle.
      </PageHeading>
      <div className="grid gap-4 sm:grid-cols-2">
        {farms.map((farm) => {
          const usedIn = products.filter((p) => p.farmIds.includes(farm.id)).map((p) => p.name)
          return (
            <article key={farm.id} className="rounded-2xl border border-mint bg-white p-5 shadow-sm">
              <h2 className="text-xl font-extrabold text-leaf-dark">{farm.name}</h2>
              <p className="text-sm font-semibold text-muted">{farm.city}, CA</p>
              <p className="mt-3">
                <span className="font-semibold">Grows:</span> {farm.grows.join(', ')}
              </p>
              <p className="mt-1 text-sm text-muted">
                <span className="font-semibold">In:</span> {usedIn.join(', ')}
              </p>
            </article>
          )
        })}
      </div>
    </div>
  )
}

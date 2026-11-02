import { BOTTLE_DEPOSIT, formatPrice } from '../config'
import { products } from '../data'
import { FdaWarning } from '../components/FdaWarning'
import { PageHeading } from '../components/PageHeading'
import { ProductCard } from '../components/ProductCard'

export default function Menu() {
  const juices = products.filter((p) => p.kind === 'juice')
  const shots = products.filter((p) => p.kind === 'shot')

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <PageHeading title="Menu">
        Five juices and two shots, cold-pressed the day before market. Juices come in 16 oz glass with a{' '}
        {formatPrice(BOTTLE_DEPOSIT)} refundable bottle deposit.
      </PageHeading>

      <FdaWarning className="mb-10" />

      <h2 className="mb-4 text-2xl font-extrabold">Juices</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {juices.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <h2 className="mb-4 mt-12 text-2xl font-extrabold">Shots</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shots.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}

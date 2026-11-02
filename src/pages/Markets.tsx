import { Link } from 'react-router-dom'
import { markets } from '../data'
import { MarketCard } from '../components/MarketCard'
import { PageHeading } from '../components/PageHeading'

export default function Markets() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <PageHeading title="Markets">
        Come say hi, try a sample, and bring back your empties. We sell out, so come early.
      </PageHeading>
      <div className="grid gap-4 sm:grid-cols-3">
        {markets.map((m) => (
          <MarketCard key={m.id} market={m} />
        ))}
      </div>
      <p className="mt-10 text-muted">
        Want a heads-up before each market?{' '}
        <Link to="/signup" className="font-bold text-leaf-dark underline underline-offset-4">
          Join the list
        </Link>
        .
      </p>
    </div>
  )
}

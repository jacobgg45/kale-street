import { formatPrice } from '../config'
import { farmById, type Product } from '../data'
import { flavorBg } from '../lib/flavor'

export function ProductCard({ product }: { product: Product }) {
  const farms = product.farmIds.map((id) => farmById(id)?.name).filter(Boolean)

  return (
    <article className="overflow-hidden rounded-2xl border border-mint bg-white shadow-sm">
      <div className={`h-3 ${flavorBg[product.flavor]}`} aria-hidden />
      <div className="space-y-3 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-xl font-extrabold text-leaf-dark">{product.name}</h3>
          <p className="whitespace-nowrap font-bold">
            {formatPrice(product.price)} <span className="font-semibold text-muted">· {product.sizeOz} oz</span>
          </p>
        </div>
        <p>{product.ingredients.join(', ')}</p>
        <p className="text-sm text-muted">
          <span className="font-semibold">From:</span> {farms.join(', ')}
        </p>
      </div>
    </article>
  )
}

import { Link } from 'react-router-dom'
import { formatPrice } from '../config'
import { farmById, type Product } from '../data'
import { useCart } from '../lib/cart'
import { flavorBg } from '../lib/flavor'

export function ProductCard({ product }: { product: Product }) {
  const farms = product.farmIds.map((id) => farmById(id)?.name).filter(Boolean)
  const cart = useCart()
  const inCart = cart.lines.find((l) => l.product.id === product.id)?.count ?? 0

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
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => cart.add(product.id)}
            className="rounded-full bg-leaf px-5 py-2.5 font-bold text-white hover:bg-leaf-dark"
          >
            Add to cart
          </button>
          {inCart > 0 && (
            <Link to="/cart" className="font-semibold text-leaf-dark underline underline-offset-4" aria-live="polite">
              {inCart} in cart
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

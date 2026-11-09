import { Link } from 'react-router-dom'
import { formatPrice } from '../config'
import { useCart } from '../lib/cart'
import { flavorBg } from '../lib/flavor'
import { summaryLines } from '../lib/pricing'
import { BundleHint, OrderSummary } from '../components/OrderSummary'
import { PageHeading } from '../components/PageHeading'

export default function Cart() {
  const cart = useCart()

  if (cart.lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-3xl font-extrabold text-leaf-dark">Your cart is empty</h1>
        <p className="mt-3 text-lg text-muted">Pick a juice or two from the menu.</p>
        <Link to="/menu" className="mt-8 inline-block rounded-full bg-leaf px-6 py-3 font-bold text-white hover:bg-leaf-dark">
          See the menu
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <PageHeading title="Your cart">Order now, pick up at your next market.</PageHeading>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <ul className="divide-y divide-mint rounded-2xl border border-mint">
          {cart.lines.map(({ product: p, count }) => (
            <li key={p.id} className="flex items-center gap-3 p-4">
              <span className={`h-10 w-2 shrink-0 rounded-full ${flavorBg[p.flavor]}`} aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="font-bold">{p.name}</p>
                <p className="text-sm text-muted">
                  {p.sizeOz} oz · {formatPrice(p.price)}
                </p>
                <button
                  type="button"
                  onClick={() => cart.setCount(p.id, 0)}
                  className="mt-1 text-sm font-semibold text-muted underline underline-offset-2 hover:text-ink"
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => cart.setCount(p.id, count - 1)}
                  className="h-10 w-10 rounded-full border-2 border-mint text-xl font-bold hover:border-leaf"
                  aria-label={`Remove one ${p.name}`}
                >
                  −
                </button>
                <span className="w-6 text-center font-bold" aria-live="polite">
                  {count}
                </span>
                <button
                  type="button"
                  onClick={() => cart.setCount(p.id, count + 1)}
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
          <h2 className="mb-4 text-xl font-extrabold text-leaf-dark">Summary</h2>
          <OrderSummary
            lines={summaryLines(cart.lines)}
            bottles={cart.bottles}
            discount={cart.discount}
            deposit={cart.deposit}
            total={cart.total}
          />
          <div className="mt-4">
            <BundleHint bottles={cart.bottles} />
          </div>
          <Link
            to="/checkout"
            className="mt-5 block rounded-full bg-orange px-6 py-3 text-center text-lg font-bold text-ink hover:brightness-95"
          >
            Checkout
          </Link>
          <Link to="/menu" className="mt-3 block text-center font-semibold text-leaf-dark underline underline-offset-4">
            Keep shopping
          </Link>
        </aside>
      </div>
    </div>
  )
}

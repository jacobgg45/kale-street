import { useState, type FormEvent, type ReactNode } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { BOTTLE_RETURN_CREDIT, formatPrice } from '../config'
import { markets } from '../data'
import { useCart } from '../lib/cart'
import {
  TEST_CARD,
  cardBrand,
  digitsOnly,
  formatCardNumber,
  formatExpiry,
  isValidCardNumber,
  isValidCvc,
  isValidExpiry,
} from '../lib/card'
import { summaryLines } from '../lib/pricing'
import { saveLocal } from '../lib/storage'
import { OrderSummary } from '../components/OrderSummary'
import { PageHeading } from '../components/PageHeading'
import type { ConfirmedOrder } from './OrderConfirmed'

const inputClass =
  'mt-1 block w-full rounded-lg border-2 bg-white px-3 py-3 text-base text-ink focus:border-leaf focus:outline-none'

type Field = 'name' | 'email' | 'phone' | 'card' | 'expiry' | 'cvc' | 'zip'

function Input({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: (className: string) => ReactNode
}) {
  return (
    <label className="block font-semibold">
      {label}
      {children(`${inputClass} ${error ? 'border-beet' : 'border-mint'}`)}
      {error && <span className="mt-1 block text-sm font-semibold text-beet">{error}</span>}
    </label>
  )
}

export default function Checkout() {
  const cart = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    market: markets[0].id,
    card: '',
    expiry: '',
    cvc: '',
    zip: '',
  })
  const [textList, setTextList] = useState(true)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [processing, setProcessing] = useState(false)

  if (cart.lines.length === 0 && !processing) return <Navigate to="/cart" replace />

  const set = (key: keyof typeof form) => (value: string) => setForm((f) => ({ ...f, [key]: value }))

  function validate() {
    const e: Partial<Record<Field, string>> = {}
    if (!form.name.trim()) e.name = 'Add your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Add a valid email for your receipt.'
    const phoneDigits = digitsOnly(form.phone)
    if (textList && phoneDigits.length < 10) e.phone = 'Add a 10-digit phone number to get texts.'
    else if (phoneDigits.length > 0 && phoneDigits.length < 10) e.phone = 'Phone number looks too short.'
    if (!isValidCardNumber(form.card)) e.card = 'Card number is not valid.'
    if (!isValidExpiry(form.expiry)) e.expiry = 'Use MM/YY, not expired.'
    if (!isValidCvc(form.cvc, form.card)) e.cvc = cardBrand(form.card) === 'Amex' ? '4 digits.' : '3 digits.'
    if (!/^\d{5}$/.test(form.zip)) e.zip = '5-digit ZIP.'
    return e
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setProcessing(true)
    // Simulated payment. The card number never leaves this page and is never saved.
    const order: ConfirmedOrder = {
      number: `KS-${Math.floor(100000 + Math.random() * 900000)}`,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      marketId: form.market,
      lines: summaryLines(cart.lines),
      bottles: cart.bottles,
      discount: cart.discount,
      total: cart.total,
      cardBrand: cardBrand(form.card),
      cardLast4: digitsOnly(form.card).slice(-4),
      textList,
    }
    setTimeout(() => {
      saveLocal('kale-street-orders', { ...order, at: new Date().toISOString() })
      if (textList) {
        saveLocal('kale-street-signups', { name: order.name, contact: order.phone, market: order.marketId, at: new Date().toISOString() })
      }
      cart.clear()
      navigate('/order-confirmed', { replace: true, state: order })
    }, 1200)
  }

  const fillTestCard = () => {
    setForm((f) => ({ ...f, card: TEST_CARD.number, expiry: TEST_CARD.expiry, cvc: TEST_CARD.cvc, zip: TEST_CARD.zip }))
    setErrors((e) => ({ ...e, card: undefined, expiry: undefined, cvc: undefined, zip: undefined }))
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <PageHeading title="Checkout">Pay now, pick up at the market. Bring your empties back for{' '}
        {formatPrice(BOTTLE_RETURN_CREDIT)} off each juice next time.</PageHeading>

      <div className="mb-8 rounded-xl border-2 border-orange bg-orange/15 p-4">
        <p className="font-bold">Demo checkout: no real charges.</p>
        <p className="mt-1">
          Do not enter a real card. Use test card <span className="font-mono font-semibold">4242 4242 4242 4242</span>, any
          future date and any 3-digit CVC.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <fieldset className="space-y-4">
            <legend className="mb-2 text-xl font-extrabold text-leaf-dark">Your info</legend>
            <Input label="Name" error={errors.name}>
              {(c) => <input className={c} value={form.name} onChange={(e) => set('name')(e.target.value)} autoComplete="name" />}
            </Input>
            <Input label="Email" error={errors.email}>
              {(c) => (
                <input
                  className={c}
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email')(e.target.value)}
                  autoComplete="email"
                />
              )}
            </Input>
            <Input label={textList ? 'Phone' : 'Phone (optional)'} error={errors.phone}>
              {(c) => (
                <input
                  className={c}
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set('phone')(e.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                />
              )}
            </Input>
            <label className="block font-semibold">
              Pickup market
              <select className={`${inputClass} border-mint`} value={form.market} onChange={(e) => set('market')(e.target.value)}>
                {markets.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.day}, {m.hours})
                  </option>
                ))}
              </select>
            </label>
          </fieldset>

          <fieldset className="space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <legend className="text-xl font-extrabold text-leaf-dark">Payment</legend>
              <button type="button" onClick={fillTestCard} className="font-semibold text-leaf-dark underline underline-offset-4">
                Use test card
              </button>
            </div>
            <Input label="Card number" error={errors.card}>
              {(c) => (
                <input
                  className={`${c} font-mono tracking-wide`}
                  value={form.card}
                  onChange={(e) => set('card')(formatCardNumber(e.target.value))}
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="4242 4242 4242 4242"
                />
              )}
            </Input>
            <div className="grid grid-cols-3 gap-3">
              <Input label="Expiry" error={errors.expiry}>
                {(c) => (
                  <input
                    className={c}
                    value={form.expiry}
                    onChange={(e) => set('expiry')(formatExpiry(e.target.value))}
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="MM/YY"
                  />
                )}
              </Input>
              <Input label="CVC" error={errors.cvc}>
                {(c) => (
                  <input
                    className={c}
                    value={form.cvc}
                    onChange={(e) => set('cvc')(digitsOnly(e.target.value).slice(0, 4))}
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="123"
                  />
                )}
              </Input>
              <Input label="ZIP" error={errors.zip}>
                {(c) => (
                  <input
                    className={c}
                    value={form.zip}
                    onChange={(e) => set('zip')(digitsOnly(e.target.value).slice(0, 5))}
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="92618"
                  />
                )}
              </Input>
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-mint p-4">
            <input
              type="checkbox"
              checked={textList}
              onChange={(e) => setTextList(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-leaf"
            />
            <span>
              <span className="block font-bold">Text me before each market</span>
              <span className="text-sm text-muted">The weekly menu and a heads-up when we're at your market. About one text a week. Reply STOP anytime.</span>
            </span>
          </label>
        </div>

        <aside className="h-fit space-y-5 rounded-2xl bg-mint p-5 lg:sticky lg:top-24">
          <h2 className="text-xl font-extrabold text-leaf-dark">Order summary</h2>
          <OrderSummary
            lines={summaryLines(cart.lines)}
            bottles={cart.bottles}
            discount={cart.discount}
            total={cart.total}
          />
          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-full bg-orange px-6 py-3 text-lg font-bold text-ink hover:brightness-95 disabled:cursor-wait disabled:opacity-60"
          >
            {processing ? 'Processing…' : 'Purchase'}
          </button>
          {Object.values(errors).some(Boolean) && (
            <p role="alert" className="text-sm font-semibold text-beet">
              Please fix the highlighted fields.
            </p>
          )}
        </aside>
      </form>
    </div>
  )
}

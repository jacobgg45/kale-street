import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { markets } from '../data'
import { PageHeading } from '../components/PageHeading'
import { saveLocal } from '../lib/storage'

const inputClass =
  'mt-1 block w-full rounded-lg border-2 border-mint bg-white px-3 py-3 text-base text-ink focus:border-leaf focus:outline-none'

export default function Signup() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [market, setMarket] = useState(markets[0].id)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const value = contact.trim()
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    const isPhone = value.replace(/\D/g, '').length >= 10
    if (!name.trim()) return setError('Please add your name.')
    if (!isEmail && !isPhone) return setError('Please add a valid email or a 10-digit phone number.')
    setError('')
    saveLocal('kale-street-signups', { name: name.trim(), contact: value, market, at: new Date().toISOString() })
    setDone(true)
  }

  const marketName = markets.find((m) => m.id === market)?.name

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center" role="status">
        <h1 className="text-3xl font-extrabold text-leaf-dark">You're on the list, {name.trim().split(' ')[0]}!</h1>
        <p className="mt-4 text-lg text-muted">
          We'll send a note before each market at {marketName}. See you there.
        </p>
        <Link to="/menu" className="mt-8 inline-block rounded-full bg-leaf px-6 py-3 font-bold text-white hover:bg-leaf-dark">
          Browse the menu
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <PageHeading title="Join the list">
        Get the weekly menu and a heads-up before each market. One message a week, no spam.
      </PageHeading>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <label className="block font-semibold">
          Name
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
        <label className="block font-semibold">
          Email or phone
          <input
            className={inputClass}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            autoComplete="email"
            inputMode="email"
          />
        </label>
        <label className="block font-semibold">
          Your market
          <select className={inputClass} value={market} onChange={(e) => setMarket(e.target.value)}>
            {markets.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.day})
              </option>
            ))}
          </select>
        </label>

        {error && (
          <p role="alert" className="font-semibold text-beet">
            {error}
          </p>
        )}

        <button type="submit" className="w-full rounded-full bg-orange px-6 py-3 text-lg font-bold text-ink hover:brightness-95">
          Join the list
        </button>
        <p className="text-sm text-muted">Demo only: your info stays in this browser and isn't sent anywhere.</p>
      </form>
    </div>
  )
}

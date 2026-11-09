import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BRAND_NAME } from '../config'
import { useCart } from '../lib/cart'

function CartLink({ onClick }: { onClick?: () => void }) {
  const { count } = useCart()
  return (
    <Link
      to="/cart"
      onClick={onClick}
      className="relative rounded-md p-2 text-ink hover:bg-mint"
      aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M6 7h12l-1.2 11.1a2 2 0 0 1-2 1.9H9.2a2 2 0 0 1-2-1.9L6 7z" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-beet px-1 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  )
}

const links = [
  { to: '/menu', label: 'Menu' },
  { to: '/markets', label: 'Markets' },
  { to: '/farms', label: 'Farms' },
  { to: '/delivery', label: 'Delivery' },
  { to: '/story', label: 'Our story' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-md px-3 py-2 font-semibold ${isActive ? 'bg-mint text-leaf-dark' : 'text-ink hover:bg-mint'}`

  return (
    <header className="sticky top-0 z-20 border-b border-mint bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={`${import.meta.env.BASE_URL}seal.svg`} alt="" className="h-11 w-11" />
          <span className="text-xl font-extrabold text-leaf">{BRAND_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/signup" className="ml-2 rounded-full bg-orange px-4 py-2 font-bold text-ink hover:brightness-95">
            Join the list
          </Link>
          <CartLink />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <CartLink onClick={() => setOpen(false)} />
          <button
            type="button"
            className="rounded-md p-2 text-ink"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-mint px-4 pb-4 md:hidden" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/signup"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-orange px-4 py-3 text-center font-bold text-ink"
          >
            Join the list
          </Link>
        </nav>
      )}
    </header>
  )
}

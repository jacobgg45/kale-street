import { Link } from 'react-router-dom'
import { BRAND_NAME } from '../config'
import { FdaWarning } from './FdaWarning'

export function Footer() {
  return (
    <footer className="mt-16 bg-mint">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
        <FdaWarning />
        <div className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-bold text-leaf-dark">{BRAND_NAME}</span> · Raw, cold-pressed, Orange County
          </p>
          <nav className="flex flex-wrap gap-4 font-semibold" aria-label="Footer">
            <Link to="/menu" className="hover:text-ink">Menu</Link>
            <Link to="/markets" className="hover:text-ink">Markets</Link>
            <Link to="/signup" className="hover:text-ink">Join the list</Link>
          </nav>
        </div>
        <p className="text-xs text-muted">Demo site with sample data. No orders or payments are processed.</p>
      </div>
    </footer>
  )
}

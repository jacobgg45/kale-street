import { FDA_WARNING } from '../config'

export function FdaWarning({ className = '' }: { className?: string }) {
  return (
    <p role="note" className={`rounded-lg border-2 border-ink bg-white p-4 text-sm font-semibold leading-snug text-ink ${className}`}>
      {FDA_WARNING}
    </p>
  )
}

import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-3xl font-extrabold text-leaf-dark">Page not found</h1>
      <Link to="/" className="mt-6 inline-block font-bold text-leaf-dark underline underline-offset-4">
        Back home
      </Link>
    </div>
  )
}

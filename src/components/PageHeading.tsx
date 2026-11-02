import type { ReactNode } from 'react'

export function PageHeading({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mb-8 space-y-2">
      <h1 className="text-3xl font-extrabold text-leaf-dark sm:text-4xl">{title}</h1>
      {children && <p className="max-w-2xl text-lg text-muted">{children}</p>}
    </div>
  )
}

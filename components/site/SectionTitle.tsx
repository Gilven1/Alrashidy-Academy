import type { ReactNode } from 'react'

export default function SectionTitle({ children, as: Tag = 'h2' }: { children: ReactNode; as?: 'h1' | 'h2' }) {
  return (
    <div className="reveal mb-12 flex items-center gap-6">
      <Tag className="font-display text-4xl font-semibold sm:text-6xl">{children}</Tag>
      <span aria-hidden className="relative hidden h-px flex-1 bg-ash sm:block"><span className="absolute inset-y-0 start-0 w-24 bg-blood" /></span>
    </div>
  )
}

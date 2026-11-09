import type { ReactNode } from 'react'
import { fontVars } from '@/lib/fonts'
import { LangProvider } from '@/components/admin/lang'
import '../globals.css'

export const metadata = { title: 'Dashboard', robots: { index: false, follow: false } }

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body><LangProvider>{children}</LangProvider></body>
    </html>
  )
}

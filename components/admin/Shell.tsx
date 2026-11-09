'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo, type ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLang, type Lbl } from './lang'

const nav: [string, Lbl][] = [
  ['/admin', ['Home page', 'الرئيسية']], ['/admin/coaches', ['Coaches', 'المدربون']], ['/admin/heroes', ['Heroes', 'الأبطال']],
  ['/admin/branches', ['Branches', 'الفروع']], ['/admin/messages', ['Messages', 'الرسائل']],
]

export default function Shell({ children }: { children: ReactNode }) {
  const { tr, lang, setLang } = useLang()
  const path = usePathname()
  const router = useRouter()
  const sb = useMemo(() => createClient(), [])
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      <header className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-ash py-3">
        <span className="font-display text-xl text-blood">{tr(['Dashboard', 'لوحة التحكم'])}</span>
        <nav className="flex flex-wrap gap-4">
          {nav.map(([href, l]) => <Link key={href} href={href} className={path === href ? 'border-b-2 border-blood' : 'hover:text-blood'}>{tr(l)}</Link>)}
        </nav>
        <div className="ms-auto flex items-center gap-3 text-sm">
          <Link href="/" target="_blank" className="hover:text-blood">{tr(['View site', 'عرض الموقع'])}</Link>
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="border border-ash px-3 py-1 hover:border-blood">{lang === 'en' ? 'العربية' : 'English'}</button>
          <button onClick={async () => { await sb.auth.signOut(); router.push('/admin/login') }} className="hover:text-blood">{tr(['Log out', 'تسجيل الخروج'])}</button>
        </div>
      </header>
      {children}
    </div>
  )
}

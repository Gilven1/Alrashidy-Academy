/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { t, ui, type Locale } from '@/lib/i18n'
import type { Settings } from '@/lib/types'
import LangSwitch from './LangSwitch'

export default function Header({ locale, s }: { locale: Locale; s: Settings }) {
  const L = ui[locale]
  const links: [string, string, string][] = [
    [L.home, `/${locale}`, 'hidden sm:block'], [L.coaches, `/${locale}/coaches`, ''], [L.heroes, `/${locale}/heroes`, ''], [L.contact, `/${locale}#contact`, ''],
  ]
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <img src={s.logo_url || '/logo.jpg'} alt="" className="h-9 w-9 object-contain" />
          <span className="hidden font-display text-xl font-semibold sm:inline">{t(s, 'academy_name', locale)}</span>
        </Link>
        <nav className="ms-auto flex items-center gap-4 text-sm sm:gap-7">
          {links.map(([label, href, cls]) => <Link key={href} href={href} className={`link ${cls}`}>{label}</Link>)}
          <LangSwitch locale={locale} />
        </nav>
      </div>
    </header>
  )
}

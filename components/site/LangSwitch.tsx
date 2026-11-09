'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'

export default function LangSwitch({ locale }: { locale: Locale }) {
  const path = usePathname() || `/${locale}`
  const other = locale === 'en' ? 'ar' : 'en'
  return (
    <Link href={path.replace(/^\/(en|ar)/, `/${other}`)} className="rounded-full border border-ash px-3.5 py-1 text-xs transition-colors hover:border-blood hover:text-blood">
      {other === 'ar' ? 'العربية' : 'English'}
    </Link>
  )
}

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { dirOf, locales, t, asLocale } from '@/lib/i18n'
import { fontVars } from '@/lib/fonts'
import { getSettings } from '@/lib/data'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import SmoothScroll from '@/components/site/SmoothScroll'
import '../../globals.css'

export const generateStaticParams = () => locales.map((locale) => ({ locale }))

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = asLocale((await params).locale)
  const s = await getSettings()
  return { title: t(s, 'academy_name', locale), description: t(s, 'tagline', locale) }
}

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const locale = asLocale((await params).locale)
  const s = await getSettings()
  return (
    <html lang={locale} dir={dirOf(locale)} className={fontVars}>
      <body>
        <SmoothScroll />
        <Header locale={locale} s={s} />
        <main>{children}</main>
        <Footer locale={locale} s={s} />
      </body>
    </html>
  )
}

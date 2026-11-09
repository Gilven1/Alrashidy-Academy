import { ui, asLocale } from '@/lib/i18n'
import { getHeroes } from '@/lib/data'
import HeroesBrowser from '@/components/site/HeroesBrowser'
import SectionTitle from '@/components/site/SectionTitle'

export default async function HeroesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = asLocale((await params).locale)
  const heroes = await getHeroes()
  return (
    <div className="mx-auto max-w-6xl px-4 pt-20">
      <SectionTitle as="h1">{ui[locale].heroesTitle}</SectionTitle>
      <HeroesBrowser heroes={heroes} locale={locale} />
    </div>
  )
}

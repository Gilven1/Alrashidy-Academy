import { ui, asLocale } from '@/lib/i18n'
import { getCoaches } from '@/lib/data'
import CoachSection from '@/components/site/CoachSection'
import SectionTitle from '@/components/site/SectionTitle'

export default async function CoachesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = asLocale((await params).locale)
  const L = ui[locale]
  const coaches = await getCoaches()
  const main = coaches.filter((c) => c.role === 'coach')
  const assistants = coaches.filter((c) => c.role === 'assistant')
  return (
    <div className="mx-auto max-w-6xl px-4 pt-20">
      <SectionTitle as="h1">{L.coachesPageTitle}</SectionTitle>
      <CoachSection coaches={main} locale={locale} />
      {assistants.length > 0 && (<><h2 className="reveal mb-8 mt-20 font-display text-3xl font-semibold sm:text-4xl">{L.assistants}</h2><CoachSection coaches={assistants} locale={locale} /></>)}
    </div>
  )
}

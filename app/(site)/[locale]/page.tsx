/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { t, ui, asLocale } from '@/lib/i18n'
import { getBranches, getCoaches, getHeroes, getSettings } from '@/lib/data'
import CoachSection from '@/components/site/CoachSection'
import ContactForm from '@/components/site/ContactForm'
import SectionTitle from '@/components/site/SectionTitle'
import Photo from '@/components/site/Photo'
import Arrow from '@/components/site/Arrow'

const Section = ({ id, children }: { id?: string; children: ReactNode }) => (
  <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-28">{children}</section>
)
const delay = (d: string) => ({ '--d': d }) as CSSProperties

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = asLocale((await params).locale)
  const L = ui[locale]
  const [s, coaches, heroes, branches] = await Promise.all([getSettings(), getCoaches(), getHeroes(), getBranches()])

  const pick = (role: 'coach' | 'assistant') => {
    const all = coaches.filter((c) => c.role === role)
    const featured = all.filter((c) => c.is_featured)
    return (featured.length ? featured : all).slice(0, 3)
  }
  const mainCoaches = pick('coach')
  const assistants = pick('assistant')

  const linked = heroes.find((h) => h.id === s.hotm_hero_id)
  const hotmName = t(s, 'hotm_name', locale) || (linked ? t(linked, 'name', locale) : '')
  const hotmImage = s.hotm_image_url || linked?.photo_url
  const showHotm = s.hotm_enabled !== false && !!(hotmName || hotmImage)
  const wa = s.whatsapp?.replace(/\D/g, '')

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden px-4 pb-32 pt-6 text-center">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_50%_0%,rgba(255,255,255,.09),transparent_70%),radial-gradient(55%_50%_at_50%_48%,rgba(227,30,36,.24),transparent_72%)]" />
        <h1 className="sr-only">{t(s, 'academy_name', locale)}</h1>
        <img src={s.logo_url || '/logo.jpg'} alt="" className="hero-logo h-[min(56svh,520px)] w-auto max-w-[92vw] object-contain" />
        <div className="rise mt-2 flex flex-wrap justify-center gap-4" style={delay('.6s')}>
          <a href="#contact" className="btn">{L.joinUs}<Arrow /></a>
          <Link href={`/${locale}/coaches`} className="btn btn-ghost">{L.meetCoaches}<Arrow /></Link>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-10 space-y-2.5">
          {[0, 1, 2].map((i) => <div key={i} className="rope" style={{ animationDelay: `${0.5 + i * 0.18}s` }} />)}
        </div>
      </section>

      {/* ABOUT */}
      {t(s, 'about', locale) && (
        <Section id="about">
          <SectionTitle>{L.about}</SectionTitle>
          <p className="reveal max-w-4xl whitespace-pre-line text-xl leading-relaxed text-bone/80 sm:text-2xl sm:leading-relaxed">{t(s, 'about', locale)}</p>
        </Section>
      )}

      {/* HERO OF THE MONTH */}
      {showHotm && (
        <section id="hero-of-the-month" className="relative mt-32 overflow-hidden border-y border-ash bg-coal">
          <div aria-hidden className="absolute -end-40 top-0 size-[32rem] rounded-full bg-blood/15 blur-[120px]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-24 md:grid-cols-[5fr_6fr]">
            <div className="reveal relative mx-3 md:mx-0">
              <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 border border-blood rtl:-translate-x-4" />
              <Photo src={hotmImage} alt={hotmName} className="relative aspect-[4/5] w-full" />
            </div>
            <div className="reveal">
              <p className="mb-5 flex items-center gap-4 text-sm text-blood"><span aria-hidden className="h-px w-12 bg-blood" />{L.hotm}</p>
              {hotmName && <h2 className="font-display text-5xl font-semibold sm:text-7xl">{hotmName}</h2>}
              {t(s, 'hotm_blurb', locale) && <p className="mt-6 max-w-md text-xl text-bone/75">{t(s, 'hotm_blurb', locale)}</p>}
              <Link href={`/${locale}/heroes`} className="btn btn-ghost mt-10">{L.seeHeroes}<Arrow /></Link>
            </div>
          </div>
        </section>
      )}

      {/* COACHES */}
      <Section id="coaches">
        <SectionTitle>{L.ourCoaches}</SectionTitle>
        <CoachSection coaches={mainCoaches} locale={locale} />
        {assistants.length > 0 && (
          <>
            <h3 className="reveal mb-8 mt-20 font-display text-3xl font-semibold sm:text-4xl">{L.assistants}</h3>
            <CoachSection coaches={assistants} locale={locale} />
          </>
        )}
        <div className="mt-16 text-center"><Link href={`/${locale}/coaches`} className="btn">{L.viewAll}<Arrow /></Link></div>
      </Section>

      {/* LOCATIONS */}
      {branches.length > 0 && (
        <Section id="locations">
          <SectionTitle>{L.locations}</SectionTitle>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {branches.map((b) => (
              <li key={b.id} className="reveal flex flex-col gap-3 border border-ash bg-coal p-7 transition-colors duration-300 hover:border-blood">
                <h3 className="font-display text-2xl font-semibold">{t(b, 'name', locale)}</h3>
                <p className="text-bone/80">{t(b, 'address', locale)}</p>
                {b.phone && <a href={`tel:${b.phone.replace(/\s/g, '')}`} dir="ltr" className="link w-fit">{b.phone}</a>}
                {t(b, 'hours', locale) && <p className="text-sm text-mute">{L.hours}: {t(b, 'hours', locale)}</p>}
                {b.map_url && <a href={b.map_url} target="_blank" rel="noopener noreferrer" className="arrow-link mt-2 inline-flex items-center gap-2 text-sm text-blood">{L.openMap}<Arrow /></a>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* CONTACT */}
      <Section id="contact">
        <SectionTitle>{L.contactTitle}</SectionTitle>
        <div className="grid gap-16 md:grid-cols-2">
          <div className="reveal space-y-6">
            {s.phone && <a href={`tel:${s.phone.replace(/\s/g, '')}`} dir="ltr" className="block font-display text-4xl font-semibold transition-colors hover:text-blood sm:text-5xl">{s.phone}</a>}
            <ul className="space-y-2 text-lg">
              {wa && <li><a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="link">{L.whatsapp}</a></li>}
              {s.email && <li><a href={`mailto:${s.email}`} dir="ltr" className="link">{s.email}</a></li>}
            </ul>
          </div>
          <div className="reveal"><ContactForm locale={locale} /></div>
        </div>
      </Section>
    </>
  )
}

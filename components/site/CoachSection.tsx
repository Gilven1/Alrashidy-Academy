'use client'
import { useEffect, useState } from 'react'
import { t, ui, type Locale } from '@/lib/i18n'
import type { Coach } from '@/lib/types'
import Photo from './Photo'
import Medal from './Medal'
import Arrow from './Arrow'

const kinds = ['tournament', 'certification', 'belt'] as const

export default function CoachSection({ coaches, locale }: { coaches: Coach[]; locale: Locale }) {
  const L = ui[locale]
  const [open, setOpen] = useState<Coach | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const skills = open ? (locale === 'ar' && open.skills_ar.length ? open.skills_ar : open.skills_en) : []
  const hasRecord = !!open && (open.wins != null || open.losses != null || open.draws != null)

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
        {coaches.map((c) => (
          <li key={c.id} className="reveal">
            <button onClick={() => setOpen(c)} className="group block w-full text-start">
              <div className="relative aspect-[3/4] overflow-hidden bg-coal">
                <Photo src={c.photo_url} alt="" className="absolute inset-0 size-full grayscale-[.45] contrast-110 transition duration-700 ease-out group-hover:scale-[1.05] group-hover:grayscale-0" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <span aria-hidden className="absolute bottom-0 start-0 h-[3px] w-0 bg-blood transition-all duration-500 group-hover:w-full" />
              </div>
              <p className="mt-4 font-display text-2xl font-semibold">{t(c, 'name', locale)}</p>
              <p className="text-sm text-mute">{t(c, 'title', locale)}</p>
              <span className="arrow-link mt-3 inline-flex items-center gap-2 text-sm text-blood">{L.viewCv}<Arrow /></span>
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <div className="fixed inset-0 z-50" data-lenis-prevent>
          <div className="backdrop absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setOpen(null)} />
          <aside role="dialog" aria-modal="true" aria-label={t(open, 'name', locale)} className="panel absolute inset-y-0 end-0 w-full max-w-md overflow-y-auto border-s border-ash bg-coal">
            <button autoFocus onClick={() => setOpen(null)} className="absolute end-4 top-4 z-10 rounded-full bg-ink/80 px-4 py-1.5 text-sm backdrop-blur transition-colors hover:bg-blood">{L.close}</button>
            <div className="relative">
              <Photo src={open.photo_url} alt={t(open, 'name', locale)} className="aspect-[4/3] w-full" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-transparent" />
            </div>
            <div className="space-y-8 p-6 pt-2">
              <div>
                <h3 className="font-display text-4xl font-semibold">{t(open, 'name', locale)}</h3>
                <p className="mt-1 text-blood">{t(open, 'title', locale)}</p>
              </div>
              {t(open, 'bio', locale) && <p className="whitespace-pre-line leading-relaxed text-bone/80">{t(open, 'bio', locale)}</p>}

              {(open.years_experience != null || hasRecord) && (
                <dl className="flex divide-x divide-ash border-y border-ash text-center rtl:divide-x-reverse">
                  {open.years_experience != null && <div className="flex-1 py-5"><dd className="font-display text-4xl">{open.years_experience}</dd><dt className="mt-1 text-xs text-mute">{L.years}</dt></div>}
                  {hasRecord && <div className="flex-1 py-5"><dd className="font-display text-4xl" dir="ltr">{open.wins ?? 0}-{open.losses ?? 0}-{open.draws ?? 0}</dd><dt className="mt-1 text-xs text-mute">{L.wins} / {L.losses} / {L.draws}</dt></div>}
                </dl>
              )}

              {skills.length > 0 && (
                <section>
                  <h4 className="mb-3 font-display text-2xl">{L.skills}</h4>
                  <ul className="flex flex-wrap gap-2">{skills.map((s) => <li key={s} className="rounded-full border border-ash px-4 py-1.5 text-sm">{s}</li>)}</ul>
                </section>
              )}

              {kinds.map((k) => {
                const items = open.coach_achievements.filter((a) => a.kind === k)
                if (!items.length) return null
                return (
                  <section key={k}>
                    <h4 className="mb-2 font-display text-2xl">{L[k]}</h4>
                    <ul className="divide-y divide-ash border-y border-ash">
                      {items.map((a) => (
                        <li key={a.id} className="flex items-center gap-3 py-3">
                          {a.placement ? <Medal p={a.placement} locale={locale} /> : <span aria-hidden className="size-1.5 shrink-0 bg-blood" />}
                          <span>{t(a, 'title', locale)}</span>
                          {a.year && <span className="ms-auto text-sm text-mute" dir="ltr">{a.year}</span>}
                        </li>
                      ))}
                    </ul>
                  </section>
                )
              })}
            </div>
          </aside>
        </div>
      )}
    </>
  )
}

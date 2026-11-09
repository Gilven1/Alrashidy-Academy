'use client'
import { useMemo, useState } from 'react'
import { t, ui, type Locale } from '@/lib/i18n'
import type { Hero } from '@/lib/types'
import Photo from './Photo'
import Medal from './Medal'

const sel = 'peer w-full min-w-48 appearance-none border-b border-ash bg-transparent pb-2 pe-8 outline-none transition-colors focus:border-blood'

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className="block text-xs text-mute">
      {label}
      <span className="relative mt-2 block text-base text-bone">
        <select className={sel} value={value} onChange={(e) => onChange(e.target.value)}>{children}</select>
        <svg aria-hidden className="pointer-events-none absolute end-0 top-1.5 text-blood" width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 1l5 5 5-5" /></svg>
      </span>
    </label>
  )
}

export default function HeroesBrowser({ heroes, locale }: { heroes: Hero[]; locale: Locale }) {
  const L = ui[locale]
  const [year, setYear] = useState('')
  const [wc, setWc] = useState('')
  const titles = heroes.flatMap((h) => h.hero_titles)
  const years = useMemo(() => [...new Set(titles.map((x) => x.year))].sort((a, b) => b - a), [titles])
  const classes = useMemo(() => [...new Set(titles.map((x) => x.weight_class))].sort(), [titles])
  const match = (x: Hero['hero_titles'][number]) => (!year || x.year === +year) && (!wc || x.weight_class === wc)
  const list = heroes.filter((h) => h.hero_titles.some(match))

  return (
    <>
      <div className="mb-14 flex flex-wrap gap-8">
        <Select label={L.year} value={year} onChange={setYear}>
          <option value="">{L.allYears}</option>{years.map((y) => <option key={y} value={y}>{y}</option>)}
        </Select>
        <Select label={L.weightClass} value={wc} onChange={setWc}>
          <option value="">{L.allClasses}</option>{classes.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
      </div>

      {list.length === 0 ? <p className="py-20 text-center text-mute">{L.noHeroes}</p> : (
        <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((h) => (
            <li key={h.id} className="group reveal">
              <div className="relative aspect-[4/5] overflow-hidden bg-coal">
                <Photo src={h.photo_url} alt={t(h, 'name', locale)} className="absolute inset-0 size-full grayscale-[.45] contrast-110 transition duration-700 ease-out group-hover:scale-[1.05] group-hover:grayscale-0" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <span aria-hidden className="absolute bottom-0 start-0 h-[3px] w-0 bg-blood transition-all duration-500 group-hover:w-full" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h2 className="font-display text-3xl font-semibold">{t(h, 'name', locale)}</h2>
                  <p className="mt-1 text-sm text-bone/70"><span className="text-blood">{h.hero_titles.length}</span> {L.titles}</p>
                </div>
              </div>
              <ul className="border-x border-b border-ash text-sm">
                {h.hero_titles.map((x) => (
                  <li key={x.id} className={`flex items-center gap-3 border-t border-ash px-4 py-3 first:border-t-0 transition-opacity ${(year || wc) && !match(x) ? 'opacity-35' : ''}`}>
                    <Medal p={x.placement} locale={locale} />
                    <span>{t(x, 'tournament', locale)}</span>
                    <span className="ms-auto shrink-0 text-mute" dir="ltr">{x.year} · {x.weight_class}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

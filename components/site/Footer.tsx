import { t, ui, type Locale } from '@/lib/i18n'
import type { Settings } from '@/lib/types'

export default function Footer({ locale, s }: { locale: Locale; s: Settings }) {
  const L = ui[locale]
  const socials = [['Instagram', s.instagram], ['Facebook', s.facebook], ['TikTok', s.tiktok], ['YouTube', s.youtube]].filter(([, u]) => u)
  const myName = "Youssef Emad"
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-ash bg-coal">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blood to-transparent" />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-4xl font-semibold sm:text-5xl">{t(s, 'academy_name', locale)}</p>
          <p className="mt-2 text-mute">{t(s, 'tagline', locale)}</p>
        </div>
        <ul className="flex flex-wrap gap-x-7 gap-y-2">
          {socials.map(([name, url]) => <li key={name}><a href={url!} target="_blank" rel="noopener noreferrer" className="link">{name}</a></li>)}
        </ul>
      </div>
      <p className="border-t border-ash py-5 text-center text-sm text-mute">© {new Date().getFullYear()} {myName}. {L.rights}</p>
    </footer>
  )
}

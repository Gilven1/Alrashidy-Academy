import { ui, type Locale } from '@/lib/i18n'
import type { Placement } from '@/lib/types'

const cls: Record<Placement, string> = {
  gold: 'bg-gold shadow-[0_0_12px_rgba(214,178,94,.55)]',
  silver: 'bg-silver shadow-[0_0_12px_rgba(196,199,204,.4)]',
  bronze: 'bg-bronze shadow-[0_0_12px_rgba(194,124,74,.45)]',
}

export default function Medal({ p, locale }: { p: Placement; locale: Locale }) {
  return <span role="img" aria-label={ui[locale][p]} title={ui[locale][p]} className={`inline-block size-3 shrink-0 rounded-full ${cls[p]}`} />
}

/* eslint-disable @next/next/no-img-element */
'use client'
import { useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLang, type Lbl } from './lang'

export type Field = {
  key: string; label: Lbl; req?: boolean; wide?: boolean; hint?: Lbl
  type: 'text' | 'textarea' | 'number' | 'bool' | 'image' | 'list' | 'select' | 'heading'
  options?: { v: string; l: Lbl | string }[]
}

export const input = 'w-full bg-coal border border-ash px-3 py-2 focus:border-blood outline-none'

function ImageField({ folder, value, onChange }: { folder: string; value: string | null; onChange: (v: string | null) => void }) {
  const { tr } = useLang()
  const sb = useMemo(() => createClient(), [])
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function upload(file: File) {
    setBusy(true); setErr('')
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const { error } = await sb.storage.from('media').upload(path, file, { contentType: file.type })
    if (error) setErr(error.message)
    else onChange(sb.storage.from('media').getPublicUrl(path).data.publicUrl)
    setBusy(false)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="grid size-24 shrink-0 place-items-center overflow-hidden border border-ash bg-coal text-xs text-bone/50">
        {value ? <img src={value} alt="" className="size-full object-cover" /> : '—'}
      </div>
      <div className="space-y-2 text-sm">
        <label className="btn btn-ghost cursor-pointer !px-4 !py-2">
          {busy ? '...' : tr(['Choose image', 'اختر صورة'])}
          <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="sr-only" disabled={busy} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        </label>
        {value && <button type="button" onClick={() => onChange(null)} className="block text-blood hover:underline">{tr(['Remove', 'إزالة'])}</button>}
        {err && <p role="alert" className="text-blood">{err}</p>}
      </div>
    </div>
  )
}

export function FieldInput({ f, value, onChange }: { f: Field; value: any; onChange: (v: any) => void }) {
  const { tr } = useLang()
  if (f.type === 'heading') return <h3 className="col-span-full mt-4 border-b border-ash pb-2 font-display text-2xl">{tr(f.label)}</h3>
  const dir = f.key.endsWith('_ar') ? 'rtl' : undefined
  const span = f.wide || f.type === 'textarea' || f.type === 'list' || f.type === 'image' ? 'col-span-full' : ''

  let control
  switch (f.type) {
    case 'textarea':
      control = <textarea rows={4} dir={dir} className={input} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />; break
    case 'list':
      control = <textarea rows={4} dir={dir} className={input} value={(value ?? []).join('\n')} onChange={(e) => onChange(e.target.value.split('\n'))} />; break
    case 'number':
      control = <input type="number" className={input} value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))} />; break
    case 'bool':
      control = <input type="checkbox" className="size-5 accent-[#e31e24]" checked={!!value} onChange={(e) => onChange(e.target.checked)} />; break
    case 'select':
      control = (
        <select className={input} value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          {f.options?.map((o) => <option key={o.v} value={o.v}>{typeof o.l === 'string' ? o.l : tr(o.l)}</option>)}
        </select>
      ); break
    case 'image':
      control = <ImageField folder={f.key} value={value} onChange={onChange} />; break
    default:
      control = <input type="text" dir={dir ?? (/(url|phone|email|instagram|facebook|tiktok|youtube|whatsapp|weight_class)/.test(f.key) ? 'ltr' : undefined)} className={input} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
  }

  return (
    <label className={`block space-y-1 text-sm ${span} ${f.type === 'bool' ? 'flex items-center gap-3 space-y-0' : ''}`}>
      <span>{tr(f.label)}{f.req && <span className="text-blood"> *</span>}</span>
      {control}
      {f.hint && <span className="block text-xs text-bone/50">{tr(f.hint)}</span>}
    </label>
  )
}

/** Turn the editor's values into a DB payload (trim lists, empty text -> null). */
export function toPayload(fields: Field[], v: Record<string, any>) {
  const out: Record<string, any> = {}
  for (const f of fields) {
    if (f.type === 'heading') continue
    let x = v[f.key]
    if (f.type === 'list') x = (x ?? []).map((s: string) => s.trim()).filter(Boolean)
    else if (f.type === 'bool') x = !!x
    else if (typeof x === 'string') x = x.trim() === '' ? null : x.trim()
    else if (x === undefined) x = null
    out[f.key] = x
  }
  return out
}

export function firstMissing(fields: Field[], v: Record<string, any>) {
  return fields.find((f) => f.req && !String(v[f.key] ?? '').trim())
}

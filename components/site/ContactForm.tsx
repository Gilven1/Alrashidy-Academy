'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ui, type Locale } from '@/lib/i18n'
import Arrow from './Arrow'

export default function ContactForm({ locale }: { locale: Locale }) {
  const L = ui[locale]
  const [state, setState] = useState<'idle' | 'busy' | 'ok' | 'err'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    setState('busy')
    const { error } = await createClient().from('messages').insert({
      name: String(fd.get('name') || ''), phone: String(fd.get('phone') || '') || null,
      email: String(fd.get('email') || '') || null, message: String(fd.get('message') || ''),
    })
    if (error) setState('err')
    else { setState('ok'); form.reset() }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="name" required maxLength={120} placeholder={L.name} aria-label={L.name} className="field" />
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="phone" type="tel" maxLength={40} placeholder={L.phone} aria-label={L.phone} className="field" dir="ltr" />
        <input name="email" type="email" maxLength={200} placeholder={L.email} aria-label={L.email} className="field" dir="ltr" />
      </div>
      <textarea name="message" required maxLength={2000} rows={4} placeholder={L.message} aria-label={L.message} className="field resize-none" />
      <button disabled={state === 'busy'} className="btn mt-4">{L.send}<Arrow /></button>
      {state === 'ok' && <p role="status" className="text-bone/80">{L.sent}</p>}
      {state === 'err' && <p role="alert" className="text-blood">{L.sendError}</p>}
    </form>
  )
}

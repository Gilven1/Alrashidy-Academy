'use client'
import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLang } from './lang'
import { settingsFields } from './config'
import { FieldInput, toPayload } from './FieldInput'

export default function SettingsForm() {
  const { tr, lang } = useLang()
  const sb = useMemo(() => createClient(), [])
  const [v, setV] = useState<Record<string, any>>({})
  const [heroes, setHeroes] = useState<{ v: string; l: string }[]>([])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    sb.from('site_settings').select('*').eq('id', 1).maybeSingle().then(({ data }) => setV(data ?? {}))
    sb.from('heroes').select('id,name_en,name_ar').order('sort_order').then(({ data }) =>
      setHeroes([{ v: '', l: '—' }, ...(data ?? []).map((h) => ({ v: h.id, l: lang === 'ar' ? h.name_ar : h.name_en }))]))
  }, [sb, lang])

  const fields = settingsFields.map((f) => (f.key === 'hotm_hero_id' ? { ...f, options: heroes } : f))

  async function save() {
    setMsg('')
    const { error } = await sb.from('site_settings').upsert({ ...toPayload(fields, v), id: 1 })
    setMsg(error ? error.message : tr(['Saved', 'تم الحفظ']))
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-4xl">{tr(['Home page & settings', 'الصفحة الرئيسية والإعدادات'])}</h1>
      <div className="grid grid-cols-1 gap-4 border border-ash bg-coal p-5 md:grid-cols-2">
        {fields.map((f) => <FieldInput key={f.key} f={f} value={v[f.key]} onChange={(x) => setV({ ...v, [f.key]: x })} />)}
        <div className="col-span-full flex items-center gap-4">
          <button onClick={save} className="btn">{tr(['Save', 'حفظ'])}</button>
          {msg && <span role="status" className="text-bone/80">{msg}</span>}
        </div>
      </div>
    </div>
  )
}

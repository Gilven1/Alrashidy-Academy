'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLang, type Lbl } from './lang'
import { FieldInput, firstMissing, toPayload, type Field } from './FieldInput'

export type Child = { table: string; fk: string; title: Lbl; fields: Field[]; labelKey: string; defaults?: Record<string, any> }
type Props = { table: string; title: Lbl; fields: Field[]; labelKey: string; subKey?: string; defaults?: Record<string, any>; child?: Child }

const blank = (fields: Field[], defaults: Record<string, any> = {}) => {
  const o: Record<string, any> = {}
  for (const f of fields) { if (f.type === 'bool') o[f.key] = false; if (f.type === 'list') o[f.key] = [] }
  return { ...o, ...defaults }
}

function ChildRow({ child, row, onChange }: { child: Child; row: any; onChange: () => void }) {
  const { tr } = useLang()
  const sb = useMemo(() => createClient(), [])
  const [v, setV] = useState(row)
  const [msg, setMsg] = useState('')

  async function save() {
    const miss = firstMissing(child.fields, v)
    if (miss) return setMsg(tr(['Fill: ', 'أكمل: ']) + tr(miss.label))
    const payload = { ...toPayload(child.fields, v), [child.fk]: row[child.fk] }
    const { error } = v.id ? await sb.from(child.table).update(payload).eq('id', v.id) : await sb.from(child.table).insert(payload)
    if (error) setMsg(error.message); else onChange()
  }
  async function remove() {
    if (v.id) { if (!confirm(tr(['Delete this row?', 'حذف هذا السطر؟']))) return; await sb.from(child.table).delete().eq('id', v.id) }
    onChange()
  }

  return (
    <div className="grid grid-cols-2 gap-3 border border-ash bg-ink p-3 md:grid-cols-4">
      {child.fields.map((f) => <FieldInput key={f.key} f={f} value={v[f.key]} onChange={(x) => setV({ ...v, [f.key]: x })} />)}
      <div className="col-span-full flex items-center gap-4 text-sm">
        <button type="button" onClick={save} className="btn !px-4 !py-1.5">{tr(['Save row', 'حفظ'])}</button>
        <button type="button" onClick={remove} className="text-blood hover:underline">{tr(['Delete', 'حذف'])}</button>
        {msg && <span role="alert" className="text-blood">{msg}</span>}
      </div>
    </div>
  )
}

function ChildRows({ child, parentId }: { child: Child; parentId: string }) {
  const { tr } = useLang()
  const sb = useMemo(() => createClient(), [])
  const [rows, setRows] = useState<any[]>([])
  const [drafts, setDrafts] = useState<number[]>([])

  const load = useCallback(async () => {
    const { data } = await sb.from(child.table).select('*').eq(child.fk, parentId).order('sort_order').order('year', { ascending: false })
    setRows(data ?? []); setDrafts([])
  }, [sb, child.table, child.fk, parentId])
  useEffect(() => { load() }, [load])

  return (
    <section className="col-span-full mt-6 space-y-3">
      <h3 className="border-b border-ash pb-2 font-display text-2xl">{tr(child.title)}</h3>
      {rows.map((r) => <ChildRow key={r.id} child={child} row={r} onChange={load} />)}
      {drafts.map((d) => <ChildRow key={d} child={child} row={{ ...blank(child.fields, child.defaults), [child.fk]: parentId }} onChange={load} />)}
      <button type="button" onClick={() => setDrafts([...drafts, Date.now()])} className="btn btn-ghost !px-4 !py-2">+ {tr(['Add', 'إضافة'])}</button>
    </section>
  )
}

export default function Manager(p: Props) {
  const { tr } = useLang()
  const sb = useMemo(() => createClient(), [])
  const [rows, setRows] = useState<any[]>([])
  const [cur, setCur] = useState<any | null>(null)
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    const { data } = await sb.from(p.table).select('*').order('sort_order').order('created_at')
    setRows(data ?? [])
  }, [sb, p.table])
  useEffect(() => { load() }, [load])

  async function save() {
    const miss = firstMissing(p.fields, cur)
    if (miss) return setMsg(tr(['Please fill: ', 'أكمل الحقل: ']) + tr(miss.label))
    setBusy(true); setMsg('')
    const payload = toPayload(p.fields, cur)
    const q = cur.id ? sb.from(p.table).update(payload).eq('id', cur.id) : sb.from(p.table).insert(payload)
    const { data, error } = await q.select().single()
    if (error) setMsg(error.message)
    else { setCur({ ...cur, ...data }); setMsg(tr(['Saved', 'تم الحفظ'])); load() }
    setBusy(false)
  }

  async function remove() {
    if (!confirm(tr(['Delete this item and everything under it?', 'حذف هذا العنصر وكل ما يتبعه؟']))) return
    const { error } = await sb.from(p.table).delete().eq('id', cur.id)
    if (error) return setMsg(error.message)
    setCur(null); load()
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-4xl">{tr(p.title)}</h1>
        <button onClick={() => { setCur(blank(p.fields, p.defaults)); setMsg('') }} className="btn !px-4 !py-2">+ {tr(['New', 'جديد'])}</button>
      </div>
      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <ul className="space-y-1 self-start">
          {rows.length === 0 && <li className="text-bone/60">{tr(['Nothing yet. Click New.', 'لا يوجد شيء بعد. اضغط جديد.'])}</li>}
          {rows.map((r) => (
            <li key={r.id}>
              <button onClick={() => { setCur(r); setMsg('') }} className={`w-full border-s-4 bg-coal px-3 py-2 text-start hover:bg-ash ${cur?.id === r.id ? 'border-blood' : 'border-transparent'}`}>
                <span className="block">{r[p.labelKey]}</span>
                <span className="block text-xs text-bone/60">{p.subKey && r[p.subKey]}{r.is_published === false && ` (${tr(['hidden', 'مخفي'])})`}</span>
              </button>
            </li>
          ))}
        </ul>

        {cur && (
          <div key={cur.id ?? 'new'} className="grid grid-cols-1 gap-4 border border-ash bg-coal p-5 md:grid-cols-2">
            {p.fields.map((f) => <FieldInput key={f.key} f={f} value={cur[f.key]} onChange={(x) => setCur({ ...cur, [f.key]: x })} />)}
            <div className="col-span-full flex flex-wrap items-center gap-4">
              <button onClick={save} disabled={busy} className="btn disabled:opacity-60">{tr(['Save', 'حفظ'])}</button>
              {cur.id && <button onClick={remove} className="text-blood hover:underline">{tr(['Delete', 'حذف'])}</button>}
              {msg && <span role="status" className="text-bone/80">{msg}</span>}
            </div>
            {p.child && (cur.id
              ? <ChildRows child={p.child} parentId={cur.id} />
              : <p className="col-span-full text-sm text-bone/60">{tr(['Save first, then you can add ', 'احفظ أولًا ثم يمكنك إضافة ']) + tr(p.child.title)}</p>)}
          </div>
        )}
      </div>
    </div>
  )
}

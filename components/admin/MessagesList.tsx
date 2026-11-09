'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLang } from './lang'

export default function MessagesList() {
  const { tr } = useLang()
  const sb = useMemo(() => createClient(), [])
  const [rows, setRows] = useState<any[]>([])
  const load = useCallback(async () => {
    const { data } = await sb.from('messages').select('*').order('created_at', { ascending: false })
    setRows(data ?? [])
  }, [sb])
  useEffect(() => { load() }, [load])

  return (
    <div>
      <h1 className="mb-6 font-display text-4xl">{tr(['Messages', 'الرسائل'])}</h1>
      {rows.length === 0 && <p className="text-bone/60">{tr(['No messages yet.', 'لا توجد رسائل بعد.'])}</p>}
      <ul className="space-y-3">
        {rows.map((m) => (
          <li key={m.id} className={`border-s-4 bg-coal p-4 ${m.is_read ? 'border-ash' : 'border-blood'}`}>
            <div className="flex flex-wrap items-baseline gap-x-4">
              <b>{m.name}</b>
              {m.phone && <a href={`tel:${m.phone}`} dir="ltr" className="text-blood">{m.phone}</a>}
              {m.email && <a href={`mailto:${m.email}`} dir="ltr" className="text-blood">{m.email}</a>}
              <span className="ms-auto text-sm text-bone/50" dir="ltr">{new Date(m.created_at).toLocaleString()}</span>
            </div>
            <p className="mt-2 whitespace-pre-line">{m.message}</p>
            <div className="mt-3 flex gap-4 text-sm">
              <button onClick={async () => { await sb.from('messages').update({ is_read: !m.is_read }).eq('id', m.id); load() }} className="hover:underline">
                {m.is_read ? tr(['Mark as unread', 'تحديد كغير مقروءة']) : tr(['Mark as read', 'تحديد كمقروءة'])}
              </button>
              <button onClick={async () => { if (confirm(tr(['Delete this message?', 'حذف الرسالة؟']))) { await sb.from('messages').delete().eq('id', m.id); load() } }} className="text-blood hover:underline">{tr(['Delete', 'حذف'])}</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

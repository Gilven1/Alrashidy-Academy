'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/components/admin/lang'
import { input } from '@/components/admin/FieldInput'

export default function Login() {
  const { tr, lang, setLang } = useLang()
  const router = useRouter()
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setBusy(true); setErr('')
    const sb = createClient()
    const { error } = await sb.auth.signInWithPassword({ email: String(fd.get('email')), password: String(fd.get('password')) })
    if (error) { setErr(tr(['Wrong email or password.', 'البريد أو كلمة المرور غير صحيحة.'])); setBusy(false); return }
    const { data: ok } = await sb.rpc('is_admin')
    if (!ok) { await sb.auth.signOut(); setErr(tr(['This account is not an admin.', 'هذا الحساب ليس مسؤولًا.'])); setBusy(false); return }
    router.push('/admin'); router.refresh()
  }

  return (
    <main className="mx-auto grid min-h-screen max-w-sm place-content-center gap-6 px-4">
      <h1 className="font-display text-4xl">{tr(['Dashboard login', 'دخول لوحة التحكم'])}</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="email" type="email" required dir="ltr" placeholder={tr(['Email', 'البريد الإلكتروني'])} aria-label="Email" className={input} />
        <input name="password" type="password" required dir="ltr" placeholder={tr(['Password', 'كلمة المرور'])} aria-label="Password" className={input} />
        <button disabled={busy} className="btn w-full disabled:opacity-60">{tr(['Log in', 'دخول'])}</button>
        {err && <p role="alert" className="text-blood">{err}</p>}
      </form>
      <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="text-sm text-bone/70 hover:text-blood">{lang === 'en' ? 'العربية' : 'English'}</button>
    </main>
  )
}

'use client'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lbl = [string, string] // [English, Arabic]
type Lang = 'en' | 'ar'
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'en', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  useEffect(() => { try { if (localStorage.getItem('admin-lang') === 'ar') setLangState('ar') } catch {} }, [])
  const setLang = (l: Lang) => { setLangState(l); try { localStorage.setItem('admin-lang', l) } catch {} }
  return (
    <Ctx.Provider value={{ lang, setLang }}>
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang} className="min-h-screen">{children}</div>
    </Ctx.Provider>
  )
}

export function useLang() {
  const { lang, setLang } = useContext(Ctx)
  return { lang, setLang, tr: (l: Lbl) => l[lang === 'ar' ? 1 : 0] }
}

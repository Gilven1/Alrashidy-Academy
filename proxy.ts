import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const LOCALES = ['en', 'ar']

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Dashboard: must be signed in (data is also protected by RLS)
  if (pathname.startsWith('/admin')) {
    let res = NextResponse.next({ request: req })
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll(list) {
          list.forEach(({ name, value }) => req.cookies.set(name, value))
          res = NextResponse.next({ request: req })
          list.forEach(({ name, value, options }) => res.cookies.set(name, value, options))
        },
      },
    })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user && pathname !== '/admin/login') return NextResponse.redirect(new URL('/admin/login', req.url))
    return res
  }

  // Public site: make sure the URL starts with /en or /ar
  if (!LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    const pref = req.headers.get('accept-language')?.toLowerCase().startsWith('ar') ? 'ar' : 'en'
    const url = req.nextUrl.clone()
    url.pathname = `/${pref}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }
}

export const config = { matcher: ['/((?!_next|api|.*\\..*).*)'] }

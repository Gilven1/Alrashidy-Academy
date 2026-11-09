import { createClient } from './supabase/server'
import type { Branch, Coach, Hero, Settings } from './types'

const fallback: Settings = {
  academy_name_en: 'Alrashidy Academy', academy_name_ar: 'الرشيدي اكادميز', tagline_en: 'Martial Arts & Fitness', tagline_ar: 'فنون قتالية ولياقة',
  logo_url: null, about_en: null, about_ar: null, phone: null, whatsapp: null, email: null, instagram: null, facebook: null,
  tiktok: null, youtube: null, hotm_enabled: true, hotm_name_en: null, hotm_name_ar: null, hotm_hero_id: null, hotm_image_url: null, hotm_blurb_en: null, hotm_blurb_ar: null,
}

export async function getSettings(): Promise<Settings> {
  const sb = await createClient()
  const { data } = await sb.from('site_settings').select('*').eq('id', 1).maybeSingle()
  return { ...fallback, ...(data ?? {}) } as Settings
}

export async function getCoaches(): Promise<Coach[]> {
  const sb = await createClient()
  const { data } = await sb.from('coaches').select('*, coach_achievements(*)').order('sort_order')
  return ((data ?? []) as Coach[]).map((c) => ({ ...c, coach_achievements: [...c.coach_achievements].sort((a, b) => (b.year ?? 0) - (a.year ?? 0)) }))
}

export async function getHeroes(): Promise<Hero[]> {
  const sb = await createClient()
  const { data } = await sb.from('heroes').select('*, hero_titles(*)').order('sort_order')
  return ((data ?? []) as Hero[]).map((h) => ({ ...h, hero_titles: [...h.hero_titles].sort((a, b) => b.year - a.year) }))
}

export async function getBranches(): Promise<Branch[]> {
  const sb = await createClient()
  const { data } = await sb.from('branches').select('*').order('sort_order')
  return (data ?? []) as Branch[]
}

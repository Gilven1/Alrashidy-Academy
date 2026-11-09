export type Placement = 'gold' | 'silver' | 'bronze'
export type Achievement = { id: string; kind: 'tournament' | 'certification' | 'belt'; title_en: string; title_ar: string; year: number | null; placement: Placement | null }
export type Coach = {
  id: string; role: 'coach' | 'assistant'; name_en: string; name_ar: string; title_en: string | null; title_ar: string | null
  photo_url: string | null; bio_en: string | null; bio_ar: string | null; skills_en: string[]; skills_ar: string[]
  years_experience: number | null; wins: number | null; losses: number | null; draws: number | null; is_featured: boolean
  coach_achievements: Achievement[]
}
export type HeroTitle = { id: string; tournament_en: string; tournament_ar: string; year: number; weight_class: string; placement: Placement }
export type Hero = { id: string; name_en: string; name_ar: string; photo_url: string | null; bio_en: string | null; bio_ar: string | null; hero_titles: HeroTitle[] }
export type Branch = { id: string; name_en: string; name_ar: string; address_en: string | null; address_ar: string | null; phone: string | null; hours_en: string | null; hours_ar: string | null; map_url: string | null }
export type Settings = {
  academy_name_en: string; academy_name_ar: string; tagline_en: string | null; tagline_ar: string | null; logo_url: string | null
  about_en: string | null; about_ar: string | null; phone: string | null; whatsapp: string | null; email: string | null
  instagram: string | null; facebook: string | null; tiktok: string | null; youtube: string | null
  hotm_enabled: boolean; hotm_name_en: string | null; hotm_name_ar: string | null; hotm_hero_id: string | null; hotm_image_url: string | null; hotm_blurb_en: string | null; hotm_blurb_ar: string | null
}

import type { Field } from './FieldInput'
import type { Child } from './Manager'

const place = [{ v: 'gold', l: ['Gold', 'ذهبية'] as [string, string] }, { v: 'silver', l: ['Silver', 'فضية'] as [string, string] }, { v: 'bronze', l: ['Bronze', 'برونزية'] as [string, string] }]
const order: Field = { key: 'sort_order', label: ['Order (1 = first)', 'الترتيب (1 = الأول)'], type: 'number' }
const published: Field = { key: 'is_published', label: ['Published (visible on site)', 'منشور (ظاهر في الموقع)'], type: 'bool' }

export const settingsFields: Field[] = [
  { key: 'h1', label: ['Home page', 'الصفحة الرئيسية'], type: 'heading' },
  { key: 'logo_url', label: ['Main logo / hero image', 'الشعار الرئيسي / صورة الواجهة'], type: 'image' },
  { key: 'academy_name_en', label: ['Academy name (English)', 'اسم الأكاديمية (إنجليزي)'], type: 'text', req: true },
  { key: 'academy_name_ar', label: ['Academy name (Arabic)', 'اسم الأكاديمية (عربي)'], type: 'text', req: true },
  { key: 'tagline_en', label: ['Tagline (English)', 'الشعار النصي (إنجليزي)'], type: 'text' },
  { key: 'tagline_ar', label: ['Tagline (Arabic)', 'الشعار النصي (عربي)'], type: 'text' },
  { key: 'about_en', label: ['About the academy (English)', 'عن الأكاديمية (إنجليزي)'], type: 'textarea' },
  { key: 'about_ar', label: ['About the academy (Arabic)', 'عن الأكاديمية (عربي)'], type: 'textarea' },
  { key: 'h2', label: ['Hero of the month', 'بطل الشهر'], type: 'heading' },
  { key: 'hotm_enabled', label: ['Show hero of the month on the home page', 'إظهار بطل الشهر في الصفحة الرئيسية'], type: 'bool' },
  { key: 'hotm_name_en', label: ['Name (English)', 'الاسم (إنجليزي)'], type: 'text', hint: ['Type any name you like.', 'اكتب أي اسم تريده.'] },
  { key: 'hotm_name_ar', label: ['Name (Arabic)', 'الاسم (عربي)'], type: 'text' },
  { key: 'hotm_image_url', label: ['Hero of the month image', 'صورة بطل الشهر'], type: 'image' },
  { key: 'hotm_blurb_en', label: ['Short line (English)', 'سطر قصير (إنجليزي)'], type: 'text', hint: ['e.g. Two golds this season.', 'مثال: ذهبيتان هذا الموسم.'] },
  { key: 'hotm_blurb_ar', label: ['Short line (Arabic)', 'سطر قصير (عربي)'], type: 'text' },
  { key: 'hotm_hero_id', label: ['Link to a hero (optional)', 'ربط ببطل (اختياري)'], type: 'select', options: [], hint: ['If name or image is empty, this hero\'s name and photo are used.', 'إذا تُرك الاسم أو الصورة فارغًا تُستخدم بيانات هذا البطل.'] },
  { key: 'h3', label: ['Contact & social links', 'التواصل والروابط'], type: 'heading' },
  { key: 'phone', label: ['Phone', 'الهاتف'], type: 'text' },
  { key: 'whatsapp', label: ['WhatsApp number (with country code)', 'رقم واتساب (مع كود الدولة)'], type: 'text' },
  { key: 'email', label: ['Email', 'البريد الإلكتروني'], type: 'text' },
  { key: 'instagram', label: ['Instagram URL', 'رابط انستجرام'], type: 'text' },
  { key: 'facebook', label: ['Facebook URL', 'رابط فيسبوك'], type: 'text' },
  { key: 'tiktok', label: ['TikTok URL', 'رابط تيك توك'], type: 'text' },
  { key: 'youtube', label: ['YouTube URL', 'رابط يوتيوب'], type: 'text' },
]

export const coachFields: Field[] = [
  { key: 'role', label: ['Type', 'النوع'], type: 'select', options: [{ v: 'coach', l: ['Coach', 'مدرب'] }, { v: 'assistant', l: ['Assistant coach', 'مساعد مدرب'] }] },
  { key: 'is_featured', label: ['Show on home page (3 per type)', 'عرض في الرئيسية (3 لكل نوع)'], type: 'bool' },
  order, published,
  { key: 'photo_url', label: ['Photo', 'الصورة'], type: 'image' },
  { key: 'name_en', label: ['Name (English)', 'الاسم (إنجليزي)'], type: 'text', req: true },
  { key: 'name_ar', label: ['Name (Arabic)', 'الاسم (عربي)'], type: 'text', req: true },
  { key: 'title_en', label: ['Title (English)', 'المسمى (إنجليزي)'], type: 'text' },
  { key: 'title_ar', label: ['Title (Arabic)', 'المسمى (عربي)'], type: 'text' },
  { key: 'bio_en', label: ['Bio (English)', 'نبذة (إنجليزي)'], type: 'textarea' },
  { key: 'bio_ar', label: ['Bio (Arabic)', 'نبذة (عربي)'], type: 'textarea' },
  { key: 'skills_en', label: ['Skills (English)', 'المهارات (إنجليزي)'], type: 'list', hint: ['One skill per line.', 'مهارة في كل سطر.'] },
  { key: 'skills_ar', label: ['Skills (Arabic)', 'المهارات (عربي)'], type: 'list', hint: ['One skill per line.', 'مهارة في كل سطر.'] },
  { key: 'years_experience', label: ['Years of experience', 'سنوات الخبرة'], type: 'number' },
  { key: 'wins', label: ['Wins', 'الانتصارات'], type: 'number' },
  { key: 'losses', label: ['Losses', 'الخسائر'], type: 'number' },
  { key: 'draws', label: ['Draws', 'التعادلات'], type: 'number' },
]
export const coachDefaults = { role: 'coach', is_published: true, is_featured: false, sort_order: 0 }
export const coachChild: Child = {
  table: 'coach_achievements', fk: 'coach_id', labelKey: 'title_en', title: ['Tournaments, certifications & belts', 'البطولات والشهادات والأحزمة'],
  defaults: { kind: 'tournament', sort_order: 0 },
  fields: [
    { key: 'kind', label: ['Kind', 'النوع'], type: 'select', options: [{ v: 'tournament', l: ['Tournament', 'بطولة'] }, { v: 'certification', l: ['Certification', 'شهادة'] }, { v: 'belt', l: ['Belt', 'حزام'] }] },
    { key: 'year', label: ['Year', 'السنة'], type: 'number' },
    { key: 'placement', label: ['Medal', 'الميدالية'], type: 'select', options: [{ v: '', l: '—' }, ...place] },
    { key: 'title_en', label: ['Title (English)', 'العنوان (إنجليزي)'], type: 'text', req: true },
    { key: 'title_ar', label: ['Title (Arabic)', 'العنوان (عربي)'], type: 'text', req: true },
  ],
}

export const heroFields: Field[] = [
  order, published,
  { key: 'photo_url', label: ['Photo', 'الصورة'], type: 'image' },
  { key: 'name_en', label: ['Name (English)', 'الاسم (إنجليزي)'], type: 'text', req: true },
  { key: 'name_ar', label: ['Name (Arabic)', 'الاسم (عربي)'], type: 'text', req: true },
  { key: 'bio_en', label: ['Bio (English)', 'نبذة (إنجليزي)'], type: 'textarea' },
  { key: 'bio_ar', label: ['Bio (Arabic)', 'نبذة (عربي)'], type: 'textarea' },
]
export const heroDefaults = { is_published: true, sort_order: 0 }
export const heroChild: Child = {
  table: 'hero_titles', fk: 'hero_id', labelKey: 'tournament_en', title: ['Titles won', 'الألقاب'],
  defaults: { placement: 'gold', sort_order: 0 },
  fields: [
    { key: 'year', label: ['Year', 'السنة'], type: 'number', req: true },
    { key: 'weight_class', label: ['Weight class (e.g. -57 kg)', 'الوزن (مثال: -57 kg)'], type: 'text', req: true },
    { key: 'placement', label: ['Medal', 'الميدالية'], type: 'select', options: place, req: true },
    { key: 'tournament_en', label: ['Tournament (English)', 'البطولة (إنجليزي)'], type: 'text', req: true },
    { key: 'tournament_ar', label: ['Tournament (Arabic)', 'البطولة (عربي)'], type: 'text', req: true },
  ],
}

export const branchFields: Field[] = [
  order, published,
  { key: 'name_en', label: ['Name (English)', 'الاسم (إنجليزي)'], type: 'text', req: true },
  { key: 'name_ar', label: ['Name (Arabic)', 'الاسم (عربي)'], type: 'text', req: true },
  { key: 'address_en', label: ['Address (English)', 'العنوان (إنجليزي)'], type: 'text' },
  { key: 'address_ar', label: ['Address (Arabic)', 'العنوان (عربي)'], type: 'text' },
  { key: 'phone', label: ['Phone', 'الهاتف'], type: 'text' },
  { key: 'map_url', label: ['Google Maps link', 'رابط خرائط جوجل'], type: 'text' },
  { key: 'hours_en', label: ['Hours (English)', 'المواعيد (إنجليزي)'], type: 'text' },
  { key: 'hours_ar', label: ['Hours (Arabic)', 'المواعيد (عربي)'], type: 'text' },
]
export const branchDefaults = { is_published: true, sort_order: 0 }

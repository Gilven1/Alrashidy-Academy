export const locales = ['en', 'ar'] as const
export type Locale = (typeof locales)[number]
export const asLocale = (l: string): Locale => (l === 'ar' ? 'ar' : 'en')
export const dirOf = (l: Locale) => (l === 'ar' ? 'rtl' : 'ltr')

/** Pick the English or Arabic version of a bilingual DB field: t(row, 'name', locale) */
export const t = <T extends Record<string, any>>(row: T, key: string, l: Locale) =>
  ((row[`${key}_${l}`] || row[`${key}_en`]) ?? '') as string

export const ui = {
  en: {
    home: 'Home', coaches: 'Coaches', heroes: 'Heroes', contact: 'Contact', joinUs: 'Join us', meetCoaches: 'Meet the coaches',
    viewAll: 'View all coaches', ourCoaches: 'Our coaches', assistants: 'Assistant coaches', about: 'About the academy',
    hotm: 'Hero of the month', seeHeroes: 'See all heroes', locations: 'Locations', contactTitle: 'Contact us', viewCv: 'View profile',
    name: 'Your name', phone: 'Phone', email: 'Email', message: 'Message', send: 'Send message', sent: 'Message sent. We will get back to you.',
    sendError: 'Could not send. Try again or call us.', skills: 'Skills', years: 'Years of experience', record: 'Fight record',
    wins: 'Wins', losses: 'Losses', draws: 'Draws', tournament: 'Tournaments', certification: 'Certifications', belt: 'Belts',
    close: 'Close', allYears: 'All years', allClasses: 'All weight classes', year: 'Year', weightClass: 'Weight class',
    titles: 'titles', heroesTitle: 'Our champions', noHeroes: 'No champions match these filters.', hours: 'Hours', openMap: 'Open in Maps',
    call: 'Call', whatsapp: 'WhatsApp', rights: 'All rights reserved.', gold: 'Gold', silver: 'Silver', bronze: 'Bronze', coachesPageTitle: 'Coaches & assistant coaches', latest: 'Latest titles',
  },
  ar: {
    home: 'الرئيسية', coaches: 'المدربون', heroes: 'الأبطال', contact: 'تواصل معنا', joinUs: 'انضم إلينا', meetCoaches: 'تعرّف على المدربين',
    viewAll: 'عرض كل المدربين', ourCoaches: 'مدربونا', assistants: 'مساعدو المدربين', about: 'عن الأكاديمية',
    hotm: 'بطل الشهر', seeHeroes: 'كل الأبطال', locations: 'فروعنا', contactTitle: 'تواصل معنا', viewCv: 'عرض الملف',
    name: 'الاسم', phone: 'الهاتف', email: 'البريد الإلكتروني', message: 'الرسالة', send: 'إرسال', sent: 'تم إرسال رسالتك. سنتواصل معك قريبًا.',
    sendError: 'تعذر الإرسال. حاول مرة أخرى أو اتصل بنا.', skills: 'المهارات', years: 'سنوات الخبرة', record: 'سجل النزالات',
    wins: 'فوز', losses: 'خسارة', draws: 'تعادل', tournament: 'البطولات', certification: 'الشهادات', belt: 'الأحزمة',
    close: 'إغلاق', allYears: 'كل السنوات', allClasses: 'كل الأوزان', year: 'السنة', weightClass: 'الوزن',
    titles: 'ألقاب', heroesTitle: 'أبطالنا', noHeroes: 'لا يوجد أبطال مطابقون لهذا الفلتر.', hours: 'المواعيد', openMap: 'افتح الخريطة',
    call: 'اتصل', whatsapp: 'واتساب', rights: 'جميع الحقوق محفوظة.', gold: 'ذهبية', silver: 'فضية', bronze: 'برونزية', coachesPageTitle: 'المدربون ومساعدو المدربين', latest: 'أحدث الألقاب',
  },
} as const

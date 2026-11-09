import { Playfair_Display, Amiri, IBM_Plex_Sans_Arabic } from 'next/font/google'

// Display: refined serif (matches the italic serif in the logo). Arabic glyphs fall back to Amiri automatically.
const displayLatin = Playfair_Display({ subsets: ['latin'], variable: '--font-display-latin', weight: ['500', '600', '700'], style: ['normal', 'italic'] })
const displayAr = Amiri({ subsets: ['arabic'], variable: '--font-display-ar', weight: ['400', '700'] })
// Body: clean sans that covers both Latin and Arabic
const bodyUi = IBM_Plex_Sans_Arabic({ subsets: ['arabic', 'latin'], variable: '--font-body-ui', weight: ['300', '400', '500', '600'] })

export const fontVars = `${displayLatin.variable} ${displayAr.variable} ${bodyUi.variable}`

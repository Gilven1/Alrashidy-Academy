/* eslint-disable @next/next/no-img-element */
export default function Photo({ src, alt, className = '' }: { src?: string | null; alt: string; className?: string }) {
  if (src) return <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />
  return (
    <div aria-hidden className={`grid place-items-center bg-coal text-ash ${className}`}>
      <svg viewBox="0 0 24 24" className="w-1/3" fill="currentColor"><circle cx="12" cy="8" r="4.5" /><path d="M3 22c0-5 4-8 9-8s9 3 9 8z" /></svg>
    </div>
  )
}

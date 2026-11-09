'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, duration: 1.15, anchors: { offset: -72 } })
    return () => lenis.destroy()
  }, [])
  return null
}

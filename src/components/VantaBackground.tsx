'use client'

import { useEffect, useRef } from 'react'

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const s = document.createElement('script')
        s.src = src
        s.async = true
        s.onload = () => resolve()
        s.onerror = reject
        document.head.appendChild(s)
      })

    const init = async () => {
      try {
        if (!(window as any).THREE) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js')
        }
        if (!(window as any).VANTA) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js')
        }

        if (vantaRef.current) {
          const effect = (window as any).VANTA.BIRDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 300,
            minWidth: 300,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0xf8f6f0,
            color1: 0xd4af37,
            color2: 0x1a2332,
            quantity: 3,
          })

          return () => effect.destroy()
        }
      } catch (err) {
        console.error('VANTA init failed', err)
      }
    }

    init()
  }, [])

  return <div ref={vantaRef} className="vanta-bg absolute inset-0" />
}

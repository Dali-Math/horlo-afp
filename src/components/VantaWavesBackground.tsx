'use client'
import { useEffect, useRef } from 'react'

export default function VantaWavesBG() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const effect = useRef<any>(null)

  useEffect(() => {
    function loadScript(src: string) {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error(`Erreur chargement ${src}`))
        document.head.appendChild(script)
      })
    }
    async function initVanta() {
      if (!(window as any).THREE) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js')
      }
      if (!(window as any).VANTA || !(window as any).VANTA.WAVES) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.waves.min.js')
      }
      if (vantaRef.current && (window as any).VANTA?.WAVES) {
        effect.current = (window as any).VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x1a2332,
          shininess: 30.0,
          waveHeight: 15.0,
          waveSpeed: 0.75,
          zoom: 0.65,
        })
      }
    }
    initVanta()
    return () => {
      effect.current?.destroy && effect.current.destroy()
      effect.current = null
    }
  }, [])

  return <div ref={vantaRef} className="vanta-bg absolute inset-0 w-full h-full z-0" />
}

'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ThreeSceneProps {
  isDark: boolean
}

export default function ThreeScene({ isDark }: ThreeSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0xd4af37, 1, 100)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 100)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    // Fonction pour créer un engrenage
    const createGear = (radius: number, thickness: number, teeth: number) => {
      const group = new THREE.Group()
      
      const bodyGeometry = new THREE.TorusGeometry(radius, thickness, 16, 100)
      const material = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.8,
        roughness: 0.2,
      })
      const body = new THREE.Mesh(bodyGeometry, material)
      group.add(body)

      for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * Math.PI * 2
        const toothGeometry = new THREE.BoxGeometry(0.1, thickness * 2, 0.15)
        const tooth = new THREE.Mesh(toothGeometry, material)
        tooth.position.x = Math.cos(angle) * (radius + thickness)
        tooth.position.y = Math.sin(angle) * (radius + thickness)
        tooth.rotation.z = angle
        group.add(tooth)
      }

      return group
    }

    const gear1 = createGear(1.5, 0.2, 24)
    gear1.position.set(-3, 2, 0)
    scene.add(gear1)

    const gear2 = createGear(1.2, 0.18, 24)
    gear2.position.set(3, 1, 0)
    scene.add(gear2)

    const gear3 = createGear(1, 0.15, 24)
    gear3.position.set(-2, -2, 0)
    scene.add(gear3)

    const gear4 = createGear(1.3, 0.2, 24)
    gear4.position.set(2.5, -1.5, 0)
    scene.add(gear4)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    let reqId: number | null = null

    const animate = () => {
      reqId = requestAnimationFrame(animate)

      gear1.rotation.z += 0.005
      gear2.rotation.z -= 0.008
      gear3.rotation.z += 0.01
      gear4.rotation.z -= 0.012

      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.05
      camera.position.y += (mouseRef.current.y * 0.5 - camera.position.y) * 0.05

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      // Annuler l'animation
      if (reqId !== null) cancelAnimationFrame(reqId)

      // Supprimer et disposer proprement des géométries et matériaux pour éviter les fuites mémoire
      scene.traverse((object) => {
        // @ts-ignore
        if (object.isMesh) {
          const mesh = object as THREE.Mesh
          if (mesh.geometry) mesh.geometry.dispose()
          // @ts-ignore
          if (mesh.material) {
            // material peut être un tableau
            const mat: any = mesh.material
            if (Array.isArray(mat)) {
              mat.forEach((m) => m.dispose && m.dispose())
            } else if (mat.dispose) {
              mat.dispose()
            }
          }
        }
      })

      try {
        renderer.dispose()
        // retire le canvas WebGL du DOM si nécessaire
        if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas)
      } catch (e) {
        // ignore
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

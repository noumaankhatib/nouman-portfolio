'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth < 1024
    const PARTICLE_COUNT = isMobile ? 0 : isTablet ? 400 : 900

    if (PARTICLE_COUNT === 0) return

    const CONNECTION_DISTANCE = 120
    const FIELD_SIZE = 600
    let disposed = false
    let rafId: number

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x050510, 0.0012)

    const width = container.clientWidth
    const height = container.clientHeight

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000)
    camera.position.set(0, 0, 500)

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Particles
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)

    const colorPalette = [
      new THREE.Color(0x3b82f6),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0x00ff88),
    ]

    const velocities: { x: number; y: number; z: number }[] = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      positions[i3]     = (Math.random() - 0.5) * FIELD_SIZE
      positions[i3 + 1] = (Math.random() - 0.5) * FIELD_SIZE
      positions[i3 + 2] = (Math.random() - 0.5) * FIELD_SIZE

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i3]     = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      sizes[i] = Math.random() * 3 + 1

      velocities.push({
        x: (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.3,
        z: (Math.random() - 0.5) * 0.15,
      })
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const vertexShader = `
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `

    const fragmentShader = `
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.2, 0.5, d);
        gl_FragColor = vec4(vColor, alpha * 0.8);
      }
    `

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const pointCloud = new THREE.Points(geometry, material)
    scene.add(pointCloud)

    // Connection lines
    const maxConnections = 500
    const lineGeometry = new THREE.BufferGeometry()
    const linePositions = new Float32Array(maxConnections * 6)
    const lineColors = new Float32Array(maxConnections * 6)

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))
    lineGeometry.setDrawRange(0, 0)

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(linesMesh)

    const updateConnections = () => {
      const pos = pointCloud.geometry.attributes.position.array as Float32Array
      const lpos = linesMesh.geometry.attributes.position.array as Float32Array
      const lcol = linesMesh.geometry.attributes.color.array as Float32Array
      let lineIndex = 0
      const distSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE
      const step = PARTICLE_COUNT > 600 ? 3 : 2

      for (let i = 0; i < PARTICLE_COUNT && lineIndex < maxConnections; i += step) {
        const i3 = i * 3
        for (let j = i + 1; j < PARTICLE_COUNT && lineIndex < maxConnections; j += step) {
          const j3 = j * 3
          const dx = pos[i3]     - pos[j3]
          const dy = pos[i3 + 1] - pos[j3 + 1]
          const dz = pos[i3 + 2] - pos[j3 + 2]
          const d2 = dx * dx + dy * dy + dz * dz

          if (d2 < distSq) {
            const alpha = 1 - d2 / distSq
            const li = lineIndex * 6
            lpos[li]     = pos[i3];     lpos[li + 1] = pos[i3 + 1]; lpos[li + 2] = pos[i3 + 2]
            lpos[li + 3] = pos[j3];     lpos[li + 4] = pos[j3 + 1]; lpos[li + 5] = pos[j3 + 2]
            lcol[li]     = 0.23 * alpha; lcol[li + 1] = 0.51 * alpha; lcol[li + 2] = 0.96 * alpha
            lcol[li + 3] = 0.66 * alpha; lcol[li + 4] = 0.33 * alpha; lcol[li + 5] = 0.97 * alpha
            lineIndex++
          }
        }
      }

      linesMesh.geometry.setDrawRange(0, lineIndex * 2)
      linesMesh.geometry.attributes.position.needsUpdate = true
      linesMesh.geometry.attributes.color.needsUpdate = true
    }

    // Mouse parallax
    const mouse = { x: 0, y: 0 }
    const targetMouse = { x: 0, y: 0 }
    const onMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Resize
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // Animation loop
    const clock = new THREE.Clock()
    const animate = () => {
      if (disposed) return
      rafId = requestAnimationFrame(animate)

      const elapsed = clock.getElapsedTime()
      const pos = pointCloud.geometry.attributes.position.array as Float32Array

      mouse.x += (targetMouse.x - mouse.x) * 0.05
      mouse.y += (targetMouse.y - mouse.y) * 0.05

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        const v = velocities[i]
        pos[i3]     += v.x
        pos[i3 + 1] += v.y
        pos[i3 + 2] += v.z

        const half = FIELD_SIZE / 2
        if (Math.abs(pos[i3])     > half) v.x *= -1
        if (Math.abs(pos[i3 + 1]) > half) v.y *= -1
        if (Math.abs(pos[i3 + 2]) > half) v.z *= -1
      }

      pointCloud.geometry.attributes.position.needsUpdate = true

      if (Math.floor(elapsed * 30) % 2 === 0) {
        updateConnections()
      }

      camera.position.x += (mouse.x * 60 - camera.position.x) * 0.02
      camera.position.y += (mouse.y * 40 - camera.position.y) * 0.02
      pointCloud.rotation.y = elapsed * 0.03
      pointCloud.rotation.x = Math.sin(elapsed * 0.02) * 0.1

      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      disposed = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      if (renderer.domElement.parentNode) {
        renderer.domElement.remove()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

'use client'
import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Points, Float32BufferAttribute, Color, AdditiveBlending } from 'three'
import { calculateBrightness } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import ConstellationLines from './ConstellationLines'
import GalaxyLabels from './GalaxyLabels'

interface Star {
    id: string
    position: [number, number, number]
    isLocked: boolean
    likes: number
    category?: string
}

export default function StarField() {
    const pointsRef = useRef<Points>(null)
    const [stars, setStars] = useState<Star[]>([])
    const { selectStar, constellationMode } = useAppStore()
    const { raycaster } = useThree()

    // Fetch stars on mount
    useEffect(() => {
        fetch('/api/messages')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }
                const contentType = res.headers.get('content-type')
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Response is not JSON')
                }
                return res.json()
            })
            .then(data => {
                if (Array.isArray(data)) setStars(data)
            })
            .catch(err => {
                console.error('Failed to fetch stars:', err)
                // Set empty array on error to prevent app crash
                setStars([])
            })
    }, [])

    // Fix Interaction: Increase raycaster threshold for Points so they are clickable
    useEffect(() => {
        raycaster.params.Points.threshold = 20
    }, [raycaster])

    // Calculate star counts by category
    const starCounts = useMemo(() => {
        const counts: Record<string, number> = {
            hope: 0,
            regret: 0,
            advice: 0,
            dream: 0,
            gratitude: 0
        }
        stars.forEach(star => {
            if (star.category && counts[star.category] !== undefined) {
                counts[star.category]++
            }
        })
        return counts
    }, [stars])

    // Create geometry and attributes
    const { positions, colors, sizes, ids } = useMemo(() => {
        const positions: number[] = []
        const colors: number[] = []
        const sizes: number[] = []
        const ids: string[] = []

        const categoryColors: Record<string, string> = {
            hope: '#fbbf24',
            regret: '#8b5cf6',
            advice: '#3b82f6',
            dream: '#ec4899',
            gratitude: '#10b981'
        }

        stars.forEach((star) => {
            positions.push(star.position[0], star.position[1], star.position[2])

            const colorHex = star.category
                ? categoryColors[star.category] || '#ffeebb'
                : (star.isLocked ? '#88ccff' : '#ffeebb')

            const color = new Color(colorHex)
            const brightness = calculateBrightness(star.isLocked, star.likes)
            color.multiplyScalar(brightness * 1.5)
            colors.push(color.r, color.g, color.b)

            sizes.push(star.isLocked ? 30.0 : 45.0)
            ids.push(star.id)
        })

        return {
            positions: new Float32BufferAttribute(positions, 3),
            colors: new Float32BufferAttribute(colors, 3),
            sizes: new Float32BufferAttribute(sizes, 1),
            ids
        }
    }, [stars])

    const shaderRef = useRef<any>(null)

    // Animate star pulsing
    useFrame((state) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime
        }
    })

    return (
        <>
            {/* Visual Points for glow effect */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[positions.array, 3]} />
                    <bufferAttribute attach="attributes-color" args={[colors.array, 3]} />
                    <bufferAttribute attach="attributes-size" args={[sizes.array, 1]} />
                </bufferGeometry>
                <shaderMaterial
                    ref={shaderRef}
                    transparent
                    depthWrite={false}
                    blending={AdditiveBlending}
                    uniforms={{
                        uTime: { value: 0 }
                    }}
                    vertexShader={`
                        uniform float uTime;
                        attribute float size;
                        attribute vec3 color;
                        varying vec3 vColor;
                        void main() {
                            vColor = color;
                            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                            
                            // Subtle pulsing effect
                            float pulse = 1.0 + sin(uTime * 0.5 + position.x * 0.1) * 0.1;
                            gl_PointSize = size * pulse * (300.0 / -mvPosition.z);
                            gl_Position = projectionMatrix * mvPosition;
                        }
                    `}
                    fragmentShader={`
                        varying vec3 vColor;
                        void main() {
                            float r = distance(gl_PointCoord, vec2(0.5));
                            if (r > 0.5) discard;
                            
                            // Enhanced glow with soft falloff
                            float alpha = 1.0 - (r * 2.0);
                            alpha = pow(alpha, 1.5);
                            
                            // Add subtle core brightness
                            float core = 1.0 - smoothstep(0.0, 0.3, r);
                            vec3 finalColor = vColor * (1.0 + core * 0.5);
                            
                            gl_FragColor = vec4(finalColor, alpha);
                        }
                    `}
                />
            </points>

            {/* Invisible spheres for click detection */}
            {stars.map((star) => (
                <mesh
                    key={star.id}
                    position={star.position}
                    onClick={(e) => {
                        e.stopPropagation()
                        selectStar(star.id)
                    }}
                    onPointerOver={() => document.body.style.cursor = 'pointer'}
                    onPointerOut={() => document.body.style.cursor = 'default'}
                >
                    <sphereGeometry args={[2, 8, 8]} />
                    <meshBasicMaterial visible={false} />
                </mesh>
            ))}

            {/* Constellation Lines */}
            <ConstellationLines stars={stars} visible={constellationMode} />

            {/* Galaxy Labels */}
            <GalaxyLabels starCounts={starCounts} />
        </>
    )
}

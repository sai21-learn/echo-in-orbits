'use client'
import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Points, BufferGeometry, Float32BufferAttribute, Color, AdditiveBlending, TextureLoader, ShaderMaterial } from 'three'
import { calculateBrightness } from '@/lib/utils'
import { useAppStore } from '@/lib/store'

interface Star {
    id: string
    position: [number, number, number]
    isLocked: boolean
    likes: number
}

export default function StarField() {
    const pointsRef = useRef<Points>(null)
    const [stars, setStars] = useState<Star[]>([])
    const { selectStar } = useAppStore()
    const { camera, raycaster } = useThree()

    // Fetch stars on mount (Restored)
    useEffect(() => {
        fetch('/api/messages')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setStars(data)
            })
            .catch(err => console.error('Failed to fetch stars:', err))
    }, [])

    // Fix Interaction: Increase raycaster threshold for Points so they are clickable
    useEffect(() => {
        raycaster.params.Points.threshold = 20; // Increased for easier clicking
    }, [raycaster])

    // Create geometry and attributes
    const { positions, colors, sizes, ids } = useMemo(() => {
        const positions: number[] = []
        const colors: number[] = []
        const sizes: number[] = []
        const ids: string[] = []

        stars.forEach((star) => {
            // Use actual 3D positions from Galaxy algorithm
            positions.push(star.position[0], star.position[1], star.position[2])

            // Get category color or default
            const categoryColors: Record<string, string> = {
                hope: '#fbbf24',      // Amber
                regret: '#8b5cf6',    // Purple
                advice: '#3b82f6',    // Blue
                dream: '#ec4899',     // Pink
                gratitude: '#10b981'  // Green
            }

            const colorHex = (star as any).category
                ? categoryColors[(star as any).category] || '#ffeebb'
                : (star.isLocked ? '#88ccff' : '#ffeebb')

            const color = new Color(colorHex)
            const brightness = calculateBrightness(star.isLocked, star.likes)

            // Apply brightness multiplier
            color.multiplyScalar(brightness * 1.5)
            colors.push(color.r, color.g, color.b)

            // Locked stars smaller, unlocked bigger
            sizes.push(star.isLocked ? 15.0 : 25.0)
            ids.push(star.id)
        })

        return {
            positions: new Float32BufferAttribute(positions, 3),
            colors: new Float32BufferAttribute(colors, 3),
            sizes: new Float32BufferAttribute(sizes, 1),
            ids
        }
    }, [stars])

    useFrame((state) => {
        // Optional: Twinkle effect or drift
    })

    // Raycasting logic for Points is tricky. 
    // We'll stick to Points for visual but use invisible spheres for interaction if needed, 
    // OR use local raycasting helper.
    // For simplicity and performance with < 1000 stars, let's Stick to InstancedMesh but with a sprite texture.
    // Wait, User asked for "glow". 
    // Let's revert to InstancedMesh but use a PLANE geometry with a texture, always facing camera (Billboarding).

    // Actually, Points are fastest and easiest for "Glow".
    // But click detection on Points requires `threshold` adjustments.

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
                    transparent
                    depthWrite={false}
                    blending={AdditiveBlending}
                    vertexShader={`
                        attribute float size;
                        attribute vec3 color;
                        varying vec3 vColor;
                        void main() {
                            vColor = color;
                            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                            gl_PointSize = size * (300.0 / -mvPosition.z);
                            gl_Position = projectionMatrix * mvPosition;
                        }
                    `}
                    fragmentShader={`
                        varying vec3 vColor;
                        void main() {
                            // Soft circle glow
                            float r = distance(gl_PointCoord, vec2(0.5));
                            if (r > 0.5) discard;
                            float alpha = 1.0 - (r * 2.0);
                            alpha = pow(alpha, 2.0);
                            gl_FragColor = vec4(vColor, alpha);
                        }
                    `}
                />
            </points>

            {/* Invisible spheres for click detection */}
            {stars.map((star, index) => (
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
        </>
    )
}

'use client'

import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

interface Star {
    id: string
    position: [number, number, number]
    category?: string
}

interface ConstellationLinesProps {
    stars: Star[]
    visible: boolean
}

export default function ConstellationLines({ stars, visible }: ConstellationLinesProps) {
    const linesByGalaxy = useMemo(() => {
        if (!visible) return []

        // Group stars by category
        const galaxies: Record<string, Star[]> = {}
        stars.forEach(star => {
            const category = star.category || 'unknown'
            if (!galaxies[category]) galaxies[category] = []
            galaxies[category].push(star)
        })

        const categoryColors: Record<string, string> = {
            hope: '#fbbf24',
            regret: '#8b5cf6',
            advice: '#C7D9FF',
            dream: '#FFF1C1',
            gratitude: '#4adbebf1'
        }

        const lines: Array<{ points: THREE.Vector3[], color: string }> = []

        // Create lines between nearby stars in same galaxy
        Object.entries(galaxies).forEach(([category, galaxyStars]) => {
            const color = categoryColors[category] || '#ffffff'

            // Connect each star to its 2-3 nearest neighbors
            galaxyStars.forEach((star, i) => {
                const starPos = new THREE.Vector3(...star.position)

                // Find nearest neighbors
                const distances = galaxyStars
                    .map((other, j) => ({
                        index: j,
                        distance: starPos.distanceTo(new THREE.Vector3(...other.position))
                    }))
                    .filter(d => d.index !== i)
                    .sort((a, b) => a.distance - b.distance)
                    .slice(0, 2) // Connect to 2 nearest

                distances.forEach(({ index }) => {
                    const otherPos = new THREE.Vector3(...galaxyStars[index].position)
                    // Only draw if distance is reasonable (not too far)
                    if (starPos.distanceTo(otherPos) < 150) {
                        lines.push({
                            points: [starPos, otherPos],
                            color
                        })
                    }
                })
            })
        })

        return lines
    }, [stars, visible])

    if (!visible) return null

    return (
        <group>
            {linesByGalaxy.map((line, i) => (
                <Line
                    key={i}
                    points={line.points}
                    color={line.color}
                    lineWidth={0.5}
                    transparent
                    opacity={0.15}
                    dashed={false}
                />
            ))}
        </group>
    )
}

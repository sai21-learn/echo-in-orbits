'use client'

import { useMemo } from 'react'
import * as THREE from 'three'

export default function DomeGrid() {
    const gridGeometry = useMemo(() => {
        const radius = 200 // Match sphere radius
        const segments = 24
        const rings = 12

        const vertices: number[] = []

        // Radial lines (longitude)
        for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * Math.PI * 2
            for (let j = 0; j <= rings; j++) {
                const phi = (j / rings) * Math.PI
                const x = radius * Math.sin(phi) * Math.cos(angle)
                const y = radius * Math.sin(phi) * Math.sin(angle)
                const z = radius * Math.cos(phi)
                vertices.push(x, y, z)
            }
        }

        // Latitude lines (rings)
        for (let i = 1; i < rings; i++) {
            const phi = (i / rings) * Math.PI
            for (let j = 0; j <= segments; j++) {
                const angle = (j / segments) * Math.PI * 2
                const x = radius * Math.sin(phi) * Math.cos(angle)
                const y = radius * Math.sin(phi) * Math.sin(angle)
                const z = radius * Math.cos(phi)
                vertices.push(x, y, z)
            }
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

        return geometry
    }, [])

    return (
        <points geometry={gridGeometry}>
            <pointsMaterial
                size={1}
                color="#ffffff"
                transparent
                opacity={0.05}
                sizeAttenuation={false}
            />
        </points>
    )
}

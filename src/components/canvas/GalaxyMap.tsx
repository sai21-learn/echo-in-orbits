'use client'

import { useThree, useFrame } from '@react-three/fiber'
import { useState } from 'react'

const CATEGORIES = {
    hope: { label: 'Hope', emoji: '✨', color: '#fbbf24', x: 50, y: 40 },
    regret: { label: 'Regret', emoji: '💭', color: '#8b5cf6', x: -50, y: 40 },
    advice: { label: 'Advice', emoji: '💡', color: '#f63b3bff', x: 0, y: -40 },
    dream: { label: 'Dream', emoji: '🌙', color: '#67d1e9ff', x: 50, y: -40 },
    gratitude: { label: 'Gratitude', emoji: '🙏', color: '#b91010ff', x: -50, y: -40 }
}

export default function GalaxyMap() {
    const { camera } = useThree()
    const [cameraPos, setCameraPos] = useState({ x: 0, y: 0, z: 0 })

    useFrame(() => {
        setCameraPos({
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        })
    })

    return null // Render nothing in 3D space, use UI overlay instead
}

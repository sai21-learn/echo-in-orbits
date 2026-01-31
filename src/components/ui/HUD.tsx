'use client'
import { useState, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function HUD() {
    const { camera } = useThree()
    const [coords, setCoords] = useState({ az: 0, el: 0 })

    useFrame(() => {
        const vector = new THREE.Vector3(0, 0, -1)
        vector.applyQuaternion(camera.quaternion)

        // Azimuth (0-360)
        let az = Math.atan2(vector.x, vector.z) * (180 / Math.PI)
        if (az < 0) az += 360

        // Elevation (-90 to 90)
        const el = Math.asin(vector.y) * (180 / Math.PI)

        // Update every few frames to reduce React renders (could be optimized further)
        // For now, doing it via state is fine for low frequency
        if (Math.abs(az - coords.az) > 0.1 || Math.abs(el - coords.el) > 0.1) {
            setCoords({ az, el })
        }
    })

    // We need to render this OUTSIDE the Canvas or use <Html>.
    // Since this component uses `useThree`, it MUST be inside Canvas.
    // But we want UI. So we use Drei's <Html> or just pass data out?
    // Let's use <Html fullscreen> for overlay from within Canvas.
    return null
}

// Separate component for the actual DOM UI, to be mounted outside Canvas but receiving data?
// Or just put it inside for simplicity.

'use client'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore } from '@/lib/store'
import { useRef, useMemo } from 'react'

export default function Tracker() {
    const { camera, raycaster, pointer } = useThree()
    const { setCoordinates } = useAppStore()
    const frameCount = useRef(0)

    // Create a virtual plane for raycasting (Z=0)
    const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])
    const target = useMemo(() => new THREE.Vector3(), [])

    useFrame(() => {
        frameCount.current += 1
        if (frameCount.current % 5 !== 0) return

        // Update raycaster with current pointer
        raycaster.setFromCamera(pointer, camera)

        // Raycast against the Z=0 plane
        const intersection = raycaster.ray.intersectPlane(plane, target)

        if (intersection) {
            // Azimuth (0-360) from Center
            let az = Math.atan2(target.y, target.x) * (180 / Math.PI)
            if (az < 0) az += 360

            // Distance from center
            const dist = Math.sqrt(target.x * target.x + target.y * target.y)

            setCoordinates(Math.round(az), Math.round(dist))
        }
    })

    return null
}

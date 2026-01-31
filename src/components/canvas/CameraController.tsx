'use client'
import { useRef, useEffect } from 'react'
import { extend, useThree, useFrame } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import * as THREE from 'three'

CameraControls.install({ THREE: THREE })
extend({ CameraControls })

export default function CameraController() {
    const ref = useRef<CameraControls>(null)
    const camera = useThree((state) => state.camera)
    const gl = useThree((state) => state.gl)

    useFrame((state, delta) => {
        ref.current?.update(delta)
    })

    // Force camera to look at center on mount
    useEffect(() => {
        if (ref.current) {
            ref.current.setLookAt(0, 0, 400, 0, 0, 0, true) // Position (0,0,400), Target (0,0,0)
        }
    }, [])

    return (
        // @ts-ignore - TS doesn't know about the extended primitive
        <cameraControls
            ref={ref}
            args={[camera, gl.domElement]}
            minDistance={1}
            maxDistance={1000}
            dollySpeed={0.5}
            truckSpeed={0.5}
        />
    )
}

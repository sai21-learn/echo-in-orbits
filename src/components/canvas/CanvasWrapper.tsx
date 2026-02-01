'use client'
import { Canvas } from '@react-three/fiber'
import { useState, useEffect } from 'react'
import StarField from './StarField'
import CameraController from './CameraController'
import Background from './Background'
import CosmicBackground from './CosmicBackground'
import DomeGrid from './DomeGrid'
import GalaxyMap from './GalaxyMap'
import Tracker from './Tracker'

export default function CanvasWrapper() {
    const [webglError, setWebglError] = useState(false)

    useEffect(() => {
        // Check WebGL support
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        if (!gl) {
            setWebglError(true)
        }
    }, [])

    if (webglError) {
        return (
            <div className="absolute top-0 left-0 w-full h-full z-0 bg-black flex items-center justify-center p-8">
                <div className="max-w-2xl space-y-6 text-center">
                    <div className="text-6xl mb-4">🌌</div>
                    <h1 className="text-3xl font-light text-white tracking-wider">WebGL Not Available</h1>
                    <p className="text-white/60 font-light leading-relaxed">
                        Your browser or system doesn't support WebGL, which is required for the 3D planetarium experience.
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-left space-y-3">
                        <h2 className="text-sm font-medium text-white/80 tracking-wider uppercase mb-3">Troubleshooting Steps:</h2>
                        <ul className="space-y-2 text-sm text-white/60 font-light">
                            <li className="flex items-start gap-2">
                                <span className="text-white/30 shrink-0">1.</span>
                                <span>Try a different browser (Chrome, Firefox, or Edge recommended)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-white/30 shrink-0">2.</span>
                                <span>Enable hardware acceleration in your browser settings</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-white/30 shrink-0">3.</span>
                                <span>Update your graphics drivers</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-white/30 shrink-0">4.</span>
                                <span>If using a VM or remote desktop, WebGL may not be supported</span>
                            </li>
                        </ul>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-white text-black rounded-full font-light uppercase tracking-widest text-sm hover:bg-white/90 transition-all"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-black">
            <Canvas
                camera={{ position: [0, 0, 0], fov: 75 }}
                gl={{ antialias: true, alpha: false }}
                dpr={[1, 2]}
                onCreated={({ gl }) => {
                    console.log('WebGL Renderer created successfully')
                }}
                onError={(error) => {
                    console.error('Canvas error:', error)
                    setWebglError(true)
                }}
            >
                <CosmicBackground />
                <Background />
                <DomeGrid />
                <StarField />
                <CameraController />
                <GalaxyMap />
                <Tracker />
                <ambientLight intensity={0.1} />
            </Canvas>
        </div>
    )
}

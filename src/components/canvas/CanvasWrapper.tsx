'use client'
import { Canvas } from '@react-three/fiber'
import StarField from './StarField'
import CameraController from './CameraController'
import Background from './Background'
import CosmicBackground from './CosmicBackground'
import GalaxyMap from './GalaxyMap'
import Tracker from './Tracker'

export default function CanvasWrapper() {
    return (
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-black">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ antialias: true, alpha: false }}
                dpr={[1, 2]}
            >
                <CosmicBackground />
                <Background />
                <StarField />
                <CameraController />
                <GalaxyMap />
                <Tracker />
                <ambientLight intensity={0.1} />
            </Canvas>
        </div>
    )
}

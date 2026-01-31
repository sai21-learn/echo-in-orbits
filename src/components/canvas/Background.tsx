'use client'
import { Stars, Environment } from '@react-three/drei'

export default function Background() {
    return (
        <>
            <color attach="background" args={['#020205']} />

            {/* Distant background stars - dim and sparse */}
            <Stars
                radius={300}
                depth={100}
                count={500}
                factor={2}
                saturation={0}
                fade
                speed={0.2}
            />

            {/* Subtle fog to blend distance - Push start back to 200 */}
            <fog attach="fog" args={['#020205', 200, 800]} />
        </>
    )
}

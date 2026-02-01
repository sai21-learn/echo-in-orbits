'use client'

import { Html } from '@react-three/drei'

const GALAXY_INFO = {
    hope: {
        name: 'Hope Nebula',
        color: '#fbbf24',
        position: [140, 100, 0] as [number, number, number],
        description: 'Dreams and aspirations'
    },
    regret: {
        name: 'Regret Cluster',
        color: '#8b5cf6',
        position: [-140, 100, 0] as [number, number, number],
        description: 'Reflections and lessons'
    },
    advice: {
        name: 'Wisdom Constellation',
        color: '#3b82f6',
        position: [0, 100, -140] as [number, number, number],
        description: 'Guidance for the future'
    },
    dream: {
        name: 'Dream Galaxy',
        color: '#ec4899',
        position: [0, 100, 140] as [number, number, number],
        description: 'Visions and ambitions'
    },
    gratitude: {
        name: 'Gratitude Expanse',
        color: '#10b981',
        position: [0, -140, 0] as [number, number, number],
        description: 'Appreciation and thanks'
    }
}

interface GalaxyLabelsProps {
    starCounts: Record<string, number>
}

export default function GalaxyLabels({ starCounts }: GalaxyLabelsProps) {
    return (
        <>
            {Object.entries(GALAXY_INFO).map(([key, info]) => (
                <Html
                    key={key}
                    position={info.position}
                    center
                    distanceFactor={100}
                    style={{
                        pointerEvents: 'none',
                        userSelect: 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <div className="flex flex-col items-center gap-1">
                        <div
                            className="text-2xl font-light tracking-[0.3em] uppercase"
                            style={{
                                color: info.color,
                                textShadow: `0 0 20px ${info.color}80, 0 0 40px ${info.color}40`,
                                filter: 'blur(0.3px)'
                            }}
                        >
                            {info.name}
                        </div>
                        <div className="text-xs text-white/40 font-light tracking-widest">
                            {starCounts[key] || 0} ECHOES
                        </div>
                        <div className="text-[10px] text-white/20 font-light italic max-w-[200px] text-center mt-1">
                            {info.description}
                        </div>
                    </div>
                </Html>
            ))}
        </>
    )
}

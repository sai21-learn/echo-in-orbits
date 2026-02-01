'use client'

import { useAppStore } from '@/lib/store'

export default function PlanetariumHUD() {
    const { constellationMode, toggleConstellationMode } = useAppStore()

    return (
        <>
            {/* Top-Left: Controls */}
            <div className="absolute top-8 left-8 z-20 space-y-4">
                {/* Logo/Title */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-light tracking-[0.4em] text-white/90 uppercase">
                        Echoes
                    </h1>
                    <p className="text-[10px] text-white/30 tracking-[0.3em] uppercase font-light">
                        Cosmic Observatory
                    </p>
                </div>

                {/* Constellation Toggle */}
                <button
                    onClick={toggleConstellationMode}
                    className="group flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all"
                >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${constellationMode
                        ? 'border-white bg-white'
                        : 'border-white/30 bg-transparent'
                        }`}>
                        {constellationMode && (
                            <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                    <span className="text-sm text-white/70 group-hover:text-white/90 font-light tracking-wider transition-colors">
                        Constellation Lines
                    </span>
                </button>
            </div>

            {/* Bottom-Right: Controls Instructions */}
            <div className="absolute bottom-8 right-8 z-20">
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-4 space-y-3 max-w-[280px]">
                    <div className="text-[10px] text-white/30 tracking-[0.3em] uppercase font-light mb-3">
                        Controls
                    </div>

                    {/* Touch Controls */}
                    <div className="space-y-2">
                        <div className="text-[9px] text-white/40 tracking-wider uppercase font-medium mb-1.5">Touch</div>
                        <div className="space-y-1.5 text-[11px] text-white/60 font-light">
                            <div className="flex items-start gap-2">
                                <span className="text-white/30 shrink-0">•</span>
                                <span>Pinch two fingers to zoom in/out</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-white/30 shrink-0">•</span>
                                <span>Drag one finger to rotate view</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-white/30 shrink-0">•</span>
                                <span>Tap star to view echo</span>
                            </div>
                        </div>
                    </div>

                    {/* Mouse Controls */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                        <div className="text-[9px] text-white/40 tracking-wider uppercase font-medium mb-1.5">Mouse</div>
                        <div className="space-y-1.5 text-[11px] text-white/60 font-light">
                            <div className="flex items-start gap-2">
                                <span className="text-white/30 shrink-0">•</span>
                                <span>Scroll wheel to zoom in/out</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-white/30 shrink-0">•</span>
                                <span>Click & drag to rotate view</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-white/30 shrink-0">•</span>
                                <span>Click star to view echo</span>
                            </div>
                        </div>
                    </div>

                    {/* Keyboard (optional) */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                        <div className="text-[9px] text-white/40 tracking-wider uppercase font-medium mb-1.5">Keyboard</div>
                        <div className="space-y-1.5 text-[11px] text-white/60 font-light">
                            <div className="flex items-start gap-2">
                                <span className="text-white/30 shrink-0">•</span>
                                <span>WASD to move camera position</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

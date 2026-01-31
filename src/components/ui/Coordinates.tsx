'use client'
import { useAppStore } from '@/lib/store'

export default function Coordinates() {
    const { coordinates } = useAppStore()

    // Format: AZ 123° EL 45°
    return (
        <div className="fixed bottom-6 right-6 flex items-center gap-4 pointer-events-none select-none">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-mono tracking-widest text-white/60">
                AZ {coordinates.az}° <span className="mx-2 opacity-30">|</span> DIST {coordinates.el}
            </div>
        </div>
    )
}

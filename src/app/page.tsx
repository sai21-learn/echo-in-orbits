import CanvasWrapper from '@/components/canvas/CanvasWrapper'
import UIOverlay from '@/components/ui/UIOverlay'

export default function Home() {
    return (
        <main className="relative w-screen h-screen overflow-hidden bg-black select-none">
            <CanvasWrapper />
            <UIOverlay />
        </main>
    )
}

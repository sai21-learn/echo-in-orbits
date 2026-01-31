'use client'
import { useState } from 'react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Modal from './Modal'
import CreateStar from './CreateStar'
import StarViewer from './StarViewer'
import Coordinates from './Coordinates'
import { useAppStore } from '@/lib/store'

export default function UIOverlay() {
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const { selectedStarId, selectStar } = useAppStore()

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center pointer-events-auto">
                <h1 className="text-xl font-bold tracking-[0.2em] uppercase opacity-80 text-white select-none">
                    Echoes in Orbit
                </h1>

                <div>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="px-5 py-2 bg-white/5 hover:bg-white/10 active:bg-white/20 backdrop-blur-md border border-white/10 rounded-full transition-all text-xs font-medium uppercase tracking-widest text-white/90 shadow-lg hover:shadow-white/5 hover:border-white/30">
                                Connect
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9 border border-white/20 transition-all hover:border-white/50"
                                }
                            }}
                        />
                    </SignedIn>
                </div>
            </div>

            <div className="pointer-events-auto flex justify-center pb-8">
                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="group relative px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                >
                    <span className="relative z-10">Create Echo</span>
                    <div className="absolute inset-0 rounded-full bg-white blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                </button>
            </div>

            <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
                <CreateStar
                    onSuccess={() => {
                        setIsCreateOpen(false)
                        // Trigger refresh logic (maybe via context or simple reload)
                        window.location.reload()
                    }}
                    onCancel={() => setIsCreateOpen(false)}
                />
            </Modal>

            <Modal isOpen={!!selectedStarId} onClose={() => selectStar(null)}>
                {selectedStarId && <StarViewer id={selectedStarId} onClose={() => selectStar(null)} />}
            </Modal>

            <Coordinates />
        </div>
    )
}

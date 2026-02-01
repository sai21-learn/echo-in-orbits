'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HomePage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent opacity-20"></div>
                {mounted && [...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            opacity: Math.random() * 0.5 + 0.2
                        }}
                    />
                ))}
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-7xl md:text-8xl font-light tracking-[0.2em] uppercase animate-fade-in">
                            Echoes
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-light tracking-[0.3em] uppercase text-white/60">
                            in Orbit
                        </h2>
                    </div>

                    <p className="text-xl md:text-2xl font-light text-white/70 max-w-2xl mx-auto leading-relaxed">
                        Cast your thoughts into the cosmos. A spherical planetarium where confessions become stars.
                    </p>

                    <div className="pt-8">
                        <Link
                            href="/planetarium"
                            className="group inline-block px-12 py-4 bg-white text-black rounded-full font-light uppercase tracking-widest text-sm hover:bg-white/90 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                        >
                            <span className="relative z-10">Enter Planetarium</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-32 px-6">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-sm font-light tracking-[0.3em] uppercase text-white/40 text-center mb-16">
                        Features
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Feature 1 */}
                        <div className="group p-8 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all">
                            <div className="text-4xl mb-4">🌌</div>
                            <h4 className="text-lg font-light tracking-wider mb-3">Spherical Planetarium</h4>
                            <p className="text-sm text-white/60 font-light leading-relaxed">
                                Explore confessions mapped onto a cosmic dome. Navigate through space with intuitive controls.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group p-8 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all">
                            <div className="text-4xl mb-4">💫</div>
                            <h4 className="text-lg font-light tracking-wider mb-3">Five Galaxies</h4>
                            <p className="text-sm text-white/60 font-light leading-relaxed">
                                Hope, Regret, Advice, Dream, Gratitude. Each category occupies its own zone in the cosmos.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group p-8 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all">
                            <div className="text-4xl mb-4">🔒</div>
                            <h4 className="text-lg font-light tracking-wider mb-3">Your Choice</h4>
                            <p className="text-sm text-white/60 font-light leading-relaxed">
                                Post anonymously or authenticate. Time-lock your messages for future delivery.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="group p-8 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all">
                            <div className="text-4xl mb-4">⭐</div>
                            <h4 className="text-lg font-light tracking-wider mb-3">Interactive</h4>
                            <p className="text-sm text-white/60 font-light leading-relaxed">
                                Like and comment on echoes. Connect with others through shared experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 px-6">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h3 className="text-4xl font-light tracking-wider">Ready to explore?</h3>
                    <p className="text-white/60 font-light text-lg">
                        Step into the planetarium and discover echoes from across the cosmos.
                    </p>
                    <Link
                        href="/planetarium"
                        className="inline-block px-12 py-4 bg-white text-black rounded-full font-light uppercase tracking-widest text-sm hover:bg-white/90 transition-all hover:scale-105"
                    >
                        Launch Experience
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-12 px-6 border-t border-white/10">
                <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-white/40">
                    <div className="font-light tracking-wider">
                        © 2026 Echoes in Orbit
                    </div>
                    <div className="flex gap-8">
                        <Link href="/planetarium" className="hover:text-white transition-colors">
                            Planetarium
                        </Link>
                        <Link href="/documentation" className="hover:text-white transition-colors">
                            Documentation
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    )
}

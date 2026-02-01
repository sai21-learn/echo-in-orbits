'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
    const pathname = usePathname()

    const links = [
        { href: '/', label: 'Home' },
        { href: '/planetarium', label: 'Planetarium' },
        { href: '/documentation', label: 'Docs' }
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-xl font-light tracking-[0.3em] text-white hover:text-white/80 transition-colors">
                    ECHOES
                </Link>

                {/* Navigation Links */}
                <div className="flex gap-8">
                    {links.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-light tracking-wider uppercase transition-colors ${pathname === link.href
                                    ? 'text-white border-b border-white'
                                    : 'text-white/60 hover:text-white'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}

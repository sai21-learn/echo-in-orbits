'use client'
import { useState } from 'react'
import { useAuth, useUser, SignInButton } from '@clerk/nextjs'
import { addDays, format } from 'date-fns'

interface CreateStarProps {
    onSuccess: (newStar: any) => void
    onCancel: () => void
}

const CATEGORIES = {
    hope: { label: 'Hope', emoji: '✨', color: '#fbbf24', description: 'Dreams & aspirations' },
    regret: { label: 'Regret', emoji: '💭', color: '#8b5cf6', description: 'Lessons learned' },
    advice: { label: 'Advice', emoji: '💡', color: '#3b82f6', description: 'Wisdom to share' },
    dream: { label: 'Dream', emoji: '🌙', color: '#ec4899', description: 'Future visions' },
    gratitude: { label: 'Gratitude', emoji: '🙏', color: '#10b981', description: 'Thankful moments' }
}

export default function CreateStar({ onSuccess, onCancel }: CreateStarProps) {
    const { getToken } = useAuth()
    const { user } = useUser()
    const [content, setContent] = useState('')
    const [category, setCategory] = useState<keyof typeof CATEGORIES>('hope')
    const [visibility, setVisibility] = useState<'public' | 'private'>('public')
    const [date, setDate] = useState(format(addDays(new Date(), 7), 'yyyy-MM-dd'))
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Generate or retrieve session ID for anonymous users
    const getSessionId = () => {
        if (typeof window === 'undefined') return null
        let sessionId = localStorage.getItem('echos_session_id')
        if (!sessionId) {
            sessionId = crypto.randomUUID()
            localStorage.setItem('echos_session_id', sessionId)
        }
        return sessionId
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const token = await getToken()
            const sessionId = getSessionId()

            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify({
                    content,
                    category,
                    visibility,
                    deliveryDate: new Date(date).toISOString(),
                    sessionId
                })
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Failed to create star')

            onSuccess(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-black border border-white/20 rounded-2xl shadow-2xl">
                <div className="p-8">
                    <h2 className="text-2xl font-light text-white mb-8 tracking-wide">Create New Echo</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Galaxy Category Picker */}
                        <div>
                            <label className="block text-sm font-light text-white/70 mb-3 tracking-wide">
                                Choose Your Galaxy
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {Object.entries(CATEGORIES).map(([key, config]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setCategory(key as keyof typeof CATEGORIES)}
                                        className={`p-4 rounded-lg border transition-all ${category === key
                                                ? 'bg-white/10 border-white/40 scale-[1.02]'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <div className="text-2xl mb-2">{config.emoji}</div>
                                        <div className="text-sm font-light text-white">
                                            {config.label}
                                        </div>
                                        <div className="text-xs text-white/50 mt-1 font-light">
                                            {config.description}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Visibility Toggle */}
                        <div>
                            <label className="block text-sm font-light text-white/70 mb-3 tracking-wide">
                                Visibility
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setVisibility('public')}
                                    className={`p-4 rounded-lg border transition-all ${visibility === 'public'
                                            ? 'bg-white/10 border-white/40'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">🌍</div>
                                    <div className="text-sm font-light text-white">Public Echo</div>
                                    <div className="text-xs text-white/50 mt-1 font-light">
                                        Everyone can discover
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setVisibility('private')}
                                    className={`p-4 rounded-lg border transition-all ${visibility === 'private'
                                            ? 'bg-white/10 border-white/40'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">🔒</div>
                                    <div className="text-sm font-light text-white">Private Capsule</div>
                                    <div className="text-xs text-white/50 mt-1 font-light">
                                        Only you can see
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Smart Auth Prompt */}
                        {visibility === 'private' && !user && (
                            <div className="p-4 bg-white/5 border border-white/20 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">💡</span>
                                    <div className="flex-1">
                                        <p className="text-sm text-white/80 mb-3 font-light">
                                            Private messages require an account to retrieve later.
                                        </p>
                                        <SignInButton mode="modal">
                                            <button type="button" className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-sm text-white font-light transition-colors">
                                                Sign in or create account
                                            </button>
                                        </SignInButton>
                                        <p className="text-xs text-white/40 mt-2 font-light">
                                            Or switch to "Public Echo" to post anonymously
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Message Content */}
                        <div>
                            <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">Your Message</label>
                            <textarea
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                className="w-full h-32 px-4 py-3 bg-black border border-white/20 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/40 resize-none font-light"
                                placeholder="Write your echo to the cosmos..."
                                required
                                minLength={10}
                                maxLength={500}
                            />
                            <div className="text-xs text-white/40 mt-1 font-light">
                                {content.length}/500 characters
                            </div>
                        </div>

                        {/* Email Notification Date */}
                        <div>
                            <label className="block text-sm font-light text-white/70 mb-2 tracking-wide">Receive Email On</label>
                            <input
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 font-light"
                                min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-300 font-light">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white font-light transition-colors"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 bg-white text-black hover:bg-white/90 rounded-lg font-light transition-colors disabled:opacity-50"
                                disabled={loading || content.length < 10}
                            >
                                {loading ? 'Creating...' : 'Cast Echo'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

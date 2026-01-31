'use client'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useAuth } from '@clerk/nextjs'

interface StarViewerProps {
    id: string
    onClose: () => void
}

export default function StarViewer({ id, onClose }: StarViewerProps) {
    const { userId } = useAuth()
    const [data, setData] = useState<any>(null)
    const [comments, setComments] = useState<any[]>([])
    const [commentText, setCommentText] = useState('')
    const [loading, setLoading] = useState(true)
    const [liking, setLiking] = useState(false)
    const [error, setError] = useState('')

    const getSessionId = () => {
        if (typeof window === 'undefined') return null
        return localStorage.getItem('echos_session_id')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [msgRes, commRes] = await Promise.all([
                    fetch(`/api/messages/${id}`),
                    fetch(`/api/messages/${id}/comments`)
                ])
                const [msgData, commData] = await Promise.all([msgRes.json(), commRes.json()])
                if (msgData.error) throw new Error(msgData.error)
                if (commData.error) {
                    console.error('Comments error:', commData.error)
                    setComments([])
                } else {
                    setComments(Array.isArray(commData) ? commData : [])
                }
                setData(msgData)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    const handleLike = async () => {
        if (liking) return
        setLiking(true)
        try {
            const res = await fetch(`/api/messages/${id}/like`, {
                method: 'POST',
                headers: { 'x-session-id': getSessionId() || '' }
            })
            const result = await res.json()
            if (result.error) throw new Error(result.error)

            setData((prev: any) => ({
                ...prev,
                likes: result.liked ? prev.likes + 1 : prev.likes - 1
            }))
        } catch (err: any) {
            console.error('Like failed:', err)
        } finally {
            setLiking(false)
        }
    }

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!commentText.trim()) return

        try {
            const res = await fetch(`/api/messages/${id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: commentText,
                    sessionId: getSessionId()
                })
            })
            const newComment = await res.json()
            if (newComment.error) throw new Error(newComment.error)

            setComments(prev => [...prev, newComment])
            setCommentText('')
        } catch (err: any) {
            console.error('Comment failed:', err)
        }
    }

    if (loading) return <div className="p-8 text-center text-white/50 text-sm tracking-widest uppercase animate-pulse">Establishing Link...</div>
    if (error) return <div className="p-8 text-center text-red-400">{error}</div>

    const deliveryDate = data.deliveryDate ? new Date(data.deliveryDate) : new Date();

    return (
        <div className="flex flex-col h-[70vh] max-h-[600px] overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-start mb-6 shrink-0 border-b border-white/10 pb-4">
                <div className="space-y-1">
                    <div className="text-sm font-light text-white/60 tracking-wider">
                        {format(deliveryDate, 'MMMM d, yyyy')}
                    </div>
                    <h2 className="text-2xl font-light text-white tracking-wide">Echo Received</h2>
                </div>
                <div className="text-white/40 pt-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
                        <circle cx="12" cy="9" r="2.5"></circle>
                    </svg>
                </div>
            </div>

            {/* Content & Comments Wrapper */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
                {/* Message Body */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <p className="text-lg leading-relaxed text-white/90 font-light whitespace-pre-wrap">
                        {data.content}
                    </p>
                </div>

                {/* Interactions */}
                <div className="flex items-center gap-6 text-sm text-white/60">
                    <button
                        onClick={handleLike}
                        disabled={liking}
                        className={`flex items-center gap-2 transition-all hover:text-white ${liking ? 'opacity-50' : ''}`}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span className="font-light">{data.likes || 0}</span>
                    </button>

                    <div className="flex items-center gap-2 text-white/40">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span className="font-light">{comments.length}</span>
                    </div>
                </div>

                {/* Comment List */}
                <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-white/30 font-medium">Comments</h3>
                    {comments.length === 0 ? (
                        <p className="text-sm text-white/20 font-light italic">No echoes in response yet...</p>
                    ) : (
                        comments.map((comment: any) => (
                            <div key={comment.id} className="pb-4 border-b border-white/5 space-y-1">
                                <p className="text-sm text-white/80 font-light">{comment.content}</p>
                                <p className="text-[10px] text-white/20 font-light tracking-widest uppercase">
                                    {format(new Date(comment.created_at), 'MMM d, h:mm a')}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Comment Form - Footer sticky */}
            <form onSubmit={handleComment} className="mt-6 pt-4 border-t border-white/10 shrink-0">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add your echo..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition-all font-light"
                    />
                    <button
                        type="submit"
                        disabled={!commentText.trim()}
                        className="px-4 py-2 bg-white text-black rounded-lg text-sm font-light hover:bg-white/90 disabled:opacity-30 transition-all"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}

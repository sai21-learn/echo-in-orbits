import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!supabase) {
        return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
    }

    const { id: message_id } = await params;
    const { userId } = await auth();

    // Get session ID for anonymous users
    const sessionId = req.headers.get('x-session-id') || 'anonymous';
    const user_identifier = userId || sessionId;

    try {
        // Toggle like: Check if exists
        const { data: existingLike } = await supabase
            .from('likes')
            .select('id')
            .eq('message_id', message_id)
            .eq('user_identifier', user_identifier)
            .single();

        if (existingLike) {
            // Remove like
            await supabase.from('likes').delete().eq('id', existingLike.id);
            await supabase.rpc('decrement_likes', { msg_id: message_id });
            return NextResponse.json({ liked: false });
        } else {
            // Add like
            await supabase.from('likes').insert({
                message_id,
                user_identifier
            });
            await supabase.rpc('increment_likes', { msg_id: message_id });
            return NextResponse.json({ liked: true });
        }
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

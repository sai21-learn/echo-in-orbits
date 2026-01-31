import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!supabase) {
        return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
    }

    const { id: message_id } = await params;

    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('message_id', message_id)
        .order('created_at', { ascending: true });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!supabase) {
        return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
    }

    const { id: message_id } = await params;
    const { userId } = await auth();
    const body = await req.json();
    const { content, sessionId } = body;

    if (!content || content.trim().length === 0) {
        return NextResponse.json({ error: 'Comment content required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('comments')
        .insert({
            message_id,
            user_id: userId || null,
            session_id: sessionId || null,
            content: content.trim()
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

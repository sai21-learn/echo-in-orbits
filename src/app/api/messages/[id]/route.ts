import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // Params are now a Promise in Next 15+ (and 16?)
) {
    if (!supabase) {
        return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
    }

    const { id } = await params;

    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    // Message is always unlocked for viewing
    return NextResponse.json({
        id: data.id,
        isLocked: false,
        content: data.content,
        deliveryDate: data.delivery_date, // This is now Notification Date
        likes: data.likes,
        position: [data.position_x, data.position_y, data.position_z],
        authorId: data.user_id
    });
}

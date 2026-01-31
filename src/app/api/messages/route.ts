import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateStarPosition, getCategoryColor, generateStarBrightness } from '@/lib/utils';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
    if (!supabase) {
        return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
    }

    const { userId } = await auth();
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    // Fetch all messages with new fields
    const { data, error } = await supabase
        .from('messages')
        .select('id, position_x, position_y, position_z, delivery_date, likes, visibility, category, user_id, session_id');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Filter and map messages based on visibility
    const stars = data.map((msg: any) => {
        // Check if user owns this private message
        const isOwner =
            (userId && msg.user_id === userId) ||
            (sessionId && msg.session_id === sessionId);

        // Hide content for private messages not owned by viewer
        if (msg.visibility === 'private' && !isOwner) {
            return {
                id: msg.id,
                position: [msg.position_x, msg.position_y, msg.position_z],
                isLocked: true,
                likes: msg.likes || 0,
                category: msg.category
            };
        }

        return {
            id: msg.id,
            position: [msg.position_x, msg.position_y, msg.position_z],
            isLocked: false,
            likes: msg.likes || 0,
            category: msg.category
        };
    });

    return NextResponse.json(stars);
}

export async function POST(req: NextRequest) {
    if (!supabase) {
        return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
    }

    const { userId } = await auth();

    try {
        const body = await req.json();
        const { content, category, visibility, deliveryDate, sessionId } = body;

        // Validation
        if (!content || content.length < 10 || content.length > 500) {
            return NextResponse.json({ error: 'Content must be 10-500 characters' }, { status: 400 });
        }

        if (!['hope', 'regret', 'advice', 'dream', 'gratitude'].includes(category)) {
            return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
        }

        // Private messages require authentication OR session
        if (visibility === 'private' && !userId && !sessionId) {
            return NextResponse.json(
                { error: 'Authentication required for private messages' },
                { status: 401 }
            );
        }

        // Get current message count for this category (for spiral index)
        const { count } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('category', category);

        const index = count || 0;

        // Generate position using Galaxy algorithm
        const position = generateStarPosition(category, index);
        const color = getCategoryColor(category);
        const brightness = generateStarBrightness();

        const { data, error } = await supabase
            .from('messages')
            .insert({
                user_id: userId || null,
                session_id: sessionId || null,
                content,
                category,
                visibility: visibility || 'public',
                delivery_date: deliveryDate ? new Date(deliveryDate).toISOString() : null,
                position_x: position.x,
                position_y: position.y,
                position_z: position.z
            })
            .select()
            .single();

        if (error) {
            throw error;
        }

        return NextResponse.json(data, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

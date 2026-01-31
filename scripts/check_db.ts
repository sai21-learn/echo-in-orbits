import { supabase } from '../src/lib/supabase'

async function checkDb() {
    if (!supabase) {
        console.error('❌ Supabase not connected')
        return
    }

    console.log('🔍 Checking database setup...')

    // Check messages table columns
    const { data: messages, error: messagesError } = await supabase.from('messages').select('*').limit(1)
    if (messagesError) {
        console.error('❌ Error reading messages table:', messagesError.message)
    } else {
        console.log('✅ Messages table accessible')
    }

    // Check comments table
    const { data: comments, error: commentsError } = await supabase.from('comments').select('*').limit(1)
    if (commentsError) {
        console.error('❌ Error reading comments table (it might be missing):', commentsError.message)
    } else {
        console.log('✅ Comments table accessible')
    }

    // Check likes table
    const { data: likes, error: likesError } = await supabase.from('likes').select('*').limit(1)
    if (likesError) {
        console.error('❌ Error reading likes table:', likesError.message)
    } else {
        console.log('✅ Likes table accessible')
    }

    // Check RPC functions (indirectly by calling them with a fake ID)
    const { error: rpcError } = await supabase.rpc('increment_likes', { msg_id: '00000000-0000-0000-0000-000000000000' })
    if (rpcError && rpcError.message.includes('function increment_likes(uuid) does not exist')) {
        console.error('❌ RPC function increment_likes missing')
    } else if (rpcError) {
        // Other error is expected since ID doesn't exist, but function name error means it's missing
        console.log('ℹ️ RPC increment_likes check:', rpcError.message)
    } else {
        console.log('✅ RPC increment_likes found')
    }
}

checkDb()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('❌ Check failed:', error)
        process.exit(1)
    })

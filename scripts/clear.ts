import { supabase } from '../src/lib/supabase'

async function clear() {
    if (!supabase) {
        console.error('❌ Supabase not connected')
        return
    }

    console.log('🧹 Clearing all messages...')
    const { error } = await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000') // Deletes all

    if (error) {
        console.error('❌ Failed to clear messages:', error.message)
    } else {
        console.log('✅ Messages cleared!')
    }
}

clear()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('❌ Clear failed:', error)
        process.exit(1)
    })

import { supabase } from '../src/lib/supabase'
import { generateStarPosition, getCategoryColor, generateStarBrightness } from '../src/lib/utils'

const SEED_MESSAGES = {
    hope: [
        "I hope to travel to every continent before I turn 40",
        "One day I'll write a book that changes someone's life",
        "I hope my children grow up in a world with clean energy",
        "I want to learn to play piano and perform at an open mic",
        "Hoping to start my own company and create jobs for others",
        "I dream of owning a tiny house in the mountains",
        "I hope to run a marathon next year",
        "I want to reconnect with old friends I've lost touch with",
        "Hoping to master a second language fluently",
        "I hope to adopt a rescue dog and give it a loving home",
        "I want to become a mentor to young entrepreneurs",
        "Hoping to publish my photography in a gallery",
        "I dream of sailing across the Pacific Ocean",
        "I hope to build a sustainable farm one day",
        "I want to learn woodworking and build my own furniture",
        "Hoping to finish writing my novel this year",
        "I dream of performing stand-up comedy on stage",
        "I hope to volunteer abroad and make a difference",
        "I want to learn to surf before I'm too old",
        "Hoping to achieve financial independence by 50"
    ],
    regret: [
        "I wish I had called my grandmother more before she passed",
        "Should have taken that job offer in Tokyo when I was 25",
        "Regret not learning to play piano when I had the chance",
        "I wish I had been braver in pursuing my art career",
        "Should have told them how I felt before they moved away",
        "I regret not traveling more when I was younger",
        "Wish I had saved money instead of spending on things I don't use",
        "Should have gone to therapy sooner to work on my issues",
        "I regret not standing up for myself in that toxic job",
        "Wish I had spent more time with my dad before he retired",
        "Should have learned coding when everyone said to",
        "I regret not taking college more seriously",
        "Wish I had kept in touch with my childhood best friend",
        "Should have taken better care of my health in my 20s",
        "I regret selling my vintage car - it was my favorite",
        "Wish I had been more present instead of always on my phone",
        "Should have asked more questions to my grandparents",
        "I regret not pursuing music professionally",
        "Wish I had traveled to see my sister more often",
        "Should have taken more photos with loved ones"
    ],
    advice: [
        "Future me: Remember to backup your code every day",
        "Don't forget the lessons from 2024 - growth comes from discomfort",
        "Always choose experiences over possessions",
        "Remember: It's okay to say no to things that drain you",
        "Keep investing early and often - compound interest is real",
        "Don't forget to call Mom every week",
        "Remember that perfectionism is just fear in disguise",
        "Your mental health is more important than any job",
        "Remember: You don't have to attend every argument you're invited to",
        "Keep learning new things - stagnation is the enemy",
        "Don't forget how far you've come when you feel stuck",
        "Remember to take breaks - burnout helps no one",
        "Your gut feeling is usually right - trust it",
        "Don't forget to celebrate small wins along the way",
        "Remember: Comparison is the thief of joy",
        "Keep your circle small but meaningful",
        "Don't forget that failure is just data for improvement",
        "Remember to be kind to yourself on hard days",
        "Your network is your net worth - maintain relationships",
        "Don't forget why you started when things get tough"
    ],
    dream: [
        "I will build a company that employs 1000 people",
        "One day I'll perform at Carnegie Hall",
        "My dream is to create an AI that helps cure cancer",
        "I will sail around the world solo",
        "I dream of opening a chain of sustainable restaurants",
        "I will write a bestselling novel",
        "My dream is to design homes for homeless veterans",
        "I will climb all Seven Summits",
        "I dream of building a school in my home country",
        "I will create a documentary that wins an Oscar",
        "My dream is to develop affordable renewable energy",
        "I will become a TED speaker",
        "I dream of opening an animal sanctuary",
        "I will build a video game played by millions",
        "My dream is to discover a new species",
        "I will create a non-profit that changes education",
        "I dream of designing clothing for sustainable fashion",
        "I will produce a Broadway musical",
        "My dream is to build homes on Mars",
        "I will create an app that helps people find mental health support"
    ],
    gratitude: [
        "Thank you to everyone who believed in me when I didn't",
        "Grateful for the failures that taught me resilience",
        "Thankful for my partner who supports my wild ideas",
        "Grateful for the stranger who helped me when my car broke down",
        "Thank you to my mentor who saw potential in me",
        "Grateful for the job I lost - it led me to something better",
        "Thankful for my difficult childhood - it made me strong",
        "Grateful for the friends who stayed through the hard times",
        "Thank you to my therapist for helping me heal",
        "Grateful for the opportunity to start over at 40",
        "Thankful for the books that changed my perspective",
        "Grateful for my health after beating illness",
        "Thank you to teachers who inspired my curiosity",
        "Grateful for the courage to leave what wasn't serving me",
        "Thankful for second chances and fresh starts",
        "Grateful for the community that welcomed me",
        "Thank you to my parents for their sacrifices",
        "Grateful for the rain that made me appreciate sunshine",
        "Thankful for the mistakes that became lessons",
        "Grateful for today and the chance to try again"
    ]
}

async function seed() {
    if (!supabase) {
        console.error('❌ Supabase not connected')
        return
    }

    console.log('🌌 Starting galaxy seed...')

    let totalSeeded = 0

    for (const [category, messages] of Object.entries(SEED_MESSAGES)) {
        console.log(`\n🌟 Seeding ${category} galaxy...`)

        for (let i = 0; i < messages.length; i++) {
            const content = messages[i]
            const position = generateStarPosition(category, i)
            const color = getCategoryColor(category)
            const brightness = generateStarBrightness()

            // Seed with a future delivery date (7 days from now)
            const delivery_date = new Date()
            delivery_date.setDate(delivery_date.getDate() + 7)

            const { error } = await supabase
                .from('messages')
                .insert({
                    content,
                    category,
                    visibility: 'public',
                    user_id: null,
                    session_id: null,
                    delivery_date: delivery_date.toISOString(),
                    position_x: position.x,
                    position_y: position.y,
                    position_z: position.z
                })

            if (error) {
                console.error(`  ❌ Failed to seed message: ${error.message}`)
            } else {
                totalSeeded++
            }
        }

        console.log(`  ✅ Seeded ${messages.length} ${category} messages`)
    }

    console.log(`\n🎉 Successfully seeded ${totalSeeded} messages across 5 galaxies!`)
}

seed()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('❌ Seed failed:', error)
        process.exit(1)
    })

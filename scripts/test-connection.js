const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
})

async function main() {
    try {
        console.log('Connecting to database...')
        await prisma.$connect()
        console.log('Connection successful!')

        console.log('Checking for User table...')
        const count = await prisma.user.count()
        console.log(`Found ${count} users.`)

        console.log('Attempting to create a test user...')
        // We won't actually create one to avoid polluting, just checking query capability
        const testUser = await prisma.user.findFirst()
        console.log('Query successful.')

    } catch (e) {
        console.error('Database connection failed:')
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

main()

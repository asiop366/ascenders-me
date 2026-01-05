import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const userCount = await prisma.user.count()
    const threadCount = await prisma.thread.count()
    const postCount = await prisma.post.count()

    console.log(`Stats for Neon DB:`)
    console.log(`Users: ${userCount}`)
    console.log(`Threads: ${threadCount}`)
    console.log(`Posts: ${postCount}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

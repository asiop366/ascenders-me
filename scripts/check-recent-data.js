const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log("Checking for recent data in provided DB...")

    // 1. Get the 5 most recent users
    const recentUsers = await prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { username: true, createdAt: true, email: true }
    })

    console.log("\n--- 5 Most Recent Users in THIS DB ---")
    recentUsers.forEach(u => console.log(`- ${u.username} (${u.email}) - Created: ${u.createdAt.toISOString()}`))

    // 2. Get the 5 most recent threads
    const recentThreads = await prisma.thread.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { title: true, createdAt: true, author: { select: { username: true } } }
    })

    console.log("\n--- 5 Most Recent Threads in THIS DB ---")
    recentThreads.forEach(t => console.log(`- "${t.title}" by ${t.author.username} - Created: ${t.createdAt.toISOString()}`))
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

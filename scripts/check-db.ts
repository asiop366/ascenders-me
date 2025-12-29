import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log(`Connected to: ${process.env.DATABASE_URL}`)

    const count = await prisma.user.count()
    console.log(`Total users: ${count}`)

    const users = await prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { email: true, username: true, role: true, createdAt: true }
    })

    console.log('Recent users:')
    console.table(users)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            username: true,
            role: true,
        }
    })

    console.log('--- JSON START ---')
    console.log(JSON.stringify(users, null, 2))
    console.log('--- JSON END ---')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())

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

    console.log('--- FULL USER LIST ---')
    for (const user of users) {
        console.log(`ID: ${user.id} | EMAIL: "${user.email}" | USERNAME: "${user.username}" | ROLE: ${user.role}`)
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())

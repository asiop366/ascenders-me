import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const users = await prisma.user.findMany({
        where: {
            email: {
                contains: 'eya',
                mode: 'insensitive'
            }
        },
        select: {
            email: true,
            username: true,
            role: true,
        }
    })

    console.log('--- EYA SEARCH ---')
    users.forEach(u => {
        console.log(`${u.email} | ${u.username} | ${u.role}`)
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

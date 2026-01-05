import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.findFirst({
        where: { email: { contains: 'eya@ascenders.me', mode: 'insensitive' } }
    })

    if (user) {
        console.log(`FOUND_USER_EMAIL: [${user.email}]`)
        console.log(`FOUND_USER_USERNAME: [${user.username}]`)
        console.log(`FOUND_USER_ID: [${user.id}]`)
    } else {
        console.log('USER_NOT_FOUND')
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())

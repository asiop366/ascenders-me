import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const email = 'eya@ascenders.me'
    const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
    })

    if (!user) {
        console.log(`RESULT:USER_NOT_FOUND`)
    } else {
        console.log(`RESULT:FOUND`)
        console.log(`ID:${user.id}`)
        console.log(`EMAIL:${user.email}`)
        console.log(`USERNAME:${user.username}`)
        console.log(`HASHED_PASSWORD_EXISTS:${!!user.hashedPassword}`)
        console.log(`IS_BANNED:${user.isBanned}`)
        console.log(`ROLE:${user.role}`)
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

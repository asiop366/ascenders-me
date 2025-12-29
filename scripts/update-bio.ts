import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const email = '4si0p.555@gmail.com'

    const user = await prisma.user.update({
        where: { email: email },
        data: { bio: null }
    })

    console.log(`Updated user ${user.username} bio to NULL`)
    console.log(`id: ${user.id}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

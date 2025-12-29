import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const email = '4si0p.555@gmail.com'

    const user = await prisma.user.update({
        where: { email: email },
        data: { role: 'ADMIN' }
    })

    console.log(`Updated user ${user.username} role to ADMIN`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

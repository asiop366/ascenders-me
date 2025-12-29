import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const email = '4si0p.555@gmail.com'
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        console.error(`User with email ${email} not found.`)
        return
    }

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { role: 'OWNER' }
    })

    console.log(`User ${updatedUser.username} (${email}) promoted to OWNER:`, updatedUser)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const email = '4si0p.555@gmail.com'
    const timestamp = new Date().toISOString()
    const bio = `Deployment Check: ${timestamp}`

    await prisma.user.update({
        where: { email },
        data: { bio }
    })

    console.log(`Updated bio to: ${bio}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const email = '4si0p.555@gmail.com'

    console.log(`Testing findUnique for: ${email}`)

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (user) {
        console.log(`✅ findUnique FOUND the user: ${user.id}`)
    } else {
        console.log(`❌ findUnique FAILED to find the user.`)
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

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const email = '4si0p.555@gmail.com'
    const user = await prisma.user.findFirst({
        where: {
            email: {
                equals: email,
                mode: 'insensitive'
            }
        }
    })

    if (!user) {
        console.log(`User with email ${email} NOT FOUND.`)
    } else {
        console.log('User found:', {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            hasPassword: !!user.hashedPassword,
            createdAt: user.createdAt
        })
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

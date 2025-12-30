const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const email = 'eyaa04188@gmail.com'
    console.log(`Verifying user: ${email}...`)

    try {
        const user = await prisma.user.update({
            where: { email },
            data: { emailVerified: new Date() }
        })
        console.log('SUCCESS: User verified!')
        console.log(user)
    } catch (e) {
        console.error('ERROR:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()

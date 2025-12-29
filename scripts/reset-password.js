const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const email = '4si0p.555@gmail.com'
    const newPassword = 'Ascenders2026!'
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    const user = await prisma.user.update({
        where: { email },
        data: { hashedPassword }
    })

    console.log(`Password for user ${user.username} (${email}) has been reset.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

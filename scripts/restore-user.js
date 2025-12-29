const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const email = '4si0p.555@gmail.com'
    const originalPassword = 'ASiop19684242'
    const hashedPassword = await bcrypt.hash(originalPassword, 12)

    const user = await prisma.user.update({
        where: { email },
        data: {
            hashedPassword,
            role: 'OWNER'
        }
    })

    console.log(`Password and role for user ${user.username} (${user.email}) have been restored/updated.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

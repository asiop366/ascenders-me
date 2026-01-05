import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const email = 'eya@ascenders.me'
    const newPassword = 'y44281454.'

    const hashedPassword = await bcrypt.hash(newPassword, 12)

    const user = await prisma.user.update({
        where: { email: email.toLowerCase() },
        data: {
            hashedPassword: hashedPassword,
            role: 'OWNER' // Ensure they have the correct role while we're at it
        }
    })

    console.log(`Successfully updated password for ${user.email}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

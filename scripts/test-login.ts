import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function testLogin(email: string, password: string) {
    console.log(`Testing login for: ${email}`)
    const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
    })

    if (!user) {
        console.log('User not found')
        return
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword!)
    console.log(`Password match: ${isMatch}`)
}

async function main() {
    const email = process.argv[2] || 'eya@ascenders.me'
    const password = process.argv[3] || 'y44281454.'
    await testLogin(email, password)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())

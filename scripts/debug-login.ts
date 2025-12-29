import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const email = '4si0p.555@gmail.com'
    const passwordAttempt = 'ASiop19684242'

    console.log(`Checking user: ${email}`)

    const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
    })

    if (!user) {
        console.error('User NOT found!')
        return
    }

    console.log(`User found: ${user.id}`)
    console.log(`Role: ${user.role}`)
    console.log(`Stored Hash: ${user.hashedPassword}`)

    if (!user.hashedPassword) {
        console.log('No password set (null)')
    } else {
        const match = await bcrypt.compare(passwordAttempt, user.hashedPassword)
        console.log(`Password match result for '${passwordAttempt}': ${match}`)

        if (!match) {
            console.log('Password mismatch! Updating password...')
            const newHash = await bcrypt.hash(passwordAttempt, 10)
            await prisma.user.update({
                where: { id: user.id },
                data: { hashedPassword: newHash }
            })
            console.log('Password updated successfully.')

            // Verify again
            const verify = await bcrypt.compare(passwordAttempt, newHash)
            console.log(`Verification after update: ${verify}`)
        } else {
            console.log('Password is correct. No update needed.')
        }
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

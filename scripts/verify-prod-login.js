const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const email = '4si0p.555@gmail.com'
    const password = 'ASiop19684242'

    console.log(`Checking user: ${email}`)
    console.log(`Expected password: ${password}`)

    const user = await prisma.user.findFirst({
        where: {
            email: {
                equals: email,
                mode: 'insensitive'
            }
        }
    })

    if (!user) {
        console.error('❌ User NOT FOUND in production database.')
        return
    }

    console.log(`✅ User found: ${user.username} (${user.id})`)
    console.log(`   Role: ${user.role}`)
    console.log(`   Stored Hash: ${user.hashedPassword}`)

    if (!user.hashedPassword) {
        console.error('❌ No password hash found on user.')
        return
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword)

    if (isMatch) {
        console.log('✅ SUCCESS: The password matches the stored hash.')
    } else {
        console.error('❌ FAILURE: The password DOES NOT match the stored hash.')

        // Attempt to fix it immediately if it fails
        console.log('🔄 Attempting immediate re-hash and update...')
        const newHash = await bcrypt.hash(password, 12)
        await prisma.user.update({
            where: { id: user.id },
            data: { hashedPassword: newHash }
        })
        console.log('✅ Password hash updated again.')
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

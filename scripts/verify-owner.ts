import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const email = '4si0p.555@gmail.com'
    const passwordAttempt = 'ASiop19684242'

    console.log('--- DATABASE CHECK ---')
    console.log('Email searching for:', email)

    const user = await prisma.user.findFirst({
        where: {
            email: {
                equals: email,
                mode: 'insensitive'
            }
        }
    })

    if (!user) {
        console.log('USER NOT FOUND (insensitive search)')
        const allUsers = await prisma.user.findMany({
            select: { email: true, username: true }
        })
        console.log('Current users in DB:', allUsers)
        return
    }

    console.log('User found in DB!')
    console.log('ID:', user.id)
    console.log('Email in DB:', user.email)
    console.log('Username:', user.username)
    console.log('Role:', user.role)

    if (user.hashedPassword) {
        const isMatch = await bcrypt.compare(passwordAttempt, user.hashedPassword)
        console.log('Password Match:', isMatch)
        if (!isMatch) {
            console.log('UPDATING PASSWORD...')
            const newHash = await bcrypt.hash(passwordAttempt, 10)
            await prisma.user.update({
                where: { id: user.id },
                data: { hashedPassword: newHash }
            })
            console.log('Password updated successfully!')
        }
    } else {
        console.log('No hashed password found in DB!')
        const newHash = await bcrypt.hash(passwordAttempt, 10)
        await prisma.user.update({
            where: { id: user.id },
            data: { hashedPassword: newHash }
        })
        console.log('Password created successfully!')
    }
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect())

import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
async function m() {
    const users = await p.user.findMany({
        where: {
            email: { contains: '4si0p', mode: 'insensitive' }
        }
    })
    console.log('--- USERS SEARCH ---')
    users.forEach(u => {
        console.log(`- Email: [${u.email}] Role: [${u.role}] ID: [${u.id}]`)
    })
    console.log('--- END ---')
}
m().finally(() => p.$disconnect())

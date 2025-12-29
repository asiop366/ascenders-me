import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
async function m() {
    const u = await p.user.findFirst({ where: { role: 'OWNER' } })
    if (u) {
        console.log('--- USER DATA ---')
        console.log(`Email: [${u.email}]`)
        console.log(`Username: [${u.username}]`)
        console.log(`ID: [${u.id}]`)
        console.log('--- END ---')
    } else {
        console.log('No owner found')
    }
}
m().finally(() => p.$disconnect())

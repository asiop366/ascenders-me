import { prisma } from '@/lib/prisma'
import UsersTable from './users-table'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        include: { grade: true }
    })

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
                <p className="text-dark-400">Total registered users: {users.length}</p>
            </div>

            <UsersTable initialUsers={users} />
        </div>
    )
}

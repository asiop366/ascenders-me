'use client'

import { useState } from 'react'
import { Search, Ban, CheckCircle, Shield, MoreVertical } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

export default function UsersTable({ initialUsers }: { initialUsers: any[] }) {
    const [users, setUsers] = useState(initialUsers)
    const [search, setSearch] = useState('')

    const filteredUsers = users.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )

    const toggleBan = async (userId: string, currentBanned: boolean) => {
        try {
            const res = await fetch(`/api/admin/users/${userId}/ban`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ banned: !currentBanned, reason: 'Moderation action' })
            })

            if (res.ok) {
                setUsers(prev => prev.map(u =>
                    u.id === userId ? { ...u, isBanned: !currentBanned } : u
                ))
            }
        } catch (error) {
            console.error('Failed to toggle ban:', error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-dark-900 border border-white/5 rounded-2xl focus:outline-none focus:border-primary/50 transition-all shadow-xl text-white"
                />
            </div>

            <div className="bg-dark-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-dark-400 uppercase tracking-widest">User</th>
                            <th className="px-6 py-4 text-xs font-bold text-dark-400 uppercase tracking-widest">Role / Tier</th>
                            <th className="px-6 py-4 text-xs font-bold text-dark-400 uppercase tracking-widest">Joined</th>
                            <th className="px-6 py-4 text-xs font-bold text-dark-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-dark-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar src={user.image} alt={user.username} size="sm" />
                                        <div>
                                            <div className="font-bold text-white">{user.username}</div>
                                            <div className="text-xs text-dark-400">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <Badge className={
                                            user.role === 'OWNER' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                user.role === 'ADMIN' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                    'bg-white/5 text-dark-300 border-white/10'
                                        }>
                                            {user.role}
                                        </Badge>
                                        {user.grade && (
                                            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: user.grade.color }}>
                                                {user.grade.name}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-dark-300">
                                    {formatDate(user.createdAt)}
                                </td>
                                <td className="px-6 py-4">
                                    {user.isBanned ? (
                                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Banned</Badge>
                                    ) : (
                                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => toggleBan(user.id, user.isBanned)}
                                        className={`p-2 rounded-lg transition-all ${user.isBanned
                                            ? 'text-green-400 hover:bg-green-400/10'
                                            : 'text-red-400 hover:bg-red-400/10'
                                            }`}
                                        title={user.isBanned ? 'Unban User' : 'Ban User'}
                                    >
                                        {user.isBanned ? <CheckCircle size={18} /> : <Ban size={18} />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="p-12 text-center text-dark-400 italic">
                        No users found matching your search.
                    </div>
                )}
            </div>
        </div>
    )
}

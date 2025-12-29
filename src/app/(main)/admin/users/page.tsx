'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, Shield, UserCheck, UserX, Edit2 } from 'lucide-react'

interface User {
  id: string
  username: string
  email: string
  role: string
  emailVerified: Date | null
  createdAt: Date
  grade: { name: string; color: string } | null
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users')
        if (res.ok) {
          const data = await res.json()
          setUsers(data)
        }
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'OWNER': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'ADMIN': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'MODERATOR': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-dark-700 text-dark-300 border-dark-600'
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">User Management</h1>
        <p className="text-dark-300">Manage all users and their roles</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={20} />
          <input
            type="text"
            placeholder="Search by username or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-200">User</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-200">Email</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-200">Role</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-200">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-200">Joined</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-dark-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-dark-400">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-dark-400">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-dark-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/app/u/${user.username}`} className="text-white font-medium hover:text-primary transition-colors">
                        {user.username}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-dark-300 text-sm">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                        <Shield size={12} />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.emailVerified ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-green-500/20 text-green-400">
                          <UserCheck size={12} />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-orange-500/20 text-orange-400">
                          <UserX size={12} />
                          Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-dark-300 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-700 hover:bg-dark-600 text-dark-200 hover:text-white transition-colors text-sm"
                      >
                        <Edit2 size={14} />
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        {!isLoading && filteredUsers.length > 0 && (
          <div className="px-6 py-4 border-t border-white/5 text-sm text-dark-400">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        )}
      </div>
    </div>
  )
}

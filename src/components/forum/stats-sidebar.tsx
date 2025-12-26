import { prisma } from '@/lib/prisma'
import { Flame, Users, MessageSquare, Hash } from 'lucide-react'

export async function StatsSidebar() {
    const [threadCount, postCount, userCount, latestUser] = await Promise.all([
        prisma.thread.count(),
        prisma.post.count(),
        prisma.user.count(),
        prisma.user.findFirst({
            orderBy: { createdAt: 'desc' },
            select: { username: true }
        })
    ])

    const stats = [
        { label: 'Total Threads', value: threadCount.toLocaleString(), icon: Hash },
        { label: 'Total Posts', value: (postCount + threadCount).toLocaleString(), icon: MessageSquare },
        { label: 'Total Members', value: userCount.toLocaleString(), icon: Users },
    ]

    return (
        <div className="space-y-6">
            <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                    <Flame size={16} className="text-primary" />
                    <h2 className="text-xs font-bold text-white uppercase tracking-wider">Statistics</h2>
                </div>
                <div className="p-4 space-y-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400">
                                    <stat.icon size={16} />
                                </div>
                                <span className="text-sm text-dark-400">{stat.label}:</span>
                            </div>
                            <span className="text-sm font-bold text-white tracking-tight">{stat.value}</span>
                        </div>
                    ))}
                    {latestUser && (
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                            <span className="text-sm text-dark-400">Latest member:</span>
                            <span className="text-sm font-bold text-primary truncate max-w-[100px]">
                                {latestUser.username}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

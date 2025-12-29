import Link from 'next/link'
import { TrendingUp, MessageSquare, Heart } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { Avatar } from '@/components/ui/avatar'
import { getTimeAgo } from '@/lib/utils'

export async function TrendingSidebar() {
    // Get trending threads (most reactions in last 7 days)
    const trendingThreads = await prisma.thread.findMany({
        where: {
            createdAt: {
                gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
        },
        include: {
            author: {
                select: { username: true, image: true },
            },
            _count: {
                select: { reactions: true, posts: true },
            },
        },
        orderBy: {
            reactions: {
                _count: 'desc',
            },
        },
        take: 5,
    })

    return (
        <div className="glass rounded-3xl border border-white/5 p-6">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-2 mb-6">
                <TrendingUp className="text-primary" size={18} />
                Trending
            </h3>

            <div className="space-y-4">
                {trendingThreads.map((thread, index) => (
                    <Link
                        key={thread.id}
                        href={`/app/thread/${thread.id}`}
                        className="block group"
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center font-bold text-white text-sm shrink-0">
                                {index + 1}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                    {thread.title}
                                </h4>

                                <div className="flex items-center gap-3 mt-2 text-xs text-dark-500">
                                    <span className="flex items-center gap-1">
                                        <Heart size={12} />
                                        {thread._count.reactions}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MessageSquare size={12} />
                                        {thread._count.posts}
                                    </span>
                                    <span>{getTimeAgo(thread.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

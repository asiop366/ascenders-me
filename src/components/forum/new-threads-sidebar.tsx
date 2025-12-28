import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { getTimeAgo } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'

export async function NewThreadsSidebar() {
    const newThreads = await prisma.thread.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            author: {
                select: { username: true, image: true, displayName: true }
            },
            topic: {
                select: { name: true, slug: true }
            }
        }
    })

    return (
        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
            <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">New Threads</h2>
            </div>
            <div className="divide-y divide-white/5">
                {(newThreads as any[]).map((thread: any) => (
                    <div key={thread.id} className="p-4 hover:bg-white/5 transition-colors group">
                        <div className="flex gap-3">
                            <Avatar
                                src={thread.author.image}
                                alt={thread.author.username}
                                size="sm"
                                className="rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                                <Link
                                    href={`/app/thread/${thread.id}`}
                                    className="text-sm font-semibold text-white group-hover:text-primary transition-colors line-clamp-1 block"
                                >
                                    {thread.title}
                                </Link>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] text-dark-400 truncate">
                                        Started by {thread.author.displayName || thread.author.username}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-dark-500 mt-0.5">
                                    <span className="text-primary/70">{thread.topic?.name}</span>
                                    <span>•</span>
                                    <span>{getTimeAgo(new Date(thread.createdAt))}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

'use client'

import Link from 'next/link'
import { Calendar, Mail, UserPlus, UserCheck, MessageSquare } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/lib/language-context'
import { formatDate, getTimeAgo, cn } from '@/lib/utils' // Added 'cn'
import { useRouter } from 'next/navigation' // Added useRouter
import { useState } from 'react' // Added useState

export function ProfileContent({
    user,
    isOwnProfile,
    isFollowing: initialIsFollowing, // Renamed prop
    session
}: {
    user: any,
    isOwnProfile: boolean,
    isFollowing: any,
    session: any
}) {
    const router = useRouter()
    const { t, language } = useLanguage()
    const [isFollowing, setIsFollowing] = useState(!!initialIsFollowing)
    const [followersCount, setFollowersCount] = useState(user._count.followers)
    const [isPending, setIsPending] = useState(false)

    const updateRole = async (newRole: string) => {
        if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return

        setIsPending(true)
        try {
            const res = await fetch(`/api/admin/users/${user.id}/role`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            })

            if (res.ok) {
                router.refresh()
            } else {
                alert('Failed to update role')
            }
        } catch (error) {
            console.error('Update role error:', error)
            alert('An error occurred while updating the role')
        } finally {
            setIsPending(false)
        }
    }

    const toggleFollow = async () => {
        if (!session?.user) {
            router.push('/login')
            return
        }

        setIsPending(true)
        const prevIsFollowing = isFollowing
        const prevCount = followersCount

        // Optimistic update
        setIsFollowing(!prevIsFollowing)
        setFollowersCount((prev: number) => prevIsFollowing ? prev - 1 : prev + 1)

        try {
            const res = await fetch(`/api/users/${user.id}/follow`, {
                method: 'POST',
            })
            if (!res.ok) {
                setIsFollowing(prevIsFollowing)
                setFollowersCount(prevCount)
            }
        } catch (error) {
            setIsFollowing(prevIsFollowing)
            setFollowersCount(prevCount)
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="min-h-screen bg-dark-950 pb-20">
            {/* Cover Image */}
            <div className="h-64 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-dark-950" />
                <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent" />

                <div className="absolute top-8 left-8 z-20">
                    <button
                        onClick={() => router.back()}
                        className="glass px-4 py-2 rounded-xl text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                        ← {language === 'fr' ? 'Retour' : 'Back'}
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-8 -mt-24 relative z-10">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Sidebar Info */}
                    <div className="w-full md:w-80 flex-shrink-0">
                        <div className="glass rounded-3xl p-8 border border-white/5 text-center shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" />

                            <div className="mb-6 relative inline-block">
                                <Avatar
                                    src={user.image || undefined}
                                    alt={user.username}
                                    size="xl"
                                    className="w-32 h-32 ring-4 ring-primary/20 shadow-glow mx-auto"
                                />
                                {user.grade && (
                                    <div className="absolute -bottom-2 right-1/2 translate-x-1/2">
                                        <Badge
                                            style={{
                                                backgroundColor: user.grade.color,
                                                color: '#fff',
                                                boxShadow: `0 0 20px ${user.grade.color}40`
                                            }}
                                            className="px-4 py-1.5 text-xs font-bold"
                                        >
                                            {user.grade.name}
                                        </Badge>
                                    </div>
                                )}
                            </div>

                            <h1 className="text-2xl font-display font-bold text-white mb-1">
                                {user.displayName || user.username}
                            </h1>
                            <p className="text-dark-400 font-medium mb-6">@{user.username}</p>

                            {!isOwnProfile && session?.user && (
                                <div className="flex flex-col gap-3 mb-6">
                                    <button
                                        onClick={toggleFollow}
                                        disabled={isPending}
                                        className={cn(
                                            "btn-primary w-full py-3 flex items-center justify-center gap-2 shadow-glow-sm transition-all",
                                            isFollowing && "bg-dark-700 hover:bg-dark-600 border-white/10 text-white"
                                        )}
                                    >
                                        {isFollowing ? <UserCheck size={18} /> : <UserPlus size={18} />}
                                        {isFollowing ? (language === 'fr' ? 'Suivi' : 'Following') : (language === 'fr' ? 'Suivre' : 'Follow')}
                                    </button>
                                    <Link
                                        href={`/app/messages/${user.username}`}
                                        className="btn-secondary w-full py-3 flex items-center justify-center gap-2"
                                    >
                                        <Mail size={18} />
                                        {language === 'fr' ? 'Message' : 'Message'}
                                    </Link>

                                    {session.user.role === 'OWNER' && !['OWNER'].includes(user.role) && (
                                        <div className="pt-4 border-t border-white/5 mt-2">
                                            <p className="text-[10px] text-dark-500 uppercase tracking-widest font-bold mb-3 text-left px-2">Role Management</p>
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => updateRole('ADMIN')}
                                                    className={cn(
                                                        "w-full py-2 text-xs font-bold rounded-xl border transition-all",
                                                        user.role === 'ADMIN' ? "bg-primary/20 border-primary text-primary" : "bg-dark-800 border-white/5 text-dark-400 hover:border-primary/50"
                                                    )}
                                                >
                                                    Set as ADMIN
                                                </button>
                                                <button
                                                    onClick={() => updateRole('MODERATOR')}
                                                    className={cn(
                                                        "w-full py-2 text-xs font-bold rounded-xl border transition-all",
                                                        user.role === 'MODERATOR' ? "bg-primary/20 border-primary text-primary" : "bg-dark-800 border-white/5 text-dark-400 hover:border-primary/50"
                                                    )}
                                                >
                                                    Set as MODERATOR
                                                </button>
                                                <button
                                                    onClick={() => updateRole('USER')}
                                                    className={cn(
                                                        "w-full py-2 text-xs font-bold rounded-xl border transition-all",
                                                        user.role === 'USER' ? "bg-primary/20 border-primary text-primary" : "bg-dark-800 border-white/5 text-dark-400 hover:border-primary/50"
                                                    )}
                                                >
                                                    Set as USER
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 pb-6 border-b border-white/5">
                                <div>
                                    <div className="text-xl font-bold text-white">{user._count.threads}</div>
                                    <div className="text-[10px] text-dark-500 uppercase tracking-wider font-bold">Topics</div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-white">{user._count.posts}</div>
                                    <div className="text-[10px] text-dark-500 uppercase tracking-wider font-bold">Posts</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-6">
                                <Link href={`/app/u/${user.username}/followers`} className="hover:bg-white/5 p-2 rounded-xl transition-all">
                                    <div className="text-xl font-bold text-white">{followersCount}</div>
                                    <div className="text-[10px] text-dark-500 uppercase tracking-wider font-bold">Followers</div>
                                </Link>
                                <Link href={`/app/u/${user.username}/following`} className="hover:bg-white/5 p-2 rounded-xl transition-all">
                                    <div className="text-xl font-bold text-white">{user._count.following}</div>
                                    <div className="text-[10px] text-dark-500 uppercase tracking-wider font-bold">Following</div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Details & Activity */}
                    <div className="flex-1 space-y-6 w-full">
                        <div className="glass rounded-3xl p-8 border border-white/5 shadow-xl">
                            <h2 className="text-xs font-bold text-dark-500 uppercase tracking-widest mb-4">Bio</h2>
                            {user.bio ? (
                                <p className="text-dark-100 text-lg leading-relaxed">{user.bio}</p>
                            ) : (
                                <p className="text-dark-500 italic">
                                    {language === 'fr' ? 'Aucune biographie disponible.' : 'No bio available.'}
                                </p>
                            )}

                            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/5 text-sm font-medium text-dark-400">
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} className="text-primary" />
                                    <span>{language === 'fr' ? 'Rejoint le' : 'Joined'} {formatDate(new Date(user.createdAt))}</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass rounded-3xl p-8 border border-white/5 shadow-xl">
                            <h2 className="text-xs font-bold text-dark-500 uppercase tracking-widest mb-6">
                                {language === 'fr' ? 'Activité Récente' : 'Recent Activity'}
                            </h2>

                            {user.threads.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {user.threads.map((thread: any) => (
                                        <Link
                                            key={thread.id}
                                            href={`/app/thread/${thread.id}`}
                                            className="group p-6 rounded-2xl bg-dark-800 border border-transparent hover:border-primary/20 hover:bg-dark-700 transition-all shadow-inner"
                                        >
                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{thread.title}</h3>
                                            <p className="text-dark-300 text-sm line-clamp-2 leading-relaxed mb-4">{thread.content}</p>
                                            <div className="flex items-center gap-4 text-[10px] font-bold text-dark-500 uppercase tracking-widest">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar size={12} /> {getTimeAgo(new Date(thread.createdAt))}
                                                </span>
                                                <span className="w-1 h-1 bg-dark-600 rounded-full" />
                                                <span className="flex items-center gap-1.5">
                                                    <MessageSquare size={12} /> {thread.viewCount} {language === 'fr' ? 'vues' : 'views'}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-dark-800/50 rounded-2xl border border-dashed border-white/5">
                                    <MessageSquare size={40} className="mx-auto mb-4 text-dark-600" />
                                    <p className="text-dark-400 font-medium">
                                        {language === 'fr' ? 'Aucune activité récente à afficher.' : 'No recent activity to display.'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

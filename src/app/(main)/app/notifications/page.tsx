import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  Bell, 
  MessageSquare, 
  Heart, 
  AtSign, 
  Shield,
  Check,
  Trash2,
  Settings
} from 'lucide-react'

// Mock notifications for now
const mockNotifications = [
  {
    id: '1',
    type: 'reply',
    message: 'JohnDoe replied to your thread "How to get started with programming"',
    link: '/app/thread/1',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
  },
  {
    id: '2',
    type: 'like',
    message: 'Sarah liked your reply in "Best practices for React"',
    link: '/app/thread/2',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
  },
  {
    id: '3',
    type: 'mention',
    message: 'Mike mentioned you in "Looking for feedback on my project"',
    link: '/app/thread/3',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '4',
    type: 'mod',
    message: 'Your thread "Question about rules" was pinned by a moderator',
    link: '/app/thread/4',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
]

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const unreadCount = mockNotifications.filter(n => !n.read).length

  return (
    <div className="h-full overflow-y-auto bg-asc-bg">
      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-asc-text flex items-center gap-2">
              <Bell size={24} />
              Notifications
            </h1>
            <p className="text-asc-muted mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="btn-ghost flex items-center gap-2 text-sm">
              <Check size={16} />
              Mark all as read
            </button>
            <Link href="/app/settings" className="btn-ghost p-2">
              <Settings size={18} />
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 border-b border-asc-border">
          <button className="px-4 py-3 text-sm font-medium text-asc-text border-b-2 border-asc-text">
            All
          </button>
          <button className="px-4 py-3 text-sm text-asc-muted hover:text-asc-text transition-colors">
            Unread ({unreadCount})
          </button>
          <button className="px-4 py-3 text-sm text-asc-muted hover:text-asc-text transition-colors flex items-center gap-1">
            <MessageSquare size={14} />
            Replies
          </button>
          <button className="px-4 py-3 text-sm text-asc-muted hover:text-asc-text transition-colors flex items-center gap-1">
            <AtSign size={14} />
            Mentions
          </button>
          <button className="px-4 py-3 text-sm text-asc-muted hover:text-asc-text transition-colors flex items-center gap-1">
            <Heart size={14} />
            Likes
          </button>
        </div>

        {/* Notifications List */}
        {mockNotifications.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-asc-surface border border-asc-border rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={32} className="text-asc-muted" />
            </div>
            <h2 className="text-lg font-semibold text-asc-text mb-2">No notifications</h2>
            <p className="text-asc-muted">When you get notifications, they'll show up here.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {mockNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function NotificationItem({ notification }: { notification: typeof mockNotifications[0] }) {
  const icons = {
    reply: MessageSquare,
    like: Heart,
    mention: AtSign,
    mod: Shield,
  }
  
  const Icon = icons[notification.type as keyof typeof icons] || Bell
  const timeAgo = getTimeAgo(notification.createdAt)

  return (
    <Link
      href={notification.link}
      className={`card flex items-start gap-4 group ${
        !notification.read ? 'bg-asc-surface2 border-asc-muted' : ''
      }`}
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
        !notification.read ? 'bg-asc-text/10' : 'bg-asc-hover'
      }`}>
        <Icon size={18} className={!notification.read ? 'text-asc-text' : 'text-asc-muted'} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm leading-relaxed ${
          !notification.read ? 'text-asc-text' : 'text-asc-secondary'
        }`}>
          {notification.message}
        </p>
        <p className="text-xs text-asc-muted mt-1">{timeAgo}</p>
      </div>

      {/* Unread indicator */}
      {!notification.read && (
        <div className="w-2 h-2 bg-asc-text rounded-full flex-shrink-0 mt-2" />
      )}

      {/* Delete button */}
      <button 
        className="p-2 opacity-0 group-hover:opacity-100 hover:bg-asc-hover rounded transition-all"
        onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
      >
        <Trash2 size={14} className="text-asc-muted hover:text-red-400" />
      </button>
    </Link>
  )
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

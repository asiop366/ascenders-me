import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('skeleton', className)} />
  )
}

export function ThreadCardSkeleton() {
  return (
    <div className="card">
      <div className="flex gap-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ThreadListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <ThreadCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="bg-asc-surface border border-asc-border rounded-asc-lg p-6">
      <div className="flex items-start gap-4 mb-6">
        <Skeleton className="w-20 h-20 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-20 rounded-asc" />
        <Skeleton className="h-20 rounded-asc" />
        <Skeleton className="h-20 rounded-asc" />
      </div>
    </div>
  )
}

export function SidebarSkeleton() {
  return (
    <div className="p-3 space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full rounded-asc" />
      ))}
    </div>
  )
}

export function NotificationSkeleton() {
  return (
    <div className="card flex items-start gap-4">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  )
}

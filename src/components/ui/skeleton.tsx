export function ThreadCardSkeleton() {
  return (
    <div className="glass rounded-xl border border-white/5 p-6 animate-pulse">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-dark-700" />

        <div className="flex-1 min-w-0 space-y-3">
          {/* Title */}
          <div className="h-6 bg-dark-700 rounded-lg w-3/4" />

          {/* Content */}
          <div className="space-y-2">
            <div className="h-4 bg-dark-700 rounded w-full" />
            <div className="h-4 bg-dark-700 rounded w-5/6" />
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 pt-2">
            <div className="h-3 bg-dark-700 rounded w-20" />
            <div className="h-3 bg-dark-700 rounded w-16" />
            <div className="h-3 bg-dark-700 rounded w-24" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProfileCardSkeleton() {
  return (
    <div className="glass rounded-xl p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-dark-700" />
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-dark-700 rounded w-32" />
          <div className="h-4 bg-dark-700 rounded w-24" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center space-y-2">
            <div className="h-8 bg-dark-700 rounded w-full" />
            <div className="h-3 bg-dark-700 rounded w-16 mx-auto" />
          </div>
        ))}
      </div>

      <div className="h-10 bg-dark-700 rounded" />
    </div>
  )
}

export function DashboardCardSkeleton() {
  return (
    <div className="glass rounded-xl p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-dark-700" />
      </div>
      <div className="h-8 bg-dark-700 rounded w-24 mb-2" />
      <div className="h-4 bg-dark-700 rounded w-32" />
    </div>
  )
}

export function MessageCardSkeleton() {
  return (
    <div className="glass rounded-xl p-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-dark-700" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-dark-700 rounded w-32" />
          <div className="h-4 bg-dark-700 rounded w-48" />
        </div>
        <div className="h-3 bg-dark-700 rounded w-16" />
      </div>
    </div>
  )
}

export function SmallCardSkeleton() {
  return (
    <div className="glass rounded-xl p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-dark-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-dark-700 rounded w-full" />
          <div className="h-3 bg-dark-700 rounded w-24" />
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

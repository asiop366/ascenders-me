type RateLimitStore = Map<string, { count: number; resetTime: number }>

const store: RateLimitStore = new Map()

interface RateLimitOptions {
  interval: number // in milliseconds
  limit: number
}

export function rateLimit(options: RateLimitOptions) {
  const { interval, limit } = options

  return {
    check: (key: string): { success: boolean; remaining: number; reset: number } => {
      const now = Date.now()
      const record = store.get(key)

      if (!record || now > record.resetTime) {
        store.set(key, { count: 1, resetTime: now + interval })
        return { success: true, remaining: limit - 1, reset: now + interval }
      }

      if (record.count >= limit) {
        return { success: false, remaining: 0, reset: record.resetTime }
      }

      record.count++
      store.set(key, record)
      return { success: true, remaining: limit - record.count, reset: record.resetTime }
    },
  }
}

// Pre-configured rate limiters
export const authRateLimit = rateLimit({
  interval: 60 * 1000, // 1 minute
  limit: 5, // 5 attempts per minute
})

export const apiRateLimit = rateLimit({
  interval: 60 * 1000, // 1 minute
  limit: 100, // 100 requests per minute
})

export const searchRateLimit = rateLimit({
  interval: 60 * 1000, // 1 minute
  limit: 30, // 30 searches per minute
})

'use client'

import { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  type: ToastType
  message: string
}

let toastListeners: ((toast: Toast) => void)[] = []

export function toast(type: ToastType, message: string) {
  const newToast: Toast = {
    id: Date.now().toString(),
    type,
    message,
  }
  toastListeners.forEach((listener) => listener(newToast))
}

toast.success = (message: string) => toast('success', message)
toast.error = (message: string) => toast('error', message)
toast.info = (message: string) => toast('info', message)
toast.warning = (message: string) => toast('warning', message)

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const listener = (toast: Toast) => {
      setToasts((prev) => [...prev, toast])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id))
      }, 4000)
    }

    toastListeners.push(listener)
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener)
    }
  }, [])

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} />
      case 'error': return <AlertCircle size={20} />
      case 'info': return <Info size={20} />
      case 'warning': return <AlertTriangle size={20} />
    }
  }

  const getStyles = (type: ToastType) => {
    switch (type) {
      case 'success': return 'bg-green-500/10 border-green-500/30 text-green-400'
      case 'error': return 'bg-red-500/10 border-red-500/30 text-red-400'
      case 'info': return 'bg-blue-500/10 border-blue-500/30 text-blue-400'
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-lg animate-in slide-in-from-right ${getStyles(toast.type)}`}
          style={{ minWidth: '300px', maxWidth: '500px' }}
        >
          {getIcon(toast.type)}
          <span className="flex-1 text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            className="hover:opacity-70 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}

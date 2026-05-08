import React from 'react'
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react'
import { useApp } from '../context/AppContext'

const icons = { check: CheckCircle, error: XCircle, warn: AlertCircle, info: Info }

export default function Toast() {
  const { toast } = useApp()
  const Icon = icons[toast.icon] || CheckCircle

  return (
    <div className={`fixed bottom-5 right-5 z-[200] flex items-center gap-3 bg-ev-surface2 border border-ev-accent/25 rounded-xl px-4 py-3 text-[13px] max-w-[320px] shadow-xl transition-all duration-300 ${
      toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
    }`}>
      <Icon size={18} className="text-ev-accent flex-shrink-0" />
      <span>{toast.message}</span>
    </div>
  )
}

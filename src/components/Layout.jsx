import React from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { Zap, MapPin, Calendar, Brain, Wallet, User } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Toast from './Toast'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: Zap },
  { to: '/stations',  label: 'Find Stations', icon: MapPin },
  { to: '/booking',   label: 'Book', icon: Calendar },
  { to: '/ai',        label: 'AI Insights', icon: Brain },
  { to: '/wallet',    label: 'Wallet', icon: Wallet },
]

export default function Layout() {
  const { balance, user } = useApp()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-ev-bg text-white">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-[60px] glass border-b border-ev-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ev-accent to-ev-accent2 flex items-center justify-center">
            <Zap size={16} className="text-ev-bg" />
          </div>
          <span className="text-[18px] font-bold tracking-tight">ChargeHub</span>
        </div>

        <div className="flex gap-1">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-[6px] rounded-lg text-[13px] font-medium transition-all ${
                isActive
                  ? 'bg-ev-accent/10 text-ev-accent'
                  : 'text-ev-muted hover:text-white hover:bg-white/5'
              }`
            }>
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/wallet')}
            className="bg-ev-accent/10 border border-ev-accent/25 rounded-lg px-3 py-[5px] text-[13px] font-semibold text-ev-accent font-mono transition-all hover:bg-ev-accent/20"
          >
            ₹ {balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-ev-purple to-ev-accent2 flex items-center justify-center text-[11px] font-bold hover:scale-105 transition-transform"
          >
            {user.initials}
          </button>
        </div>
      </nav>

      <main className="pb-8">
        <Outlet />
      </main>

      <Toast />
    </div>
  )
}

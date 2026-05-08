import React from 'react'
import { useApp } from '../context/AppContext'
import { User, Zap, Leaf, Trophy, Settings, Bell, Shield, LogOut } from 'lucide-react'

export default function Profile() {
  const { user, balance, showToast } = useApp()
  const settingsSections = [
    { icon: Bell,    label: 'Notifications',      sub: 'Booking alerts, price changes' },
    { icon: Shield,  label: 'Security & Privacy',  sub: 'Password, 2FA, data settings' },
    { icon: Settings,label: 'App Preferences',     sub: 'Theme, language, units' },
    { icon: LogOut,  label: 'Sign Out',             sub: 'Log out of your account', danger: true },
  ]

  return (
    <div className="px-6 pt-6 max-w-2xl">
      {/* Profile card */}
      <div className="card-ev flex items-center gap-5 mb-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ev-purple to-ev-accent2 flex items-center justify-center text-[20px] font-bold">
          {user.initials}
        </div>
        <div className="flex-1">
          <div className="text-[18px] font-bold">{user.name}</div>
          <div className="text-[13px] text-ev-muted">{user.email}</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="badge-purple">Pro Plan</span>
            <span className="badge-accent">OCPI Verified</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-ev-muted">Wallet</div>
          <div className="text-[17px] font-bold font-mono text-ev-accent">₹{balance.toLocaleString('en-IN',{minimumFractionDigits:2})}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { icon: Zap, label: 'Sessions', value: user.totalSessions, color: 'text-ev-accent2' },
          { icon: Leaf, label: 'CO₂ Saved', value: `${user.co2Saved} kg`, color: 'text-ev-green' },
          { icon: Trophy, label: 'Reward Pts', value: user.rewards.toLocaleString(), color: 'text-yellow-400' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card-ev text-center">
            <Icon size={18} className={`mx-auto mb-2 ${color}`} />
            <div className={`text-[20px] font-bold font-mono ${color}`}>{value}</div>
            <div className="text-[11px] text-ev-muted mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="card-ev">
        <div className="text-[14px] font-semibold mb-3">Settings</div>
        <div className="flex flex-col gap-2">
          {settingsSections.map(({ icon: Icon, label, sub, danger }) => (
            <button key={label}
              onClick={() => showToast(`${label} — coming soon`, 'info')}
              className={`flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all text-left w-full ${danger ? 'hover:bg-red-500/5' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${danger ? 'bg-red-500/10' : 'bg-white/5'}`}>
                <Icon size={15} className={danger ? 'text-red-400' : 'text-ev-muted'} />
              </div>
              <div>
                <div className={`text-[13px] font-medium ${danger ? 'text-red-400' : ''}`}>{label}</div>
                <div className="text-[11px] text-ev-muted">{sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

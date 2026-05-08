import React from 'react'
import { Zap, Plus, Gift } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { TRANSACTIONS } from '../data/stations'

const txnIcon = { zap: Zap, plus: Plus, gift: Gift }

export default function Wallet() {
  const { balance, user, addBalance, showToast, bookings } = useApp()

  const allTxns = [
    ...bookings.map(b => ({
      id: b.id, icon: 'zap', name: b.stationName, date: 'Recent',
      amount: -b.cost, type: 'debit', sub: `${b.charger} · ${b.slot} · ${b.duration} min`
    })),
    ...TRANSACTIONS,
  ]

  const handleAddFunds = () => {
    addBalance(500)
    showToast('₹500 added to wallet via UPI', 'check')
  }

  return (
    <div className="px-6 pt-6">
      {/* Wallet Card */}
      <div className="relative overflow-hidden rounded-2xl p-7 mb-5"
        style={{ background: 'linear-gradient(135deg, #0f2027, #1a3a4a, #0f2027)', border: '1px solid rgba(14,165,233,0.2)' }}>
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full" style={{background:'radial-gradient(circle, rgba(0,229,160,0.1), transparent 70%)'}} />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full" style={{background:'radial-gradient(circle, rgba(14,165,233,0.08), transparent 70%)'}} />
        <div className="relative">
          <div className="text-[12px] text-white/50 tracking-[0.5px]">Available Balance</div>
          <div className="text-[48px] font-bold font-mono tracking-tight text-white mt-2 mb-1">
            <span className="text-[24px] text-ev-accent">₹</span>
            {balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[12px] text-white/40">Account ID: CH-2024-AK-7823</div>
          <div className="grid grid-cols-4 gap-6 mt-5 pt-5 border-t border-white/10">
            {[
              ['Total Spent', '₹8,340'],
              ['Sessions', user.totalSessions],
              ['Rewards', `${user.rewards} pts`],
              ['kWh Used', `${user.totalKwh} kWh`],
            ].map(([l, v]) => (
              <div key={l}>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.6px]">{l}</div>
                <div className="text-[15px] font-semibold text-white/85 font-mono mt-1">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button onClick={handleAddFunds}
          className="py-3 rounded-xl border border-ev-border2 bg-ev-surface text-[13px] font-semibold hover:border-ev-accent/30 hover:text-ev-accent transition-all">
          + Add ₹500
        </button>
        <button onClick={() => showToast('UPI · Cards · Net Banking available', 'info')}
          className="py-3 rounded-xl border border-ev-border2 bg-ev-surface text-[13px] font-semibold hover:border-ev-accent/30 hover:text-ev-accent transition-all">
          💳 Pay Options
        </button>
      </div>

      {/* Transactions */}
      <div className="text-[14px] font-semibold mb-3">Transaction History</div>
      <div className="flex flex-col gap-2">
        {allTxns.map((t, i) => {
          const Icon = txnIcon[t.icon] || Zap
          return (
            <div key={t.id || i} className="card-ev flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${t.type === 'credit' ? 'bg-ev-accent/10' : 'bg-ev-accent2/10'}`}>
                  <Icon size={15} className="text-white" />
                </div>
                <div>
                  <div className="text-[13px] font-medium">{t.name}</div>
                  <div className="text-[11px] text-ev-muted">{t.sub}</div>
                  <div className="text-[11px] text-ev-muted">{t.date}</div>
                </div>
              </div>
              <div className={`text-[14px] font-bold font-mono ${t.type === 'credit' ? 'text-ev-accent' : 'text-red-400'}`}>
                {t.type === 'credit' ? '+' : ''}₹{Math.abs(t.amount).toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

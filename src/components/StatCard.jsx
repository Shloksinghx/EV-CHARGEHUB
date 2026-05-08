import React from 'react'

export default function StatCard({ label, value, change, changeType = 'up', color = 'text-ev-accent' }) {
  return (
    <div className="card-ev">
      <div className="text-[11px] font-semibold uppercase tracking-[0.8px] text-ev-muted mb-2">{label}</div>
      <div className={`text-[26px] font-bold font-mono tracking-tight ${color}`}>{value}</div>
      {change && (
        <div className="text-[11px] text-ev-muted mt-1">
          <span className={changeType === 'up' ? 'text-ev-green' : 'text-red-400'}>
            {changeType === 'up' ? '↑' : '↓'} {change}
          </span>
        </div>
      )}
    </div>
  )
}

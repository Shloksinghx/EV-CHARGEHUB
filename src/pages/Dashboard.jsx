import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useApp } from '../context/AppContext'
import StatCard from '../components/StatCard'
import { STATIONS, WEEKLY_DATA, NETWORKS } from '../data/stations'
import { Zap, Bell, CheckCircle } from 'lucide-react'

export default function Dashboard() {
  const { user, setSelectedStation } = useApp()
  const navigate = useNavigate()
  const [liveAvail, setLiveAvail] = useState(1923)

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveAvail(1900 + Math.floor(Math.random() * 60))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handlePin = (station) => {
    setSelectedStation(station)
    navigate(`/booking/${station.id}`)
  }

  const activities = [
    { Icon: Zap, bg: 'bg-ev-accent/10', title: 'Session Complete – Tata Power', sub: '12 kWh · ₹168 charged · 18 min', time: '11:24 AM' },
    { Icon: Bell, bg: 'bg-ev-purple/10', title: 'AI Alert: Sector 17 getting busy', sub: 'Predicted 90% occupancy by 2 PM', time: '10:45 AM' },
    { Icon: CheckCircle, bg: 'bg-ev-accent2/10', title: 'Booking Confirmed – Jio-bp', sub: 'Today 4:00 PM · DC 120kW', time: 'Yesterday' },
  ]

  return (
    <div>
      {/* Hero */}
      <div className="px-6 pt-8">
        <h1 className="text-[28px] font-bold tracking-tight">
          Good afternoon, <span className="text-ev-accent">{user.name.split(' ')[0]}</span> 👋
        </h1>
        <p className="text-ev-muted text-[14px] mt-1">3 charging sessions this week · {user.totalKwh} kWh delivered</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 px-6 mt-6">
        <StatCard label="Stations Online" value="2,847" change="12% from last week" color="text-ev-accent" />
        <StatCard label="Available Now" value={liveAvail.toLocaleString()} change="8% availability rate" color="text-ev-accent2" />
        <StatCard label="Your Sessions" value={user.totalSessions} change="3 from last month" color="text-yellow-400" />
        <StatCard label="CO₂ Saved" value={`${user.co2Saved} kg`} change="11% this month" color="text-ev-purple" />
      </div>

      {/* Main grid */}
      <div className="grid gap-4 px-6 mt-4" style={{ gridTemplateColumns: '1fr 320px' }}>
        <div className="flex flex-col gap-4">
          {/* Map */}
          <div className="card-ev">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[14px] font-semibold">Station Map — Live Network</span>
              <span className="badge-accent">● OCPI Connected</span>
            </div>
            <div className="rounded-xl overflow-hidden h-[260px] relative" style={{ background: 'linear-gradient(180deg, #0d1526 0%, #111827 100%)' }}>
              {/* Grid lines */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
              {/* Roads */}
              {[{ h: '35%' }, { h: '60%' }].map((r, i) => (
                <div key={i} className="absolute left-0 right-0 h-[2px]" style={{ top: r.h, background: 'rgba(255,255,255,0.06)' }} />
              ))}
              {[{ l: '30%' }, { l: '65%' }].map((r, i) => (
                <div key={i} className="absolute top-0 bottom-0 w-[2px]" style={{ left: r.l, background: 'rgba(255,255,255,0.06)' }} />
              ))}
              {/* Station pins */}
              {[
                { st: STATIONS[0], top: '30%', left: '22%', color: '#00e5a0', size: 14 },
                { st: STATIONS[1], top: '55%', left: '40%', color: '#0ea5e9', size: 18 },
                { st: STATIONS[2], top: '42%', left: '70%', color: '#00e5a0', size: 14 },
                { st: STATIONS[3], top: '68%', left: '58%', color: '#f59e0b', size: 14 },
                { st: STATIONS[4], top: '25%', left: '75%', color: '#00e5a0', size: 14 },
                { st: STATIONS[5], top: '75%', left: '25%', color: '#ef4444', size: 14 },
                { st: STATIONS[6], top: '48%', left: '84%', color: '#f59e0b', size: 14 },
                { st: STATIONS[7], top: '20%', left: '50%', color: '#0ea5e9', size: 18 },
              ].map(({ st, top, left, color, size }) => (
                <button
                  key={st.id}
                  onClick={() => handlePin(st)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-transform"
                  style={{ top, left }}
                  title={st.name}
                >
                  <div style={{ width: size, height: size, background: color, borderRadius: '50%', boxShadow: `0 0 8px ${color}80` }} />
                </button>
              ))}
              {/* Counter */}
              <div className="absolute top-2 right-2 bg-ev-bg/85 border border-white/10 rounded-lg px-3 py-[5px] text-[11px] text-ev-accent font-mono">
                🔌 8 stations in view
              </div>
              {/* Legend */}
              <div className="absolute bottom-2 left-2 flex gap-3 bg-ev-bg/85 rounded-lg px-3 py-2">
                {[['#00e5a0','Available'],['#0ea5e9','DC Fast'],['#f59e0b','Busy'],['#ef4444','Offline']].map(([c,l]) => (
                  <div key={l} className="flex items-center gap-1 text-[10px] text-ev-muted">
                    <div className="w-2 h-2 rounded-full" style={{ background: c }} />{l}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="card-ev">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[14px] font-semibold">Weekly Energy Delivered (kWh)</span>
              <span className="badge-blue">7-day</span>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={WEEKLY_DATA} barSize={32}>
                <XAxis dataKey="day" tick={{ fill: '#8b9ab8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: '#1a2438', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f0f4ff', fontSize: 12 }}
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  formatter={(v) => [`${v} kWh`, 'Energy']}
                />
                <Bar dataKey="kwh" radius={[4, 4, 0, 0]}>
                  {WEEKLY_DATA.map((e, i) => (
                    <Cell key={i} fill={i === 4 ? '#00e5a0' : 'rgba(0,229,160,0.2)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          <div className="card-ev">
            {/* AI insight */}
            <div className="bg-gradient-to-br from-ev-purple/10 to-ev-accent2/8 border border-ev-purple/20 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-ev-purple mb-2">
                <div className="w-2 h-2 rounded-full bg-ev-purple animate-pulse-slow" />
                AI Recommendation
              </div>
              <p className="text-[12px] text-ev-muted leading-relaxed">
                Based on your travel pattern, <strong className="text-white">Tata Power – Phase 3</strong> (1.2 km) is predicted to be{' '}
                <strong className="text-ev-accent">92% free</strong> between 4–6 PM today. Est. wait: &lt;2 min.
              </p>
            </div>
            <div className="text-[14px] font-semibold mb-3">Recent Activity</div>
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-[10px] border-b border-ev-border last:border-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${a.bg}`}>
                  <a.Icon size={14} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium truncate">{a.title}</div>
                  <div className="text-[11px] text-ev-muted mt-[2px] truncate">{a.sub}</div>
                </div>
                <div className="text-[11px] text-ev-muted font-mono flex-shrink-0">{a.time}</div>
              </div>
            ))}
          </div>

          <div className="card-ev">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] font-semibold">Network Distribution</span>
              <span className="badge-purple">OCPP 2.0.1</span>
            </div>
            {NETWORKS.map(n => (
              <div key={n.name} className="flex items-center gap-3 mb-[10px] last:mb-0">
                <div className="text-[12px] text-ev-muted min-w-[80px]">{n.name}</div>
                <div className="flex-1 bg-white/5 rounded h-[6px] overflow-hidden">
                  <div className="h-full rounded transition-all duration-1000" style={{ width: `${n.pct}%`, background: n.color }} />
                </div>
                <div className="text-[11px] text-ev-muted font-mono min-w-[28px]">{n.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

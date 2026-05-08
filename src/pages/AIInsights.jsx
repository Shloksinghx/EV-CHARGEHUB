import React, { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { STATIONS } from '../data/stations'
import { getRecommendations, getUserInsights, getDynamicPricing, MODEL_METRICS, predictAvailability } from '../utils/aiEngine'

export default function AIInsights() {
  const { user } = useApp()
  const recs = useMemo(() => getRecommendations(user, STATIONS), [])
  const insights = useMemo(() => getUserInsights(user), [])
  const pricing = useMemo(() => getDynamicPricing(14), [])
  const forecast = useMemo(() => predictAvailability('ST001', 12), [])
  const fhours = Array.from({length:12},(_,i)=>`${(new Date().getHours()+i)%24}`)

  return (
    <div className="px-6 pt-6">
      <div className="mb-6">
        <h1 className="text-[20px] font-bold tracking-tight">AI Intelligence Hub</h1>
        <p className="text-[13px] text-ev-muted mt-1">Predictive analytics, recommendations & user behavior insights</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Predictive Availability */}
        <div className="card-ev">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[18px]" style={{background:'rgba(139,92,246,0.12)'}}>🔮</div>
            <div>
              <div className="text-[14px] font-semibold">Predictive Availability</div>
              <div className="text-[11px] text-ev-muted">LSTM model · 94.2% accuracy</div>
            </div>
          </div>
          <div className="flex items-end gap-[4px] h-[60px] mb-2">
            {forecast.map((v, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{
                height: `${v}%`,
                background: v > 70 ? 'rgba(239,68,68,0.6)' : v > 50 ? 'rgba(245,158,11,0.6)' : 'rgba(0,229,160,0.6)'
              }} />
            ))}
          </div>
          <div className="flex gap-[4px]">
            {fhours.map((h,i) => i%2===0 && <div key={h} className="flex-[2] text-[9px] text-ev-muted">{h}h</div>)}
          </div>
          <div className="text-[11px] text-ev-muted mt-2">Occupancy forecast · Next 12 hours</div>
        </div>

        {/* Smart Recs */}
        <div className="card-ev">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[18px]" style={{background:'rgba(14,165,233,0.12)'}}>🎯</div>
            <div>
              <div className="text-[14px] font-semibold">Smart Recommendations</div>
              <div className="text-[11px] text-ev-muted">Collaborative filtering · v2.1</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {recs.slice(0,4).map(s => (
              <div key={s.id} className="flex items-center gap-2 bg-ev-surface2 rounded-lg px-3 py-2">
                <span className="text-[13px] font-bold text-ev-accent font-mono min-w-[36px]">{s.score}</span>
                <div>
                  <div className="text-[12px] font-medium truncate" style={{maxWidth:160}}>{s.name}</div>
                  <div className="text-[10px] text-ev-muted">{s.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Behavior */}
        <div className="card-ev">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[18px]" style={{background:'rgba(0,229,160,0.12)'}}>📊</div>
            <div>
              <div className="text-[14px] font-semibold">User Behavior Insights</div>
              <div className="text-[11px] text-ev-muted">Segment: <span className="text-ev-accent">{insights.segment}</span></div>
            </div>
          </div>
          <div>
            {insights.insights.map(ins => (
              <div key={ins.label} className="flex items-center gap-2 py-[7px] border-b border-ev-border last:border-0">
                <div className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{background:ins.color}} />
                <div className="text-[12px]">
                  <span className="text-ev-muted">{ins.label}: </span>
                  <span>{ins.value}</span>
                </div>
              </div>
            ))}
            <div className="mt-3 text-[11px] text-ev-muted">
              LTV estimate: <span className="text-ev-accent font-mono">₹{insights.lifetimeValue.toLocaleString('en-IN')}</span>
              {' '}· Churn risk: <span className="text-ev-green">{(insights.churnRisk * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Dynamic Pricing */}
        <div className="card-ev">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[18px]" style={{background:'rgba(245,158,11,0.12)'}}>⚡</div>
            <div>
              <div className="text-[14px] font-semibold">Dynamic Pricing Engine</div>
              <div className="text-[11px] text-ev-muted">Real-time · Demand-aware</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {pricing.schedule.map(p => (
              <div key={p.time} className="bg-ev-surface2 rounded-lg p-3 text-center">
                <div className="text-[10px] text-ev-muted">{p.time}</div>
                <div className="text-[18px] font-bold font-mono mt-1" style={{color:p.color}}>₹{p.rate}</div>
                <div className="text-[10px] text-ev-muted">{p.demand}</div>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-ev-muted">
            Current: <span style={{color:pricing.color}} className="font-semibold">{pricing.label}</span> — ₹{pricing.currentRate}/kWh ({pricing.multiplier > 1 ? `+${Math.round((pricing.multiplier-1)*100)}%` : `-${Math.round((1-pricing.multiplier)*100)}%`})
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="card-ev">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[14px] font-semibold">Model Performance Metrics</span>
          <span className="badge-accent">Live</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {MODEL_METRICS.map(m => (
            <div key={m.label} className="bg-ev-surface2 rounded-xl p-4 text-center">
              <div className="text-[22px] font-bold font-mono" style={{color:m.color}}>{m.value}</div>
              <div className="text-[11px] text-ev-muted mt-1">{m.label}</div>
              <div className="text-[10px] mt-1" style={{color:m.color}}>{m.trend}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

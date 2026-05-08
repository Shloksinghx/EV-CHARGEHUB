import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Zap, MapPin, Clock, CreditCard } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { STATIONS, CHARGER_TYPES, TIME_SLOTS, AI_HOURLY_FORECAST, FORECAST_HOURS } from '../data/stations'
import { useReservation } from '../hooks/useOCPI'
import { getDynamicPricing } from '../utils/aiEngine'

export default function Booking() {
  const { stationId } = useParams()
  const { selectedStation, setSelectedStation, balance, deductBalance, addBooking, showToast } = useApp()
  const navigate = useNavigate()
  const { reserve, status: resStatus } = useReservation()

  const station = stationId
    ? STATIONS.find(s => s.id === stationId) || selectedStation
    : selectedStation

  useEffect(() => {
    if (station) setSelectedStation(station)
  }, [station])

  const [chargerIdx, setChargerIdx] = useState(0)
  const [slot, setSlot] = useState('16:00')
  const [duration, setDuration] = useState(60)

  if (!station) {
    return (
      <div className="px-6 pt-12 text-center text-ev-muted">
        <div className="text-[48px] mb-4">📍</div>
        <p className="text-[16px] font-medium mb-2">No station selected</p>
        <p className="text-[13px] mb-6">Go to Find Stations and choose a location to book.</p>
        <button onClick={() => navigate('/stations')} className="bg-ev-accent/10 border border-ev-accent/30 text-ev-accent px-6 py-2 rounded-xl text-[14px] font-semibold hover:bg-ev-accent/20 transition-colors">
          Find Stations →
        </button>
      </div>
    )
  }

  const charger = CHARGER_TYPES[chargerIdx]
  const pricing = getDynamicPricing(station.pricePerKwh)
  const rate = parseFloat((station.pricePerKwh * charger.rateMultiplier * pricing.multiplier).toFixed(1))
  const kwhEst = parseFloat((charger.powerKw * duration / 60).toFixed(1))
  const energyCost = parseFloat((rate * kwhEst).toFixed(2))
  const tax = parseFloat((energyCost * 0.05).toFixed(2))
  const total = parseFloat((energyCost + tax).toFixed(2))

  const handleBook = async () => {
    if (balance < total) { showToast('Insufficient balance. Please top up your wallet.', 'error'); return }
    try {
      const res = await reserve({ stationId: station.id, connectorId: 'C1', expiryDate: new Date(Date.now() + 1800000).toISOString(), idToken: 'USER_TOKEN' })
      deductBalance(total)
      addBooking({ stationId: station.id, stationName: station.name, slot, duration, charger: charger.name, cost: total, reservationId: res.reservationId })
      showToast(`✅ Booked at ${station.name} · ${slot} · ₹${total} deducted`, 'check')
      navigate('/wallet')
    } catch {
      showToast('Booking failed. Please try again.', 'error')
    }
  }

  return (
    <div className="px-6 pt-6">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[20px] font-bold tracking-tight">Book a Charging Slot</h1>
        <div className="flex items-center gap-2 text-[13px] text-ev-muted mt-1">
          <MapPin size={13} />
          {station.name} · {station.address} · {station.distance} km
        </div>
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Left */}
        <div className="flex flex-col gap-4">
          {/* Charger Type */}
          <div className="card-ev">
            <div className="text-[11px] font-semibold uppercase tracking-[0.8px] text-ev-muted mb-3">Select Charger Type</div>
            <div className="flex flex-col gap-2">
              {CHARGER_TYPES.map((c, i) => (
                <button key={c.id} onClick={() => setChargerIdx(i)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                    chargerIdx === i ? 'bg-ev-accent/6 border-ev-accent/40' : 'border-ev-border2 hover:border-ev-accent/25'
                  }`}>
                  <div>
                    <div className="text-[13px] font-semibold">{c.name}</div>
                    <div className="text-[11px] text-ev-muted mt-[2px]">{c.spec}</div>
                  </div>
                  <div className="text-[13px] font-bold text-ev-accent font-mono">
                    ₹{parseFloat((station.pricePerKwh * c.rateMultiplier).toFixed(1))}/kWh
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="card-ev">
            <div className="text-[11px] font-semibold uppercase tracking-[0.8px] text-ev-muted mb-3">Time Slot</div>
            <div className="grid grid-cols-4 gap-[6px]">
              {TIME_SLOTS.map(({ time, status }) => (
                <button key={time} disabled={status === 'unavailable'}
                  onClick={() => setSlot(time)}
                  className={`py-2 rounded-lg text-[12px] font-mono text-center border transition-all ${
                    status === 'unavailable' ? 'opacity-35 line-through cursor-not-allowed border-ev-border text-ev-muted' :
                    slot === time ? 'bg-ev-accent/10 border-ev-accent/50 text-ev-accent' :
                    status === 'peak' ? 'border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/5' :
                    'border-ev-border2 text-ev-muted hover:text-white hover:border-ev-accent/25'
                  }`}>
                  {time}
                </button>
              ))}
            </div>
            <div className="flex gap-4 text-[11px] text-ev-muted mt-3">
              <span>🟡 Peak pricing</span><span>❌ Unavailable</span>
            </div>
          </div>

          {/* Duration */}
          <div className="card-ev">
            <div className="text-[11px] font-semibold uppercase tracking-[0.8px] text-ev-muted mb-3">
              Duration: <span className="text-ev-accent font-mono">{duration < 60 ? `${duration} min` : `${(duration / 60).toFixed(1)} hr`}</span>
            </div>
            <input type="range" min="15" max="180" step="15" value={duration} onChange={e => setDuration(+e.target.value)} />
            <div className="flex justify-between text-[10px] text-ev-muted mt-1"><span>15 min</span><span>3 hr</span></div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4">
          {/* AI Forecast */}
          <div className="card-ev" style={{ background: 'rgba(139,92,246,0.06)', borderColor: 'rgba(139,92,246,0.2)' }}>
            <div className="flex items-center gap-2 text-[12px] font-semibold text-ev-purple mb-3">
              <Zap size={13} /> AI Availability Forecast
            </div>
            <div className="flex items-end gap-[3px] h-[60px] mb-2">
              {AI_HOURLY_FORECAST.map((v, i) => (
                <div key={i} className="flex-1 rounded-t-sm" style={{
                  height: `${v}%`,
                  background: v > 70 ? 'rgba(239,68,68,0.55)' : v > 50 ? 'rgba(245,158,11,0.55)' : 'rgba(0,229,160,0.55)'
                }} title={`${v}% busy`} />
              ))}
            </div>
            <div className="flex gap-[3px]">
              {FORECAST_HOURS.map(h => (
                <div key={h} className="flex-1 text-center text-[9px] text-ev-muted">{h}</div>
              ))}
            </div>
            <div className="text-[11px] text-ev-muted mt-2">🟢 Low &nbsp;🟡 Medium &nbsp;🔴 High demand</div>
          </div>

          {/* Dynamic pricing info */}
          <div className="card-ev">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-ev-muted">Current pricing</span>
              <span className="text-[11px] px-2 py-[2px] rounded" style={{ background: pricing.color + '20', color: pricing.color, border: `1px solid ${pricing.color}40` }}>
                {pricing.label}
              </span>
            </div>
            <div className="text-[20px] font-bold font-mono" style={{ color: pricing.color }}>
              ₹{pricing.currentRate}/kWh
            </div>
            <div className="text-[11px] text-ev-muted mt-1">{pricing.multiplier > 1 ? '⚡ Tip: Charge after 10 PM for lowest rates' : '✅ Great time to charge!'}</div>
          </div>

          {/* Cost Summary */}
          <div className="card-ev">
            <div className="text-[11px] font-semibold uppercase tracking-[0.8px] text-ev-muted mb-3">Cost Summary</div>
            <div className="bg-ev-surface2 rounded-xl p-4">
              {[
                ['Charger rate', `₹${rate}/kWh`],
                ['Est. energy', `${kwhEst} kWh`],
                ['Energy cost', `₹${energyCost.toFixed(2)}`],
                ['GST (5%)', `₹${tax.toFixed(2)}`],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between text-[13px] py-[4px]">
                  <span className="text-ev-muted">{l}</span><span>{v}</span>
                </div>
              ))}
              <div className="flex justify-between items-center border-t border-ev-border2 mt-2 pt-3">
                <span className="text-[15px] font-bold">Total</span>
                <span className="text-[17px] font-bold text-ev-accent font-mono">₹{total.toFixed(2)}</span>
              </div>
              <div className="text-[11px] text-ev-muted mt-2">
                Wallet balance: <span className={balance >= total ? 'text-ev-accent' : 'text-red-400'}>₹{balance.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleBook}
            disabled={resStatus === 'loading'}
            className="w-full py-[14px] rounded-xl font-bold text-[15px] text-ev-bg tracking-tight transition-all hover:-translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #00e5a0, #00c87a)' }}
          >
            {resStatus === 'loading' ? '⏳ Processing...' : '⚡ Confirm & Pay'}
          </button>
        </div>
      </div>
    </div>
  )
}

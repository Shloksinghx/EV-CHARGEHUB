import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Star, Zap, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function StationCard({ station }) {
  const navigate = useNavigate()
  const { setSelectedStation } = useApp()

  const statusColor = {
    available: 'text-ev-accent', busy: 'text-ev-warn', offline: 'text-ev-danger'
  }[station.status]

  const handleBook = () => {
    setSelectedStation(station)
    navigate(`/booking/${station.id}`)
  }

  return (
    <div
      className="card-ev cursor-pointer hover:border-white/20 hover:-translate-y-[1px] transition-all duration-200 grid gap-3"
      style={{ gridTemplateColumns: '1fr auto' }}
      onClick={handleBook}
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[15px] font-semibold">{station.name}</span>
          {station.isRecommended && (
            <span className="badge-purple text-[10px]">AI Pick</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-[12px] text-ev-muted mb-3">
          <span style={{ background: station.networkColor + '20', color: station.networkColor, border: `1px solid ${station.networkColor}40` }}
            className="text-[10px] px-2 py-[2px] rounded font-semibold font-mono">
            {station.network}
          </span>
          <span className="flex items-center gap-1"><MapPin size={11} />{station.address}</span>
          <span className="flex items-center gap-1"><Star size={11} />{station.rating}</span>
        </div>
        <div className="flex gap-[6px] flex-wrap mb-2">
          {station.connectors.map(c => (
            <span key={c} className={`text-[11px] px-2 py-[2px] rounded-md font-medium border ${
              c.includes('DC') || c.includes('CCS') || c.includes('CHAd')
                ? 'bg-ev-accent2/8 text-ev-accent2 border-ev-accent2/20'
                : 'bg-ev-accent/8 text-ev-accent border-ev-accent/20'
            }`}>{c}</span>
          ))}
        </div>
        {station.available > 0 ? (
          <div className="text-[11px] text-ev-purple flex items-center gap-1">
            <Zap size={11} />
            AI: ~{Math.round((1 - station.available / station.total) * 100)}% occupied · {station.aiReason}
          </div>
        ) : (
          <div className="text-[11px] text-red-400">● All slots occupied</div>
        )}
      </div>

      <div className="text-right flex flex-col justify-between">
        <div>
          <div className="text-[13px] font-bold font-mono">{station.distance} km</div>
          <div className="text-[11px] text-ev-muted mt-1">₹{station.pricePerKwh}/kWh</div>
          <div className={`text-[11px] font-semibold mt-2 ${statusColor}`}>
            {station.available > 0 ? `${station.available}/${station.total} free` : 'Full'}
          </div>
        </div>
        <ChevronRight size={16} className="text-ev-muted ml-auto mt-2" />
      </div>
    </div>
  )
}

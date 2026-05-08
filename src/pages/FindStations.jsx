import React, { useState, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import StationCard from '../components/StationCard'
import { STATIONS } from '../data/stations'

const FILTERS = ['All Networks','DC Fast','AC Slow','Available Now','< 2km','Tata Power','ChargePoint','Ather','Jio-bp']

export default function FindStations() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(['All Networks'])

  const toggle = (f) => {
    if (f === 'All Networks') { setActive(['All Networks']); return }
    let next = active.filter(x => x !== 'All Networks')
    next = next.includes(f) ? next.filter(x => x !== f) : [...next, f]
    setActive(next.length ? next : ['All Networks'])
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return STATIONS.filter(s => {
      const matchQ = !q || s.name.toLowerCase().includes(q) || s.network.toLowerCase().includes(q) || s.address.toLowerCase().includes(q)
      const matchF = active.includes('All Networks') || active.some(f =>
        (f === 'Available Now' && s.available > 0) ||
        (f === 'DC Fast' && s.connectors.some(c => c.includes('DC'))) ||
        (f === 'AC Slow' && s.connectors.some(c => c.includes('AC'))) ||
        (f === '< 2km' && s.distance < 2) ||
        s.network.includes(f)
      )
      return matchQ && matchF
    })
  }, [query, active])

  return (
    <div className="px-6 pt-6">
      {/* Search */}
      <div className="relative mb-3">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ev-muted" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by location, network, or connector type..."
          className="w-full pl-11 pr-4 py-3 bg-ev-surface border border-ev-border2 rounded-xl text-[15px] text-white placeholder-ev-muted outline-none focus:border-ev-accent/40 transition-colors font-sans"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {FILTERS.map(f => (
          <button key={f} onClick={() => toggle(f)}
            className={`px-3 py-[6px] rounded-full text-[12px] font-medium border transition-all ${
              active.includes(f)
                ? 'bg-ev-accent/10 border-ev-accent/40 text-ev-accent'
                : 'border-ev-border2 text-ev-muted hover:text-white hover:border-ev-accent/25'
            }`}>
            {f}
          </button>
        ))}
        <span className="ml-auto text-[12px] text-ev-muted self-center">{filtered.length} stations</span>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-ev-muted">
            <div className="text-[48px] mb-3">🔌</div>
            <div>No stations match your filters</div>
          </div>
        ) : (
          filtered.map(s => <StationCard key={s.id} station={s} />)
        )}
      </div>
    </div>
  )
}

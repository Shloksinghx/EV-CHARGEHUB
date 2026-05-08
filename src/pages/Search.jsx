import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { STATIONS } from '../data/stations'

const FILTERS = ['All Networks','DC Fast','AC Slow','Available Now','< 5km','Tata Power','ChargePoint','Ather','Jio-bp']

export default function Search() {
  const navigate = useNavigate()
  const [query, setQuery]           = useState('')
  const [activeFilters, setFilters] = useState(['All Networks'])

  const toggleFilter = (f) => {
    if (f === 'All Networks') { setFilters(['All Networks']); return }
    setFilters(prev => {
      const next = prev.filter(x => x !== 'All Networks')
      return next.includes(f) ? (next.filter(x => x !== f) || ['All Networks']) : [...next, f]
    })
  }

  const filtered = STATIONS.filter(s => {
    const q = query.toLowerCase()
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.network.toLowerCase().includes(q) || s.address.toLowerCase().includes(q)
    const matchF = activeFilters.includes('All Networks') ||
      activeFilters.some(f =>
        s.network.includes(f) ||
        (f === 'Available Now' && s.available > 0) ||
        (f === 'DC Fast'       && s.ports.some(p => p.type === 'DC')) ||
        (f === 'AC Slow'       && s.ports.some(p => p.type === 'AC')) ||
        (f === '< 5km'         && parseFloat(s.distance) < 5)
      )
    return matchQ && matchF
  })

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Search header */}
      <div style={{ padding: '24px 24px 0' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:18, color:'#8b9ab8' }}>🔍</span>
          <input
            className="input-base"
            style={{ paddingLeft: 44 }}
            placeholder="Search by location, network, or connector type..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div style={{ display:'flex', gap:8, marginTop:12, flexWrap:'wrap' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => toggleFilter(f)} style={{
              padding:'6px 14px', borderRadius:20, fontSize:12, fontWeight:500, cursor:'pointer',
              border: activeFilters.includes(f) ? '1px solid rgba(0,229,160,0.4)' : '1px solid rgba(255,255,255,0.14)',
              background: activeFilters.includes(f) ? 'rgba(0,229,160,0.1)' : 'transparent',
              color: activeFilters.includes(f) ? '#00e5a0' : '#8b9ab8',
              transition: 'all 0.2s', fontFamily:"'Space Grotesk',sans-serif",
            }}>{f}</button>
          ))}
        </div>
        <div style={{ fontSize:12, color:'#8b9ab8', marginTop:10 }}>
          {filtered.length} station{filtered.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* List */}
      <div style={{ padding:'12px 24px 24px', display:'flex', flexDirection:'column', gap:10 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'60px 20px', color:'#8b9ab8' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🔌</div>
            <div>No stations match your filters</div>
          </div>
        )}
        {filtered.map(s => (
          <div key={s.id} onClick={() => navigate('/booking', { state: { station: s } })}
            style={{
              background:'#111827', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, padding:18,
              cursor:'pointer', display:'grid', gridTemplateColumns:'1fr auto', gap:12,
              transition:'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.14)'; e.currentTarget.style.background='#1a2438'; e.currentTarget.style.transform='translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.background='#111827'; e.currentTarget.style.transform='none' }}
          >
            <div>
              <div style={{ fontSize:15, fontWeight:600, marginBottom:4, display:'flex', alignItems:'center', gap:8 }}>
                {s.name}
                {s.aiRecommended && <span style={{ fontSize:10, padding:'2px 6px', borderRadius:4, background:'rgba(139,92,246,0.1)', color:'#8b5cf6', border:'1px solid rgba(139,92,246,0.2)', fontWeight:600 }}>AI Pick</span>}
                {s.status === 'OFFLINE' && <span style={{ fontSize:10, padding:'2px 6px', borderRadius:4, background:'rgba(239,68,68,0.1)', color:'#ef4444', border:'1px solid rgba(239,68,68,0.2)' }}>OFFLINE</span>}
              </div>
              <div style={{ fontSize:12, color:'#8b9ab8', display:'flex', gap:12, alignItems:'center', marginBottom:10 }}>
                <span style={{ fontSize:10, padding:'2px 6px', borderRadius:4, fontWeight:700, fontFamily:"'DM Mono',monospace", background:'rgba(0,229,160,0.08)', color:'#00e5a0', border:'1px solid rgba(0,229,160,0.2)' }}>{s.network}</span>
                <span>📍 {s.address}</span>
                <span>⭐ {s.rating} ({s.reviews})</span>
                <span>🕐 {s.openHours}</span>
              </div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:8 }}>
                {s.ports.map((p, i) => (
                  <span key={i} style={{
                    fontSize:11, padding:'3px 8px', borderRadius:6, fontWeight:500,
                    background: p.type==='DC' ? 'rgba(14,165,233,0.08)' : 'rgba(0,229,160,0.08)',
                    color: p.type==='DC' ? '#0ea5e9' : '#00e5a0',
                    border: `1px solid ${p.type==='DC' ? 'rgba(14,165,233,0.2)' : 'rgba(0,229,160,0.2)'}`,
                  }}>{p.type} {p.power}kW · {p.connector}</span>
                ))}
              </div>
              {s.available > 0
                ? <div style={{ fontSize:11, color:'#8b5cf6' }}>🤖 AI: ~{Math.round((1 - s.available/s.total)*100)}% occupied · Good time to charge</div>
                : <div style={{ fontSize:11, color:'#ef4444' }}>● All slots occupied</div>
              }
              <div style={{ display:'flex', gap:6, marginTop:6, flexWrap:'wrap' }}>
                {s.amenities.map(a => <span key={a} style={{ fontSize:10, color:'#8b9ab8', padding:'2px 6px', borderRadius:4, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>{a}</span>)}
              </div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:13, fontWeight:600, fontFamily:"'DM Mono',monospace" }}>{s.distance}</div>
              <div style={{ fontSize:11, color:'#8b9ab8', marginTop:2 }}>₹{s.pricePerKwh}/kWh</div>
              <div style={{ fontSize:11, fontWeight:600, marginTop:6, color: s.available > 0 ? '#00e5a0' : '#ef4444' }}>
                {s.available > 0 ? `${s.available}/${s.total} free` : 'Full'}
              </div>
              <div style={{ display:'flex', gap:3, marginTop:6, justifyContent:'flex-end' }}>
                {Array.from({ length: s.total }, (_, i) => (
                  <div key={i} style={{ width:18, height:6, borderRadius:3, background: i < s.available ? '#00e5a0' : 'rgba(255,255,255,0.1)' }} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

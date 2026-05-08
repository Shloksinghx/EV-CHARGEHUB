import { NavLink } from 'react-router-dom'
import { formatINR } from '../utils/format'

const NAV_LINKS = [
  { to: '/',         label: 'Dashboard' },
  { to: '/search',   label: 'Find Stations' },
  { to: '/booking',  label: 'Book' },
  { to: '/ai',       label: 'AI Insights' },
  { to: '/wallet',   label: 'Wallet' },
]

export default function Navbar({ balance }) {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', height: 60,
      background: 'rgba(10,15,30,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 700, letterSpacing: '-0.5px' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg,#00e5a0,#0ea5e9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
        }}>⚡</div>
        ChargeHub
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: 4 }}>
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === '/'} style={({ isActive }) => ({
            padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500,
            border: 'none', background: isActive ? 'rgba(0,229,160,0.1)' : 'transparent',
            color: isActive ? '#00e5a0' : '#8b9ab8',
            cursor: 'pointer', textDecoration: 'none',
            transition: 'all 0.2s',
          })}>
            {label}
          </NavLink>
        ))}
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.25)',
          borderRadius: 8, padding: '5px 12px', fontSize: 13, fontWeight: 600,
          color: '#00e5a0', fontFamily: "'DM Mono', monospace",
        }}>
          ₹ {formatINR(balance)}
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg,#8b5cf6,#0ea5e9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, cursor: 'pointer',
        }}>AK</div>
      </div>
    </nav>
  )
}

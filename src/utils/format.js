export const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)

export const formatKwh = (val) => `${parseFloat(val).toFixed(1)} kWh`

export const calcCost = (ratePerKwh, powerKw, durationMin) => {
  const kwhUsed = (powerKw * durationMin) / 60
  const energy  = parseFloat((ratePerKwh * kwhUsed).toFixed(2))
  const gst     = parseFloat((energy * 0.05).toFixed(2))
  const total   = parseFloat((energy + gst).toFixed(2))
  return { kwhUsed: parseFloat(kwhUsed.toFixed(2)), energy, gst, total }
}

export const getConnectorClass = (type) =>
  type === 'DC' || type === 'CCS2' || type === 'CHAdeMO' ? 'dc' : 'ac'

export const getStatusColor = (status) => {
  switch (status) {
    case 'AVAILABLE': return '#00e5a0'
    case 'OCCUPIED':  return '#f59e0b'
    case 'OFFLINE':   return '#ef4444'
    default:          return '#8b9ab8'
  }
}

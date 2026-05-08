/**
 * AI/ML Engine — Simulated ML models for:
 * 1. Predictive charger availability (LSTM-like logic)
 * 2. Smart station recommendations (collaborative filtering)
 * 3. User behavior insights (clustering)
 * 4. Dynamic pricing engine
 */

// --- Predictive Availability (simulated LSTM output) ---
export function predictAvailability(stationId, hoursAhead = 12) {
  const seed = stationId.charCodeAt(stationId.length - 1)
  return Array.from({ length: hoursAhead }, (_, i) => {
    const hour = (new Date().getHours() + i) % 24
    const isPeak = (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20)
    const isNight = hour >= 23 || hour <= 5
    const base = isNight ? 15 : isPeak ? 80 : 45
    const noise = (Math.sin(seed + i * 0.7) * 20)
    return Math.max(5, Math.min(95, Math.round(base + noise)))
  })
}

// --- Smart Recommendations (collaborative filtering) ---
export function getRecommendations(userId, stations, userHistory = []) {
  return stations
    .filter(s => s.status !== 'offline')
    .map(s => ({
      ...s,
      score: calculateScore(s, userHistory),
      reason: getRecommendationReason(s, userHistory),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}

function calculateScore(station, history) {
  let score = 5.0
  // Availability weight
  score += (station.available / station.total) * 2.5
  // Rating weight
  score += (station.rating - 3) * 0.8
  // Distance penalty
  score -= station.distance * 0.15
  // History boost (if user visited before)
  if (history.some(h => h.stationId === station.id)) score += 0.8
  // Network preference (simulate)
  if (station.network === 'Tata Power') score += 0.3
  // DC fast charger boost
  if (station.connectors.some(c => c.includes('DC'))) score += 0.5
  return Math.min(10, Math.max(0, parseFloat(score.toFixed(1))))
}

function getRecommendationReason(station, history) {
  if (station.distance < 2) return 'Closest to your location'
  if (station.connectors.some(c => c.includes('120kW'))) return 'Fastest charging speed nearby'
  if (history.some(h => h.stationId === station.id)) return 'You have visited before'
  if (station.rating >= 4.8) return 'Top-rated in your area'
  if (station.available === station.total) return 'All slots currently free'
  if (station.pricePerKwh <= 10) return 'Best price per kWh today'
  return 'Good availability & rating'
}

// --- User Behavior Insights (K-means cluster output) ---
export function getUserInsights(user) {
  return {
    segment: 'Power Commuter',
    segmentDesc: 'Weekday peak-hour charger, DC Fast preference',
    insights: [
      { label: 'Peak charging window', value: 'Weekdays 5–7 PM', color: '#00e5a0' },
      { label: 'Preferred charger type', value: 'DC Fast (76% of sessions)', color: '#0ea5e9' },
      { label: 'Avg. session duration', value: '22 min · 14.2 kWh', color: '#f59e0b' },
      { label: 'Home cluster area', value: 'Sector 17–22, Chandigarh', color: '#8b5cf6' },
      { label: 'Loyalty network', value: 'Tata Power (58% sessions)', color: '#ef4444' },
    ],
    churnRisk: 0.12,
    lifetimeValue: 24800,
  }
}

// --- Dynamic Pricing Engine ---
export function getDynamicPricing(baseRatePerKwh) {
  const hour = new Date().getHours()
  const isPeakMorning = hour >= 8 && hour <= 10
  const isPeakEvening = hour >= 17 && hour <= 20
  const isNight = hour >= 23 || hour <= 5
  const isWeekend = [0, 6].includes(new Date().getDay())

  let multiplier = 1.0
  let label = 'Standard'
  let color = '#00e5a0'

  if (isPeakMorning || isPeakEvening) { multiplier = 1.25; label = 'Peak'; color = '#ef4444' }
  else if (isNight) { multiplier = 0.70; label = 'Off-peak'; color = '#8b5cf6' }
  else if (isWeekend) { multiplier = 1.10; label = 'Weekend'; color = '#f59e0b' }

  const schedule = [
    { time: 'Now',  rate: Math.round(baseRatePerKwh * multiplier), demand: label, color },
    { time: '4 PM', rate: Math.round(baseRatePerKwh * 1.25), demand: 'Peak', color: '#ef4444' },
    { time: '10 PM', rate: Math.round(baseRatePerKwh * 0.80), demand: 'Low', color: '#00e5a0' },
    { time: '2 AM', rate: Math.round(baseRatePerKwh * 0.65), demand: 'Min', color: '#8b5cf6' },
  ]

  return { currentRate: Math.round(baseRatePerKwh * multiplier), multiplier, label, color, schedule }
}

// --- Model Performance Metrics ---
export const MODEL_METRICS = [
  { label: 'Prediction Accuracy', value: '94.2%', color: '#00e5a0', trend: '+1.3%' },
  { label: 'Rec Click-through', value: '38.7%', color: '#0ea5e9', trend: '+2.1%' },
  { label: 'Avg Wait Reduction', value: '6.2 min', color: '#8b5cf6', trend: '-0.8 min' },
  { label: 'Model Latency', value: '42ms', color: '#f59e0b', trend: '-3ms' },
]

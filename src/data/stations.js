// Simulated OCPI/OCPP station data
export const STATIONS = [
  {
    id: 'ST001', name: 'Tata Power – Phase 3', network: 'Tata Power',
    address: 'Phase 3 Market, Mohali, Punjab', distance: 1.2,
    lat: 30.7046, lng: 76.7179, rating: 4.8, ratingCount: 234,
    available: 5, total: 6, pricePerKwh: 14,
    connectors: ['DC 50kW', 'AC 22kW', 'CCS2'],
    amenities: ['Cafe', 'Restroom', 'WiFi', 'Parking'],
    status: 'available', ocppVersion: '2.0.1', ocpiId: 'IN*TAP*E001',
    aiScore: 9.4, aiReason: 'Closest + fast DC + low wait time',
    networkColor: '#0ea5e9', isRecommended: true,
    lastHeartbeat: new Date(Date.now() - 30000),
  },
  {
    id: 'ST002', name: 'ChargePoint Hub – Sector 17', network: 'ChargePoint',
    address: 'Sector 17, Chandigarh', distance: 2.4,
    lat: 30.7394, lng: 76.7682, rating: 4.5, ratingCount: 178,
    available: 3, total: 4, pricePerKwh: 10,
    connectors: ['AC 7.4kW', 'AC 22kW'],
    amenities: ['Parking', 'Security'],
    status: 'available', ocppVersion: '1.6', ocpiId: 'IN*CPT*E002',
    aiScore: 7.2, aiReason: 'Budget-friendly AC charging',
    networkColor: '#00e5a0', isRecommended: false,
    lastHeartbeat: new Date(Date.now() - 45000),
  },
  {
    id: 'ST003', name: 'Jio-bp – Elante Mall', network: 'Jio-bp',
    address: 'Elante Mall, Industrial Area, Chandigarh', distance: 5.2,
    lat: 30.7057, lng: 76.8016, rating: 4.9, ratingCount: 312,
    available: 4, total: 4, pricePerKwh: 16,
    connectors: ['DC 120kW', 'CCS2', 'CHAdeMO', 'AC 22kW'],
    amenities: ['Mall Access', 'Restroom', 'WiFi', 'Food Court', 'Parking'],
    status: 'available', ocppVersion: '2.0.1', ocpiId: 'IN*JBP*E003',
    aiScore: 8.7, aiReason: 'Fastest charger in 10km radius',
    networkColor: '#f59e0b', isRecommended: false,
    lastHeartbeat: new Date(Date.now() - 12000),
  },
  {
    id: 'ST004', name: 'Ather Grid – IT Park', network: 'Ather',
    address: 'IT Park, Chandigarh', distance: 3.1,
    lat: 30.7276, lng: 76.8082, rating: 4.6, ratingCount: 143,
    available: 2, total: 3, pricePerKwh: 12,
    connectors: ['DC 15kW', 'AC 7.4kW'],
    amenities: ['Parking', 'Security Camera'],
    status: 'available', ocppVersion: '2.0.1', ocpiId: 'IN*ATH*E004',
    aiScore: 7.9, aiReason: 'On your usual commute route',
    networkColor: '#8b5cf6', isRecommended: false,
    lastHeartbeat: new Date(Date.now() - 60000),
  },
  {
    id: 'ST005', name: 'Statiq – ISBT', network: 'Statiq',
    address: 'ISBT Sector 43, Chandigarh', distance: 4.0,
    lat: 30.7127, lng: 76.7673, rating: 4.2, ratingCount: 98,
    available: 1, total: 4, pricePerKwh: 13,
    connectors: ['AC 22kW', 'CCS2 50kW'],
    amenities: ['Parking'],
    status: 'busy', ocppVersion: '1.6', ocpiId: 'IN*STQ*E005',
    aiScore: 5.1, aiReason: 'Currently 75% occupied',
    networkColor: '#10b981', isRecommended: false,
    lastHeartbeat: new Date(Date.now() - 25000),
  },
  {
    id: 'ST006', name: 'ChargeZone – Manimajra', network: 'ChargeZone',
    address: 'Manimajra, Chandigarh', distance: 7.3,
    lat: 30.7209, lng: 76.8369, rating: 3.8, ratingCount: 56,
    available: 0, total: 3, pricePerKwh: 11,
    connectors: ['AC 22kW', 'DC 30kW'],
    amenities: ['Parking'],
    status: 'offline', ocppVersion: '1.6', ocpiId: 'IN*CRZ*E006',
    aiScore: 2.0, aiReason: 'Currently offline',
    networkColor: '#ef4444', isRecommended: false,
    lastHeartbeat: new Date(Date.now() - 900000),
  },
  {
    id: 'ST007', name: 'Ola Electric – Airport Rd', network: 'Ola Electric',
    address: 'Airport Road, Mohali', distance: 6.8,
    lat: 30.6797, lng: 76.7880, rating: 4.1, ratingCount: 89,
    available: 2, total: 6, pricePerKwh: 9,
    connectors: ['AC 7.4kW'],
    amenities: ['Parking', 'Canteen'],
    status: 'busy', ocppVersion: '2.0.1', ocpiId: 'IN*OLA*E007',
    aiScore: 6.3, aiReason: 'Cheapest rate but slower AC only',
    networkColor: '#f97316', isRecommended: false,
    lastHeartbeat: new Date(Date.now() - 18000),
  },
  {
    id: 'ST008', name: 'BSES – Panchkula', network: 'BSES',
    address: 'Sector 5, Panchkula, Haryana', distance: 8.1,
    lat: 30.6955, lng: 76.8577, rating: 4.4, ratingCount: 121,
    available: 3, total: 4, pricePerKwh: 13,
    connectors: ['AC 22kW', 'DC 50kW'],
    amenities: ['Restroom', 'Parking', 'Security'],
    status: 'available', ocppVersion: '2.0.1', ocpiId: 'IN*BSS*E008',
    aiScore: 7.5, aiReason: 'Reliable uptime, less crowded',
    networkColor: '#06b6d4', isRecommended: false,
    lastHeartbeat: new Date(Date.now() - 40000),
  },
]

export const CHARGER_TYPES = [
  { id: 'dc_fast', name: 'DC Fast Charger', spec: '50 kW · CCS2 / CHAdeMO', rateMultiplier: 1.4, powerKw: 50 },
  { id: 'dc_ultra', name: 'DC Ultra-Fast', spec: '120 kW · CCS2', rateMultiplier: 1.6, powerKw: 120 },
  { id: 'ac_level2', name: 'AC Level 2', spec: '22 kW · Type 2', rateMultiplier: 1.0, powerKw: 22 },
  { id: 'ac_level1', name: 'AC Level 1', spec: '7.4 kW · 3-pin', rateMultiplier: 0.75, powerKw: 7.4 },
]

export const NETWORKS = [
  { name: 'Tata Power', count: 834, pct: 29, color: '#0ea5e9' },
  { name: 'ChargePoint', count: 612, pct: 21, color: '#00e5a0' },
  { name: 'Jio-bp', count: 510, pct: 18, color: '#f59e0b' },
  { name: 'Ather Grid', count: 427, pct: 15, color: '#8b5cf6' },
  { name: 'Others', count: 464, pct: 17, color: 'rgba(255,255,255,0.15)' },
]

export const TRANSACTIONS = [
  { id: 'T001', icon: 'zap', name: 'Tata Power – Phase 3', date: 'Today, 11:24 AM', amount: -168.00, type: 'debit', sub: 'DC 50kW · 12 kWh · 18 min', stationId: 'ST001' },
  { id: 'T002', icon: 'plus', name: 'Wallet Top-up', date: 'Yesterday, 8:00 PM', amount: 1000.00, type: 'credit', sub: 'UPI · PhonePe' },
  { id: 'T003', icon: 'zap', name: 'Jio-bp – Elante Mall', date: '23 Nov, 3:12 PM', amount: -256.00, type: 'debit', sub: 'DC 120kW · 16 kWh · 12 min', stationId: 'ST003' },
  { id: 'T004', icon: 'gift', name: 'Referral Bonus', date: '20 Nov', amount: 200.00, type: 'credit', sub: 'Friend joined ChargeHub' },
  { id: 'T005', icon: 'zap', name: 'Ather Grid – IT Park', date: '18 Nov, 7:30 AM', amount: -144.00, type: 'debit', sub: 'DC 15kW · 12 kWh · 45 min', stationId: 'ST004' },
  { id: 'T006', icon: 'plus', name: 'Wallet Top-up', date: '15 Nov', amount: 2000.00, type: 'credit', sub: 'Debit Card · HDFC' },
  { id: 'T007', icon: 'zap', name: 'ChargePoint – Sector 17', date: '12 Nov, 9:00 AM', amount: -88.00, type: 'debit', sub: 'AC 22kW · 8.8 kWh · 24 min', stationId: 'ST002' },
]

export const WEEKLY_DATA = [
  { day: 'Mon', kwh: 38, sessions: 2 },
  { day: 'Tue', kwh: 52, sessions: 3 },
  { day: 'Wed', kwh: 29, sessions: 1 },
  { day: 'Thu', kwh: 61, sessions: 3 },
  { day: 'Fri', kwh: 47, sessions: 2 },
  { day: 'Sat', kwh: 83, sessions: 4 },
  { day: 'Sun', kwh: 55, sessions: 3 },
]

export const AI_HOURLY_FORECAST = [65,72,58,45,38,52,78,88,72,60,45,35]
export const FORECAST_HOURS = ['8','9','10','11','12','13','14','15','16','17','18','19']

export const TIME_SLOTS = [
  { time: '08:00', status: 'unavailable' }, { time: '09:00', status: 'unavailable' },
  { time: '10:00', status: 'available' },   { time: '11:00', status: 'available' },
  { time: '12:00', status: 'peak' },        { time: '13:00', status: 'peak' },
  { time: '14:00', status: 'available' },   { time: '15:00', status: 'available' },
  { time: '16:00', status: 'available' },   { time: '17:00', status: 'peak' },
  { time: '18:00', status: 'peak' },        { time: '19:00', status: 'available' },
]

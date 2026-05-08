/**
 * Simulated OCPI 2.2.1 API layer
 * In production, replace these with real HTTP calls to your OCPI backend
 */

const SIMULATED_DELAY = (min = 200, max = 600) =>
  new Promise(r => setTimeout(r, Math.random() * (max - min) + min))

export const ocpiClient = {
  /** GET /ocpi/cpo/2.2/locations */
  async getLocations(filters = {}) {
    await SIMULATED_DELAY()
    const { STATIONS } = await import('../data/stations.js')
    let results = [...STATIONS]
    if (filters.network) results = results.filter(s => s.network === filters.network)
    if (filters.status) results = results.filter(s => s.status === filters.status)
    if (filters.connectorType) results = results.filter(s =>
      s.connectors.some(c => c.toLowerCase().includes(filters.connectorType.toLowerCase())))
    return { data: results, status: 1000, timestamp: new Date().toISOString() }
  },

  /** GET /ocpi/cpo/2.2/locations/:id */
  async getLocation(id) {
    await SIMULATED_DELAY(100, 300)
    const { STATIONS } = await import('../data/stations.js')
    const station = STATIONS.find(s => s.id === id)
    if (!station) throw new Error(`Station ${id} not found`)
    return { data: station, status: 1000 }
  },

  /** POST /ocpi/emsp/2.2/commands/RESERVE_NOW */
  async reserveNow({ stationId, connectorId, expiryDate, idToken }) {
    await SIMULATED_DELAY(300, 800)
    const success = Math.random() > 0.05 // 95% success rate simulation
    return {
      result: success ? 'ACCEPTED' : 'REJECTED',
      timeout: 30,
      data: success ? { reservationId: `RES-${Date.now()}`, stationId, connectorId } : null,
      status: success ? 1000 : 2001,
    }
  },

  /** POST /ocpi/emsp/2.2/commands/START_SESSION */
  async startSession({ stationId, connectorId, idToken }) {
    await SIMULATED_DELAY(400, 900)
    return {
      result: 'ACCEPTED',
      data: { sessionId: `SES-${Date.now()}`, stationId, connectorId, startTime: new Date().toISOString() },
      status: 1000,
    }
  },

  /** GET /ocpi/cpo/2.2/sessions/:id */
  async getSession(sessionId) {
    await SIMULATED_DELAY(100, 300)
    return {
      data: {
        id: sessionId,
        status: 'ACTIVE',
        kwh: parseFloat((Math.random() * 30).toFixed(2)),
        totalCost: { excl_vat: parseFloat((Math.random() * 300).toFixed(2)), currency: 'INR' },
        startDateTime: new Date(Date.now() - 1800000).toISOString(),
      },
      status: 1000,
    }
  },

  /** Real-time OCPP heartbeat simulation */
  simulateHeartbeat(stationId, callback) {
    const interval = setInterval(() => {
      callback({
        stationId,
        timestamp: new Date().toISOString(),
        status: 'Available',
        meterValue: parseFloat((Math.random() * 50).toFixed(2)),
      })
    }, 10000)
    return () => clearInterval(interval)
  },
}

import { useState, useEffect, useCallback } from 'react'
import { ocpiClient } from '../utils/ocpi.js'

export function useStations(filters = {}) {
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchStations = useCallback(async () => {
    try {
      setLoading(true)
      const res = await ocpiClient.getLocations(filters)
      setStations(res.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => { fetchStations() }, [fetchStations])
  return { stations, loading, error, refetch: fetchStations }
}

export function useReservation() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [reservation, setReservation] = useState(null)

  const reserve = useCallback(async (params) => {
    setStatus('loading')
    try {
      const res = await ocpiClient.reserveNow(params)
      if (res.result === 'ACCEPTED') {
        setReservation(res.data)
        setStatus('success')
        return res.data
      } else {
        throw new Error('Reservation rejected by OCPI server')
      }
    } catch (err) {
      setStatus('error')
      throw err
    }
  }, [])

  const reset = useCallback(() => { setStatus('idle'); setReservation(null) }, [])
  return { status, reservation, reserve, reset }
}

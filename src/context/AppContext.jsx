import React, { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [balance, setBalance] = useState(2450.00)
  const [selectedStation, setSelectedStation] = useState(null)
  const [bookings, setBookings] = useState([])
  const [toast, setToast] = useState({ show: false, message: '', icon: '' })
  const [user] = useState({
    name: 'Arjun Kumar', initials: 'AK', email: 'arjun.kumar@email.com',
    plan: 'Pro', totalSessions: 47, totalKwh: 284, co2Saved: 284, rewards: 1240,
  })

  const showToast = useCallback((message, icon = 'check', duration = 3500) => {
    setToast({ show: true, message, icon })
    setTimeout(() => setToast(t => ({ ...t, show: false })), duration)
  }, [])

  const deductBalance = useCallback((amount) => {
    setBalance(prev => parseFloat((prev - amount).toFixed(2)))
  }, [])

  const addBalance = useCallback((amount) => {
    setBalance(prev => parseFloat((prev + amount).toFixed(2)))
  }, [])

  const addBooking = useCallback((booking) => {
    setBookings(prev => [{ ...booking, id: Date.now(), createdAt: new Date() }, ...prev])
  }, [])

  return (
    <AppContext.Provider value={{
      balance, user, toast, bookings, selectedStation,
      setSelectedStation, showToast, deductBalance, addBalance, addBooking
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

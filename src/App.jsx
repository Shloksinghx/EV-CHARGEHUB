import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import FindStations from './pages/FindStations'
import Booking from './pages/Booking'
import AIInsights from './pages/AIInsights'
import Wallet from './pages/Wallet'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="stations" element={<FindStations />} />
        <Route path="booking" element={<Booking />} />
        <Route path="booking/:stationId" element={<Booking />} />
        <Route path="ai" element={<AIInsights />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}

import { useState, useCallback } from 'react'

const INITIAL_BALANCE = 2450

export function useWallet() {
  const [balance, setBalance] = useState(INITIAL_BALANCE)

  const deduct = useCallback((amount) => {
    if (balance < amount) return { success: false, reason: 'Insufficient balance' }
    setBalance(prev => parseFloat((prev - amount).toFixed(2)))
    return { success: true }
  }, [balance])

  const addFunds = useCallback((amount) => {
    setBalance(prev => parseFloat((prev + amount).toFixed(2)))
    return { success: true }
  }, [])

  return { balance, deduct, addFunds }
}

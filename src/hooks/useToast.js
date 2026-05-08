import { useState, useCallback } from 'react'

export function useToast() {
  const [toast, setToast] = useState({ visible: false, msg: '', icon: '✅' })

  const showToast = useCallback((msg, icon = '✅') => {
    setToast({ visible: true, msg, icon })
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3500)
  }, [])

  return { toast, showToast }
}

'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Role } from '@/data/mock-data'

type AuthContextValue = {
  role: Role
  loggedIn: boolean
  signIn: (role: Role) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('Fleet Manager')
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const savedRole = sessionStorage.getItem('fleetpulse-demo-role') as Role | null
    if (savedRole && ['Fleet Manager', 'Driver', 'Administrator'].includes(savedRole)) {
      setRole(savedRole)
      setLoggedIn(true)
    }
  }, [])

  const value: AuthContextValue = {
    role,
    loggedIn,
    signIn: (nextRole) => {
      setRole(nextRole)
      setLoggedIn(true)
      sessionStorage.setItem('fleetpulse-demo-role', nextRole)
    },
    signOut: () => {
      setLoggedIn(false)
      sessionStorage.removeItem('fleetpulse-demo-role')
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useFleetAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useFleetAuth must be used within AuthProvider')
  return context
}

"use client"

import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
  token: string | null
  isAuthenticated: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    setToken(savedToken)

    const isLoginPage = pathname === "/login"

    if (!savedToken && !isLoginPage) {
      router.push("/login")
    }

    if (savedToken && isLoginPage) {
      router.push("/reservas")
    }
  }, [pathname, router])

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth deve estar dentro de AuthProvider")
  return context
}

'use client'

import { useAuthInfo } from "@propelauth/react"
import { usePathname } from 'next/navigation'
import { LoginPopup } from "./LoginPopup"
import { LoadingScreen } from "./LoadingScreen"
import { useState, useEffect } from 'react'

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useAuthInfo()
  const pathname = usePathname()
  const [showContent, setShowContent] = useState(false)

  const isLoginPage = pathname === '/login'
  const isMainPage = pathname === '/'

  useEffect(() => {
    if (!loading) {
      setShowContent(true)
    }
  }, [loading])

  if (!showContent) {
    return <LoadingScreen />
  }

  if (!isLoggedIn && !isLoginPage && !isMainPage) {
    return (
      <div className="relative">
        <div className="filter blur-sm pointer-events-none">
          {children}
        </div>
        <LoginPopup />
      </div>
    )
  }

  return <>{children}</>
}
'use client'

import { AuthProvider } from "@propelauth/react";
import { AuthWrapper } from '@/components/AuthWrapper'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthWrapper>
      <AuthProvider authUrl="https://14396936266.propelauthtest.com">
        {children}
      </AuthProvider>
    </AuthWrapper>
  )
}
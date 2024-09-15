'use client'

import { AuthProvider } from "@propelauth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider authUrl="https://14396936266.propelauthtest.com">
      {children}
    </AuthProvider>
  )
}
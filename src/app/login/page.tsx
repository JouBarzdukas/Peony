'use client'

import { useRedirectFunctions, useAuthInfo } from "@propelauth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const { redirectToLoginPage, redirectToSignupPage } = useRedirectFunctions()
  const { isLoggedIn, loading } = useAuthInfo()

  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Already Logged In</CardTitle>
            <CardDescription>You are already logged in to your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/'}>Go to Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome to Peony</CardTitle>
          <CardDescription>Please log in or sign up to continue</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={() => redirectToLoginPage()}>Log In</Button>
          <Button onClick={() => redirectToSignupPage()} variant="outline">Sign Up</Button>
        </CardContent>
      </Card>
    </div>
  )
}
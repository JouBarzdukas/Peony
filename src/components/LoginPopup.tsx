'use client'

import { useRedirectFunctions } from "@propelauth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function LoginPopup() {
  const { redirectToLoginPage, redirectToSignupPage } = useRedirectFunctions()

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Access Required</CardTitle>
          <CardDescription>Please log in or sign up to view this page</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={() => redirectToLoginPage()}>Log In</Button>
          <Button onClick={() => redirectToSignupPage()} variant="outline">Sign Up</Button>
        </CardContent>
      </Card>
    </div>
  )
}
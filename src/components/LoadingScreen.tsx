import { Loader2 } from "lucide-react"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
        <h2 className="mt-4 text-2xl font-semibold text-foreground">Loading</h2>
        <p className="mt-2 text-muted-foreground">Please wait while we prepare your experience...</p>
      </div>
    </div>
  )
}
"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function WorkplacePage() {
    const router = useRouter()

    useEffect(() => {
        // Array of possible routes
        const routes = [
            `/company/walmart`,
            `/company/mcdonalds`,
            `/company/bank-of-america`,
            `/company/google`,
            `/company/local-startup`,
        ]

        // Select a random route
        const randomRoute = routes[Math.floor(Math.random() * routes.length)]

        // Redirect to the random route immediately
        router.push(randomRoute)
    }, [router])

    return null
}

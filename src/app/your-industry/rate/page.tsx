"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { StarIcon } from "lucide-react"
import Layout from "@/components/layout"

export default function RatePage() {
  const [ratings, setRatings] = useState({
    enjoyability: 5,
    workLifeBalance: 5,
    compensation: 5,
    careerGrowth: 5,
    culture: 5,
  })
  const [review, setReview] = useState('')

  const handleRatingChange = (metric: string, value: number[]) => {
    setRatings(prev => ({ ...prev, [metric]: value[0] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({ ratings, review })
    alert('Thank you for your review!')
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Rate Your Workplace</h1>
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Overall Ratings</CardTitle>
              <CardDescription>Rate your workplace on the following metrics:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(ratings).map(([metric, value]) => (
                <div key={metric} className="space-y-2">
                  <label className="text-sm font-medium capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      value={[value]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => handleRatingChange(metric, value)}
                    />
                    <span className="w-8 text-center">{value}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Review</CardTitle>
              <CardDescription>Share your thoughts about your workplace:</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write your review here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={5}
              />
            </CardContent>
          </Card>

          <Button type="submit" className="w-full">Submit Review</Button>
        </form>
      </div>
    </Layout>
  )
}
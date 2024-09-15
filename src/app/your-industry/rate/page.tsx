"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from "@/components/layout"

export default function RatePage() {
  const [formData, setFormData] = useState({
    company: '',
    jobTitle: '',
    salary: '',
    yearsOfExperience: '',
    race: '',
    gender: '',
    enjoyability: 5,
    workLifeBalance: 5,
    compensation: 5,
    careerGrowth: 5,
    culture: 5,
    review: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (metric: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [metric]: value[0] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log(formData)
    alert('Thank you for your review!')
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Rate Your Workplace</h1>
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Tell us about your workplace:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
              <Input
                name="jobTitle"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
              />
              <Input
                name="salary"
                type="number"
                placeholder="Annual Salary"
                value={formData.salary}
                onChange={handleInputChange}
                required
              />
              <Input
                name="yearsOfExperience"
                type="number"
                placeholder="Years of Experience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                required
              />
              <Select value={formData.race} onValueChange={handleSelectChange('race')}>
                <SelectTrigger>
                  <SelectValue placeholder="Race" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asian">Asian</SelectItem>
                  <SelectItem value="black">Black or African American</SelectItem>
                  <SelectItem value="hispanic">Hispanic or Latino</SelectItem>
                  <SelectItem value="native">Native American</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select value={formData.gender} onValueChange={handleSelectChange('gender')}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Overall Ratings</CardTitle>
              <CardDescription>Rate your workplace on the following metrics:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {['enjoyability', 'workLifeBalance', 'compensation', 'careerGrowth', 'culture'].map((metric) => (
                <div key={metric} className="space-y-2">
                  <label className="text-sm font-medium capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      value={[formData[metric as keyof typeof formData] as number]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => handleRatingChange(metric, value)}
                    />
                    <span className="w-8 text-center">{formData[metric as keyof typeof formData]}</span>
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
                name="review"
                placeholder="Write your review here..."
                value={formData.review}
                onChange={handleInputChange}
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
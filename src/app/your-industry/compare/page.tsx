"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Layout from "@/components/layout"

// Define types for mockData
type MetricType = 'salary' | 'workHours' | 'vacationDays' | 'bonusPercentage';

type DataType = {
  [key in MetricType]: {
    you: number;
    mean: number;
    median: number;
  }
}

// Mock data - replace with real data in production
const mockData: DataType = {
  salary: { you: 75000, mean: 80000, median: 78000 },
  workHours: { you: 40, mean: 42, median: 40 },
  vacationDays: { you: 20, mean: 18, median: 15 },
  bonusPercentage: { you: 10, mean: 12, median: 10 },
}

export default function ComparePage() {
  const [metric, setMetric] = useState<MetricType>('salary')

  const data = [
    { name: 'You', value: mockData[metric].you },
    { name: 'Mean', value: mockData[metric].mean },
    { name: 'Median', value: mockData[metric].median },
  ]

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Compare Your Situation</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Comparison Metric</CardTitle>
            <CardDescription>Select a metric to compare:</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={metric} onValueChange={(value) => setMetric(value as MetricType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="workHours">Work Hours</SelectItem>
                <SelectItem value="vacationDays">Vacation Days</SelectItem>
                <SelectItem value="bonusPercentage">Bonus Percentage</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comparison Chart</CardTitle>
            <CardDescription>Your {metric} compared to industry average</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
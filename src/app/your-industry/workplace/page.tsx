"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { Badge } from "@/components/ui/badge"
import Layout from "@/components/layout"

// Mock data - replace with real data in production
const mockData = {
  name: "Your Company",
  diversityScore: 0.75,
  averageSalary: 85000,
  employeeCount: 5000,
  salaryTrend: [
    { year: 2018, salary: 75000 },
    { year: 2019, salary: 78000 },
    { year: 2020, salary: 80000 },
    { year: 2021, salary: 82000 },
    { year: 2022, salary: 85000 },
  ],
  departmentBreakdown: [
    { name: "Engineering", value: 40 },
    { name: "Sales", value: 30 },
    { name: "Marketing", value: 20 },
    { name: "HR", value: 10 },
  ],
  satisfactionScores: [
    { category: "Work-Life Balance", score: 7.5 },
    { category: "Career Growth", score: 8 },
    { category: "Compensation", score: 7 },
    { category: "Management", score: 6.5 },
    { category: "Culture", score: 8.5 },
  ],
}

export default function WorkplacePage() {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your Workplace: {mockData.name}</h1>
        
        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Diversity Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.diversityScore.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockData.averageSalary.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Employee Count</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.employeeCount.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="salaryTrends" className="space-y-4">
          <TabsList>
            <TabsTrigger value="salaryTrends">Salary Trends</TabsTrigger>
            <TabsTrigger value="departmentBreakdown">Department Breakdown</TabsTrigger>
            <TabsTrigger value="satisfactionScores">Satisfaction Scores</TabsTrigger>
          </TabsList>

          <TabsContent value="salaryTrends">
            <Card>
              <CardHeader>
                <CardTitle>Salary Trends</CardTitle>
                <CardDescription>Average salary trends over the years</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockData.salaryTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Line type="monotone" dataKey="salary" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departmentBreakdown">
            <Card>
              <CardHeader>
                <CardTitle>Department Breakdown</CardTitle>
                <CardDescription>Distribution of employees by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockData.departmentBreakdown}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {mockData.departmentBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="satisfactionScores">
            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Scores</CardTitle>
                <CardDescription>Employee satisfaction across different categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockData.satisfactionScores}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
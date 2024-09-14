"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Users, TrendingUp, Briefcase, Smile } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar, Line, Pie, Cell } from 'recharts'
import Layout from "@/components/layout"

type JobRole = {
  title: string
  averageSalary: number
  payGapAnalysis: {
    overall: number
    byRace: Record<string, number>
    byGender: Record<string, number>
  }
  salaryRange: { min: number; max: number }
  employeeCount: number
  diversityIndex: number
  workLifeEnjoyment: number
  salaryTrend: Array<{ year: number; salary: number }>
  demographicBreakdown: Record<string, number>
  bonusEquity: Record<string, number>
}

type CompanyData = {
  name: string
  logo: string
  payGapAnalysis: {
    overall: number
    byRace: Record<string, number>
    byGender: Record<string, number>
  }
  salaryBands: Record<string, { min: number; max: number }>
  bonusEquity: Record<string, number>
  demographicBreakdown: Record<string, number>
  keyStats: {
    totalEmployees: number
    averageSalary: number
    turnoverRate: number
    diversityIndex: number
    workLifeEnjoyment: number
  }
  salaryTrend: Array<{ year: number; salary: number }>
  recentReviews: Array<{
    id: number
    title: string
    rating: number
    position: string
    pros: string
    cons: string
  }>
  jobRoles: Record<string, JobRole>
}

type CompanyPageProps = {
  companyData: CompanyData
}

export default function CompanyPage({ companyData }: CompanyPageProps) {
  const [selectedJobRole, setSelectedJobRole] = useState<string | null>(null)

  const handleJobRoleChange = (value: string) => {
    setSelectedJobRole(value === 'all' ? null : value)
  }

  const currentData = selectedJobRole ? companyData.jobRoles[selectedJobRole] : null

  const getDiversityIndexColor = (index: number) => {
    if (index >= 0.8) return "text-green-500"
    if (index >= 0.6) return "text-yellow-500"
    return "text-red-500"
  }

  const getWorkLifeEnjoymentColor = (score: number) => {
    if (score >= 8) return "text-green-500"
    if (score >= 6) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img src={companyData.logo} alt={`${companyData.name} logo`} className="w-16 h-16 mr-4" />
            <h1 className="text-3xl font-bold">{companyData.name}</h1>
          </div>
          <Select onValueChange={handleJobRoleChange}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select Job Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {Object.keys(companyData.jobRoles).map((role) => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {selectedJobRole ? "Employees in Role" : "Total Employees"}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {selectedJobRole && currentData
                  ? currentData.employeeCount.toLocaleString()
                  : companyData.keyStats.totalEmployees.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${selectedJobRole && currentData
                  ? currentData.averageSalary.toLocaleString()
                  : companyData.keyStats.averageSalary.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {selectedJobRole ? "Salary Range" : "Turnover Rate"}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {selectedJobRole && currentData
                  ? `$${currentData.salaryRange.min.toLocaleString()} - $${currentData.salaryRange.max.toLocaleString()}`
                  : `${companyData.keyStats.turnoverRate}%`}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Diversity Index</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getDiversityIndexColor(selectedJobRole && currentData ? currentData.diversityIndex : companyData.keyStats.diversityIndex)}`}>
                {((selectedJobRole && currentData ? currentData.diversityIndex : companyData.keyStats.diversityIndex) * 100).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Work-Life Enjoyment</CardTitle>
              <Smile className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getWorkLifeEnjoymentColor(selectedJobRole && currentData ? currentData.workLifeEnjoyment : companyData.keyStats.workLifeEnjoyment)}`}>
                {(selectedJobRole && currentData ? currentData.workLifeEnjoyment : companyData.keyStats.workLifeEnjoyment).toFixed(1)}/10
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Pay Gap</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {selectedJobRole && currentData
                  ? currentData.payGapAnalysis.overall
                  : companyData.payGapAnalysis.overall}%
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="payGap" className="space-y-4">
          <TabsList>
            <TabsTrigger value="payGap">Pay Gap Analysis</TabsTrigger>
            <TabsTrigger value="salaryTrends">Salary Trends</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="bonusEquity">Bonus & Equity</TabsTrigger>
          </TabsList>

          <TabsContent value="payGap" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pay Gap Analysis</CardTitle>
                <CardDescription>Comparing median salaries by race and gender</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Pay Gap by Race</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={Object.entries(selectedJobRole && currentData
                          ? currentData.payGapAnalysis.byRace
                          : companyData.payGapAnalysis.byRace
                        ).map(([race, gap]) => ({ name: race, value: gap }))}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `${value}%`} />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Pay Gap by Gender</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={Object.entries(selectedJobRole && currentData
                            ? currentData.payGapAnalysis.byGender
                            : companyData.payGapAnalysis.byGender
                          ).map(([gender, gap]) => ({ name: gender, value: gap }))}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          label
                        >
                          {Object.entries(selectedJobRole && currentData
                            ? currentData.payGapAnalysis.byGender
                            : companyData.payGapAnalysis.byGender
                          ).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? "#8884d8" : "#82ca9d"} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="salaryTrends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Salary Trends</CardTitle>
                <CardDescription>Average salary trends over the years</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={selectedJobRole && currentData ? currentData.salaryTrend : companyData.salaryTrend}
                  >
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Line type="monotone" dataKey="salary" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Demographic Breakdown</CardTitle>
                <CardDescription>Distribution of employees by race</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={Object.entries(selectedJobRole && currentData
                        ? currentData.demographicBreakdown
                        : companyData.demographicBreakdown
                      ).map(([race, percentage]) => ({ name: race, value: percentage }))}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {Object.entries(selectedJobRole && currentData
                        ? currentData.demographicBreakdown
                        : companyData.demographicBreakdown
                      ).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bonusEquity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bonus & Equity Distribution</CardTitle>
                <CardDescription>Distribution of bonuses and equity across racial groups</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={Object.entries(selectedJobRole && currentData
                      ? currentData.bonusEquity
                      : companyData.bonusEquity
                    ).map(([race, percentage]) => ({ name: race, value: percentage }))}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companyData.recentReviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {review.title}
                    <Badge variant={review.rating >= 4 ? "default" : "secondary"}>
                      {review.rating.toFixed(1)}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{review.position}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2"><strong>Pros:</strong> {review.pros}</p>
                  <p><strong>Cons:</strong> {review.cons}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
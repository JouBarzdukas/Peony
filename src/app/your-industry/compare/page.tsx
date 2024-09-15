"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Layout from "@/components/layout"

import { amazonData } from '../../../../data/amazonData'
import { googleData } from '../../../../data/googleData'
import { goldmansachsData } from '../../../../data/goldmanSachsData'
import { metaData } from '../../../../data/metaData'
import { nvidiaData } from '../../../../data/nvidiaData'
import { walmartData } from '../../../../data/walmartData'

const companies = [amazonData, googleData, goldmansachsData, metaData, nvidiaData, walmartData]

type CompanyData = typeof amazonData
type JobRole = CompanyData['jobRoles'][keyof CompanyData['jobRoles']]

type ComparisonData = {
  category: string;
  userSalary: number;
  averageSalary: number;
}

const jobLevels = ["Junior", "Mid-level", "Senior"]

export default function ComparePage() {
  const [userSalary, setUserSalary] = useState('')
  const [company, setCompany] = useState('')
  const [jobLevel, setJobLevel] = useState('')
  const [gender, setGender] = useState('')
  const [race, setRace] = useState('')
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([])

  const calculateAverageSalary = (
    companyName: string,
    jobLevel: string,
    race: string,
    gender: string
  ) => {
    const company = companies.find(c => c.name === companyName)
    if (!company) return 0

    const relevantRoles = Object.values(company.jobRoles).filter((role: JobRole) => 
      role.title.toLowerCase().includes(jobLevel.toLowerCase())
    )

    const salaries = relevantRoles.flatMap((role: JobRole) => {
      const racePercentage = role.demographicBreakdown[race] || 0
      const genderPercentage = role.payGapAnalysis.byGender[gender] ? 100 - role.payGapAnalysis.byGender[gender] : 0
      const count = Math.round((racePercentage / 100) * (genderPercentage / 100) * role.employeeCount)
      return Array(count).fill(role.averageSalary * (genderPercentage / 100))
    })

    return salaries.length > 0 ? salaries.reduce((a, b) => a + b) / salaries.length : 0
  }

  const calculateComparison = () => {
    const avgSalary = calculateAverageSalary(company, jobLevel, race, gender)
    const userSalaryNum = parseFloat(userSalary)

    const newComparisonData: ComparisonData[] = [
      {
        category: "Salary Comparison",
        userSalary: userSalaryNum,
        averageSalary: avgSalary
      }
    ]

    setComparisonData(newComparisonData)
  }

  useEffect(() => {
    if (userSalary && company && jobLevel && gender && race) {
      calculateComparison()
    }
  }, [userSalary, company, jobLevel, gender, race])

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Compare Your Salary</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Comparison Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Salary</label>
              <Input
                type="number"
                placeholder="Your Annual Salary"
                value={userSalary}
                onChange={(e) => setUserSalary(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company to Compare</label>
              <Select value={company} onValueChange={setCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map(c => (
                    <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Level</label>
              <Select value={jobLevel} onValueChange={setJobLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Job Level" />
                </SelectTrigger>
                <SelectContent>
                  {jobLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender to Compare</label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Non-binary">Non-binary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Race to Compare</label>
              <Select value={race} onValueChange={setRace}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Race" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asian">Asian</SelectItem>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="Hispanic">Hispanic</SelectItem>
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {comparisonData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Comparison Results</CardTitle>
              <CardDescription>Your salary compared to the average</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="userSalary" name="Your Salary" fill="#8884d8" />
                  <Bar dataKey="averageSalary" name="Average Salary" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold">
                  Your Salary: ${parseFloat(userSalary).toLocaleString()}
                </p>
                <p className="text-lg font-semibold">
                  Average Salary: ${comparisonData[0].averageSalary.toLocaleString()}
                </p>
                <p className="text-xl font-bold mt-2">
                  {parseFloat(userSalary) > comparisonData[0].averageSalary
                    ? `You earn ${(((parseFloat(userSalary) / comparisonData[0].averageSalary) - 1) * 100).toFixed(2)}% more than average`
                    : `You earn ${(((comparisonData[0].averageSalary / parseFloat(userSalary)) - 1) * 100).toFixed(2)}% less than average`
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}
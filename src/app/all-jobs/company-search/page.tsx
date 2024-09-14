"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Building2, DollarSign, Users } from 'lucide-react'
import Layout from "@/components/layout"
import RangeSlider from '@/components/ui/range-slider'

// Mock data - replace with real data in a production environment
const companies = [
    { id: 1, name: "Bank of America", industry: "Finance", size: "Large", avgSalary: 85000, diversityScore: 0.75, othername: "bank-of-america" },
    { id: 2, name: "McDonald's", industry: "Food Service", size: "Large", avgSalary: 35000, diversityScore: 0.8, othername: "mcdonalds" },
    { id: 3, name: "Walmart", industry: "Retail", size: "Large", avgSalary: 40000, diversityScore: 0.7, othername: "walmart"},
    { id: 4, name: "Google", industry: "Technology", size: "Large", avgSalary: 120000, diversityScore: 0.65, othername: "google" },
    { id: 5, name: "Local Startup", industry: "Technology", size: "Small", avgSalary: 70000, diversityScore: 0.6, othername: "local-startup"},
]

export default function CompanySearch() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")
    const [industryFilter, setIndustryFilter] = useState("all")
    const [sizeFilter, setSizeFilter] = useState("all")
    const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 150000])

    useEffect(() => {
        // Force scrollbar to always be present
        document.body.style.overflowY = 'scroll'
        return () => {
            document.body.style.overflowY = 'auto'
        }
    }, [])

    const filteredCompanies = companies.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (industryFilter === "all" || company.industry === industryFilter) &&
        (sizeFilter === "all" || company.size === sizeFilter) &&
        company.avgSalary >= salaryRange[0] && company.avgSalary <= salaryRange[1]
    )

    const handleCompanyClick = (companyId: string) => {
        // Navigate to the company page
        router.push(`/company/${companyId}`)
    }

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-2">Search Workplaces</h1>

                <div className="grid gap-6 md:grid-cols-4 mb-8">
                    <div className="md:col-span-4">
                        <Input
                            type="text"
                            placeholder="Search companies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Select value={industryFilter} onValueChange={setIndustryFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Industry" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Industries</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Food Service">Food Service</SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                            <SelectItem value="Technology">Technology</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={sizeFilter} onValueChange={setSizeFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Company Size" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Sizes</SelectItem>
                            <SelectItem value="Small">Small</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Large">Large</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="md:col-span-2">
                        <label className="text-sm font-medium">Salary Range</label>
                        <RangeSlider
                            min={0}
                            max={150000}
                            step={10000}
                            value={salaryRange}
                            onValueChange={setSalaryRange}
                        />
                        <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                            <span>${salaryRange[0].toLocaleString()}</span>
                            <span>${salaryRange[1].toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCompanies.map(company => (
                        <Card key={company.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCompanyClick(company.othername)}>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>{company.name}</span>
                                    <Badge variant={company.diversityScore >= 0.7 ? "default" : "secondary"}>
                                        {company.diversityScore >= 0.7 ? "High Diversity" : "Improving Diversity"}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span className="text-sm">{company.industry}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span className="text-sm">{company.size}</span>
                                    </div>
                                    <div className="flex items-center col-span-2">
                                        <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span className="text-sm">Avg. Salary: ${company.avgSalary.toLocaleString()}</span>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full mt-4">
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredCompanies.length === 0 && (
                    <div className="text-center mt-8">
                        <Search className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="mt-4 text-xl font-semibold">No companies found</p>
                        <p className="mt-2 text-muted-foreground">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </Layout>
    )
}
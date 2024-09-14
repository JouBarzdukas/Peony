import CompanyPage from '../company-page'

export const walmartData = {
  name: "Walmart",
  logo: "/placeholder.svg?height=100&width=100",
  payGapAnalysis: {
    overall: 18,
    byRace: {
      white: 0,
      black: 22,
      hispanic: 19,
      asian: 10,
      other: 15
    },
    byGender: {
      male: 0,
      female: 16
    }
  },
  salaryBands: {
    entry: { min: 25000, max: 35000 },
    associate: { min: 30000, max: 45000 },
    supervisor: { min: 40000, max: 60000 },
    manager: { min: 55000, max: 80000 },
    senior: { min: 75000, max: 120000 }
  },
  bonusEquity: {
    white: 100,
    black: 82,
    hispanic: 85,
    asian: 95,
    other: 88
  },
  demographicBreakdown: {
    white: 55,
    black: 21,
    hispanic: 17,
    asian: 5,
    other: 2
  },
  keyStats: {
    totalEmployees: 2300000,
    averageSalary: 32000,
    turnoverRate: 44,
    diversityIndex: 0.75,
    workLifeEnjoyment: 7.2
  },
  salaryTrend: [
    { year: 2015, salary: 28000 },
    { year: 2016, salary: 29000 },
    { year: 2017, salary: 30000 },
    { year: 2018, salary: 31000 },
    { year: 2019, salary: 31500 },
    { year: 2020, salary: 32000 },
    { year: 2021, salary: 32500 },
  ],
  recentReviews: [
    {
      id: 1,
      title: "Decent entry-level opportunity",
      rating: 3.5,
      position: "Sales Associate",
      pros: "Flexible hours, employee discount",
      cons: "Low pay, limited advancement"
    },
    {
      id: 2,
      title: "Good benefits, but challenging work-life balance",
      rating: 3.8,
      position: "Department Manager",
      pros: "Comprehensive benefits package, clear promotion path",
      cons: "Long hours, high-stress environment"
    },
    {
      id: 3,
      title: "Great for part-time work",
      rating: 4.0,
      position: "Cashier",
      pros: "Consistent schedule, friendly coworkers",
      cons: "Can be physically demanding, dealing with difficult customers"
    }
  ],
  jobRoles: {
    "Software Engineer": {
      title: "Software Engineer",
      averageSalary: 110000,
      payGapAnalysis: {
        overall: 12,
        byRace: {
          white: 0,
          black: 15,
          hispanic: 13,
          asian: 5,
          other: 10
        },
        byGender: {
          male: 0,
          female: 12
        }
      },
      salaryRange: { min: 85000, max: 150000 },
      employeeCount: 5000,
      diversityIndex: 0.68,
      workLifeEnjoyment: 8.1,
      salaryTrend: [
        { year: 2015, salary: 95000 },
        { year: 2016, salary: 98000 },
        { year: 2017, salary: 102000 },
        { year: 2018, salary: 105000 },
        { year: 2019, salary: 107000 },
        { year: 2020, salary: 109000 },
        { year: 2021, salary: 110000 },
      ],
      demographicBreakdown: {
        white: 50,
        black: 5,
        hispanic: 8,
        asian: 35,
        other: 2
      },
      bonusEquity: {
        white: 100,
        black: 85,
        hispanic: 88,
        asian: 98,
        other: 90
      }
    },
    // Add more job roles here...
  }
};

export default function WalmartPage() {
  return <CompanyPage companyData={walmartData} />;
}
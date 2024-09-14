import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, PieChart, Users, Building, DollarSign, TrendingUp } from "lucide-react"

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Inclusive Insights Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$75,000</div>
              <p className="text-xs text-muted-foreground">Across all reported salaries</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Salary Reports</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">Total anonymous contributions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Companies</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">500+</div>
              <p className="text-xs text-muted-foreground">Represented in our database</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pay Gap Reduction</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12%</div>
              <p className="text-xs text-muted-foreground">Estimated impact on pay equity</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Salary Trends by Industry</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart className="h-[200px] w-full" />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Diversity Representation</CardTitle>
              <CardDescription>Based on voluntary disclosures</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart className="h-[200px] w-full" />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Anonymous Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="rounded-full w-2 h-2 bg-blue-500 mr-2"></span>
                  <span className="text-sm">"Great work-life balance, inclusive culture"</span>
                  <span className="ml-auto text-xs text-muted-foreground">Tech Company</span>
                </li>
                <li className="flex items-center">
                  <span className="rounded-full w-2 h-2 bg-green-500 mr-2"></span>
                  <span className="text-sm">"Improved DEI initiatives, but room for growth"</span>
                  <span className="ml-auto text-xs text-muted-foreground">Finance Sector</span>
                </li>
                <li className="flex items-center">
                  <span className="rounded-full w-2 h-2 bg-yellow-500 mr-2"></span>
                  <span className="text-sm">"Transparent salary bands, fair promotion process"</span>
                  <span className="ml-auto text-xs text-muted-foreground">Retail Industry</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>DEI Resource Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="text-sm">Negotiation Strategies for Underrepresented Groups</span>
                </li>
                <li className="flex items-center">
                  <span className="text-sm">Understanding and Combating Workplace Bias</span>
                </li>
                <li className="flex items-center">
                  <span className="text-sm">Building Inclusive Teams: A Manager's Guide</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Resources</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
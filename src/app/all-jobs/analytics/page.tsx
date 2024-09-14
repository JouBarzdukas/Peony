import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart } from "lucide-react"

export default function Analytics() {
  return (
    <Layout>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-4">Salary Analytics</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Salary Trends by Experience Level</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart className="h-[200px] w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pay Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart className="h-[200px] w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Diversity Hiring Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart className="h-[200px] w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Work-Life Balance Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart className="h-[200px] w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
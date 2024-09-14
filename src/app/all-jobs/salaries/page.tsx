import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function SalaryReports() {
  return (
    <Layout>
      <div className="p-4"> {/* Add padding here */}
        <h1 className="text-2xl font-bold mb-4">Recent Salary Reports</h1>
        <Card>
          <CardHeader>
            <CardTitle>Anonymous Salary Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Salary Range</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>SR001</TableCell>
                  <TableCell>Technology</TableCell>
                  <TableCell>5-10 years</TableCell>
                  <TableCell>$100,000 - $150,000</TableCell>
                  <TableCell><Badge>Verified</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SR002</TableCell>
                  <TableCell>Finance</TableCell>
                  <TableCell>0-2 years</TableCell>
                  <TableCell>$50,000 - $70,000</TableCell>
                  <TableCell><Badge variant="outline">Pending</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SR003</TableCell>
                  <TableCell>Healthcare</TableCell>
                  <TableCell>10+ years</TableCell>
                  <TableCell>$150,000 - $200,000</TableCell>
                  <TableCell><Badge>Verified</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
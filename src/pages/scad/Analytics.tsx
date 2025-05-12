
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ScadSidebar from "@/components/navigation/ScadSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, BarChart2, PieChart as PieChartIcon } from "lucide-react";

// Mock data for internship statistics
const internshipStatusData = [
  { name: "Approved", value: 65 },
  { name: "Rejected", value: 12 },
  { name: "Pending", value: 18 },
  { name: "Flagged", value: 5 },
];

const monthlySubmissionsData = [
  { name: "Jan", submissions: 14 },
  { name: "Feb", submissions: 18 },
  { name: "Mar", submissions: 25 },
  { name: "Apr", submissions: 32 },
  { name: "May", submissions: 22 },
  { name: "Jun", submissions: 15 },
  { name: "Jul", submissions: 12 },
  { name: "Aug", submissions: 8 },
  { name: "Sep", submissions: 20 },
  { name: "Oct", submissions: 26 },
  { name: "Nov", submissions: 24 },
  { name: "Dec", submissions: 16 },
];

const companyDistributionData = [
  { name: "Microsoft", count: 12 },
  { name: "Oracle", count: 8 },
  { name: "IBM", count: 10 },
  { name: "Amazon", count: 15 },
  { name: "Vodafone", count: 6 },
  { name: "Others", count: 24 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("year");

  return (
    <DashboardLayout 
      sidebar={<ScadSidebar />} 
      pageTitle="Analytics"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Internship Statistics</h2>
            <p className="text-gray-500">
              Overview of internship submissions and outcomes
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Past Month</SelectItem>
                <SelectItem value="quarter">Past Quarter</SelectItem>
                <SelectItem value="year">Past Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Internship Status Distribution</CardTitle>
                <PieChartIcon className="h-5 w-5 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={internshipStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {internshipStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Monthly Submissions</CardTitle>
                <BarChart2 className="h-5 w-5 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlySubmissionsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="submissions" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Company Distribution</CardTitle>
              <CardDescription>
                Number of internships by company
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={companyDistributionData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;

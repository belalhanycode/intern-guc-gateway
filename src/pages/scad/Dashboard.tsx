
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ScadSidebar from "@/components/navigation/ScadSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart,
  Calendar,
  CheckCircle, 
  ClipboardList, 
  Download, 
  Flag, 
  Users, 
  XCircle 
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const submissionCycle = {
  id: 1,
  title: "Summer 2025 Internships",
  startDate: "2025-05-01",
  endDate: "2025-05-20",
  status: "active",
};

const recentSubmissions = [
  { id: 1, studentName: "Ahmed Hassan", company: "Tech Innovators", date: "2025-05-10", status: "pending" as const },
  { id: 2, studentName: "Nour Ibrahim", company: "Global Solutions", date: "2025-05-09", status: "approved" as const },
  { id: 3, studentName: "Omar Khaled", company: "DataTech Corp", date: "2025-05-08", status: "rejected" as const },
  { id: 4, studentName: "Hana Ahmed", company: "Innovative Systems", date: "2025-05-07", status: "flagged" as const },
];

const stats = {
  pendingReviews: 15,
  approvedSubmissions: 42,
  rejectedSubmissions: 8,
  totalSubmissions: 65,
};

const ScadDashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout sidebar={<ScadSidebar />} pageTitle="SCAD Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome, Admin</h2>
          <p className="text-gray-600">Manage internship submissions and review student applications</p>
        </div>

        {/* Current Submission Cycle */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Current Submission Cycle</CardTitle>
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{submissionCycle.title}</h3>
                <p className="text-sm text-gray-500">
                  {submissionCycle.startDate} to {submissionCycle.endDate}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Active
                </span>
                <Button onClick={() => navigate("/scad/cycles")}>
                  Manage Cycles
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <ClipboardList className="h-4 w-4 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <span className="text-2xl font-bold text-primary">{stats.pendingReviews}</span>
                <p className="text-xs text-gray-500">Need attention</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                <CheckCircle className="h-4 w-4 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <span className="text-2xl font-bold text-green-600">{stats.approvedSubmissions}</span>
                <p className="text-xs text-gray-500">Total approved</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                <XCircle className="h-4 w-4 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <span className="text-2xl font-bold text-red-600">{stats.rejectedSubmissions}</span>
                <p className="text-xs text-gray-500">Total rejected</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <span className="text-2xl font-bold text-gray-800">{stats.totalSubmissions}</span>
                <p className="text-xs text-gray-500">All time</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Submissions Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Submissions</CardTitle>
              <Button variant="outline" size="sm" className="h-8">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <CardDescription>
              Recent internship evaluation submissions by students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{submission.studentName}</TableCell>
                    <TableCell>{submission.company}</TableCell>
                    <TableCell>{submission.date}</TableCell>
                    <TableCell>
                      <StatusBadge status={submission.status} />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              variant="link"
              onClick={() => navigate("/scad/submissions")}
            >
              View All Submissions
            </Button>
          </CardFooter>
        </Card>

        {/* Analytics Preview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Submission Analytics</CardTitle>
              <BarChart className="h-5 w-5 text-gray-500" />
            </div>
            <CardDescription>
              Overview of internship statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for chart */}
            <div className="h-60 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">Analytics chart preview</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              variant="link"
              onClick={() => navigate("/scad/analytics")}
            >
              View Detailed Analytics
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ScadDashboard;


import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StudentSidebar from "@/components/navigation/StudentSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { ProBadge } from "@/components/ui/pro-badge";
import { Badge } from "@/components/ui/badge";
import { CalendarRange, Bell, CheckSquare, Clock, MessageSquare } from "lucide-react";

// Mock data
const activeCycle = {
  id: 1,
  title: "Summer 2025 Internships",
  startDate: "2025-05-01",
  endDate: "2025-05-20",
  daysRemaining: 8,
};

const recentSubmission = {
  id: 123,
  company: "Tech Innovators Inc.",
  submittedDate: "2025-05-05",
  status: "pending" as const,
};

const isEligibleForPro = true;

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout 
      sidebar={<StudentSidebar />}
      pageTitle="Student Dashboard"
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome, Ahmed</h2>
            <p className="text-gray-600">Manage your internship applications and track your progress</p>
          </div>
          <div className="flex items-center space-x-2">
            {isEligibleForPro && <ProBadge />}
          </div>
        </div>

        {/* Active Submission Cycle */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Active Submission Cycle</CardTitle>
              <CalendarRange className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Submit your internship evaluation during this period</CardDescription>
          </CardHeader>
          <CardContent>
            {activeCycle ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{activeCycle.title}</h3>
                  <p className="text-sm text-gray-500">
                    {activeCycle.startDate} to {activeCycle.endDate}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                    {activeCycle.daysRemaining} days remaining
                  </Badge>
                  <Button onClick={() => navigate("/student/submission")}>
                    Submit Evaluation
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No active submission cycles at the moment</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Recent Submission */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Recent Submission</CardTitle>
                <CheckSquare className="h-4 w-4 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent>
              {recentSubmission ? (
                <div className="space-y-2">
                  <p className="font-medium">{recentSubmission.company}</p>
                  <div className="flex items-center justify-between">
                    <StatusBadge status={recentSubmission.status} />
                    <span className="text-xs text-gray-500">{recentSubmission.submittedDate}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No recent submissions</p>
              )}
            </CardContent>
          </Card>

          {/* Pending Reviews */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <Clock className="h-4 w-4 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <span className="text-2xl font-bold text-primary">1</span>
                <p className="text-xs text-gray-500">Awaiting feedback</p>
              </div>
            </CardContent>
          </Card>

          {/* New Messages */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">New Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <span className="text-2xl font-bold text-primary">3</span>
                <p className="text-xs text-gray-500">Unread messages</p>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                <Bell className="h-4 w-4 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <span className="text-2xl font-bold text-primary">2</span>
                <p className="text-xs text-gray-500">Important updates</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PRO Services */}
        {isEligibleForPro && (
          <Card className="bg-gradient-to-r from-guc-blue/10 to-guc-green/10 border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CardTitle>PRO Services</CardTitle>
                <ProBadge />
              </div>
              <CardDescription>
                Exclusive career services available for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="bg-white hover:bg-white/80"
                  onClick={() => navigate("/student/career-guidance")}
                >
                  Request Career Guidance
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white hover:bg-white/80"
                  onClick={() => navigate("/student/assessments")}
                >
                  Take Personality Tests
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white hover:bg-white/80"
                  onClick={() => navigate("/student/workshops")}
                >
                  Access Workshops
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;


import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import CompanySidebar from "@/components/navigation/CompanySidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, Star, Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [notifications] = useState([
    {
      id: 1,
      title: "New application received",
      message: "John Doe applied to Frontend Developer Intern position",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Internship ending soon",
      message: "Sara's internship will end in 7 days",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 3,
      title: "Evaluation reminder",
      message: "Please complete Ahmed's internship evaluation",
      time: "1 day ago",
      read: false,
    },
  ]);

  const stats = [
    { title: "Active Internship Posts", value: 5, icon: FileText, color: "text-blue-500" },
    { title: "Current Interns", value: 3, icon: Users, color: "text-green-500" },
    { title: "Pending Applications", value: 12, icon: FileText, color: "text-amber-500" },
    { title: "Completed Internships", value: 8, icon: Star, color: "text-purple-500" },
  ];

  return (
    <DashboardLayout
      sidebar={<CompanySidebar />}
      pageTitle="Company Dashboard"
    >
      <div className="space-y-6">
        {/* Welcome Card */}
        <Card>
          <CardContent className="flex flex-col sm:flex-row items-center justify-between p-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome, Acme Corporation</h2>
              <p className="text-gray-500">
                Manage your internship postings, review applications, and evaluate your interns.
              </p>
            </div>
            <Button 
              className="mt-4 sm:mt-0 flex items-center" 
              onClick={() => navigate('/company/create-job')}
            >
              <Plus className="mr-2 h-4 w-4" /> Post New Internship
            </Button>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest student applications to your internships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "John Doe", position: "Frontend Developer", date: "May 15, 2025", status: "pending" },
                  { name: "Sara Ahmed", position: "Data Analyst", date: "May 14, 2025", status: "pending" },
                  { name: "Mohamed Ali", position: "UX Designer", date: "May 12, 2025", status: "finalized" },
                ].map((app, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-md bg-gray-50">
                    <div>
                      <p className="font-medium">{app.name}</p>
                      <p className="text-sm text-gray-500">{app.position} • {app.date}</p>
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        app.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : app.status === 'finalized'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {app.status === 'pending' 
                          ? 'Pending' 
                          : app.status === 'finalized' 
                          ? 'Finalized' 
                          : 'Accepted'}
                      </span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => navigate('/company/applications')}>
                  View All Applications
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Your recent notifications</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Bell size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-md ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'}`}
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm mt-1">{notification.message}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDashboard;

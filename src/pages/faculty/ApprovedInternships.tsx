
import DashboardLayout from "@/components/layouts/DashboardLayout";
import FacultySidebar from "@/components/navigation/FacultySidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, FileText, Search } from "lucide-react";
import { useState } from "react";

// Sample data for approved internships
const approvedInternships = [
  {
    id: "INT-2025-001",
    studentName: "Ahmed Hassan",
    studentId: "49-12345",
    company: "Microsoft Egypt",
    date: "2025-01-15",
    duration: "3 months",
    type: "Full-time"
  },
  {
    id: "INT-2025-002",
    studentName: "Sara Mohamed",
    studentId: "49-12346",
    company: "IBM Egypt",
    date: "2025-02-10",
    duration: "2 months",
    type: "Part-time"
  },
  {
    id: "INT-2025-003",
    studentName: "Omar Khaled",
    studentId: "49-12347",
    company: "Vodafone Egypt",
    date: "2025-03-05",
    duration: "3 months",
    type: "Full-time"
  },
  {
    id: "INT-2025-004",
    studentName: "Nour Ahmed",
    studentId: "49-12348",
    company: "Oracle",
    date: "2025-02-28",
    duration: "6 months",
    type: "Full-time"
  },
  {
    id: "INT-2025-005",
    studentName: "Hossam Tarek",
    studentId: "49-12349",
    company: "Google",
    date: "2025-04-10",
    duration: "3 months",
    type: "Full-time"
  }
];

const ApprovedInternships = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter internships based on search query
  const filteredInternships = approvedInternships.filter(
    (internship) =>
      internship.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout 
      sidebar={<FacultySidebar />}
      pageTitle="Approved Internships"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              Approved Internships
              <CheckCircle className="ml-2 h-5 w-5 text-green-500" />
            </h2>
            <p className="text-gray-500">
              View and manage all approved student internship submissions
            </p>
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search internships..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-lg">Approved Internship List</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Approval Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInternships.map((internship) => (
                  <TableRow key={internship.id}>
                    <TableCell className="font-medium">{internship.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{internship.studentName}</div>
                        <div className="text-xs text-gray-500">{internship.studentId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{internship.company}</TableCell>
                    <TableCell>{internship.date}</TableCell>
                    <TableCell>{internship.duration}</TableCell>
                    <TableCell>{internship.type}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800">All internships on this page have been approved</p>
                <p className="text-xs text-green-700 mt-1">
                  These internships have been fully reviewed and approved. The students have successfully completed 
                  their internship requirements and the details have been verified.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ApprovedInternships;

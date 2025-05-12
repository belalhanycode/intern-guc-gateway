
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
import { FileText, Search, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Sample data for rejected internships
const rejectedInternships = [
  {
    id: "INT-2025-006",
    studentName: "Kareem Ali",
    studentId: "49-23456",
    company: "Local Startup Ltd",
    date: "2025-01-20",
    reason: "Company not approved",
    details: "The company is on the blacklist due to previous violations."
  },
  {
    id: "INT-2025-007",
    studentName: "Laila Ibrahim",
    studentId: "49-23457",
    company: "Tech Solutions",
    date: "2025-02-15",
    reason: "Insufficient duration",
    details: "The internship duration is less than the minimum required period."
  },
  {
    id: "INT-2025-008",
    studentName: "Mohamed Essam",
    studentId: "49-23458",
    company: "Digital Agency",
    date: "2025-03-10",
    reason: "Incomplete documentation",
    details: "Missing official company stamp on the evaluation form."
  },
  {
    id: "INT-2025-009",
    studentName: "Hana Mahmoud",
    studentId: "49-23459",
    company: "Software House",
    date: "2025-02-28",
    reason: "Unrelated to field of study",
    details: "The tasks performed during the internship do not align with the student's field of study."
  }
];

const RejectedInternships = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter internships based on search query
  const filteredInternships = rejectedInternships.filter(
    (internship) =>
      internship.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout 
      sidebar={<FacultySidebar />}
      pageTitle="Rejected Internships"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              Rejected Internships
              <XCircle className="ml-2 h-5 w-5 text-red-500" />
            </h2>
            <p className="text-gray-500">
              View internship submissions that did not meet the requirements
            </p>
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search rejections..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-lg">Rejected Internship List</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Rejection Reason</TableHead>
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
                    <TableCell>
                      <Badge variant="destructive" className="font-normal">
                        {internship.reason}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">{internship.details}</div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-100">
          <CardContent className="p-4">
            <div className="flex items-start">
              <XCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800">Important information about rejected internships</p>
                <p className="text-xs text-red-700 mt-1">
                  Students with rejected internships must submit a new internship application in the next submission cycle. 
                  Make sure to communicate the rejection reasons clearly to help students understand what needs to be corrected.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RejectedInternships;

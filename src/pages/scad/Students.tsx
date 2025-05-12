
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ScadSidebar from "@/components/navigation/ScadSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Search,
  Download,
  Eye,
  Mail,
  GraduationCap,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for students
const studentsData = [
  {
    id: "49-12345",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@student.guc.edu.eg",
    major: "Computer Science",
    gpa: 3.7,
    internshipStatus: "Completed",
    proStatus: true,
    submissions: 2,
  },
  {
    id: "49-12346",
    name: "Sara Mohamed",
    email: "sara.mohamed@student.guc.edu.eg",
    major: "Engineering",
    gpa: 3.9,
    internshipStatus: "In Progress",
    proStatus: false,
    submissions: 1,
  },
  {
    id: "49-12347",
    name: "Omar Khaled",
    email: "omar.khaled@student.guc.edu.eg",
    major: "Business Informatics",
    gpa: 3.5,
    internshipStatus: "Not Started",
    proStatus: false,
    submissions: 0,
  },
  {
    id: "49-12348",
    name: "Nour Ahmed",
    email: "nour.ahmed@student.guc.edu.eg",
    major: "Computer Science",
    gpa: 3.8,
    internshipStatus: "Completed",
    proStatus: true,
    submissions: 3,
  },
  {
    id: "49-12349",
    name: "Youssef Ali",
    email: "youssef.ali@student.guc.edu.eg",
    major: "Engineering",
    gpa: 3.4,
    internshipStatus: "Rejected",
    proStatus: false,
    submissions: 1,
  },
];

const Students = () => {
  const [students] = useState(studentsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [majorFilter, setMajorFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMajor = !majorFilter || student.major === majorFilter;
    const matchesStatus = !statusFilter || student.internshipStatus === statusFilter;
    return matchesSearch && matchesMajor && matchesStatus;
  });

  const handleSendEmail = (email: string) => {
    toast.success(`Email dialog opened for ${email}`);
  };

  const handleViewProfile = (id: string) => {
    toast.success(`Viewing profile for student ${id}`);
  };

  return (
    <DashboardLayout 
      sidebar={<ScadSidebar />} 
      pageTitle="Students"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              Student Management
              <GraduationCap className="ml-2 h-5 w-5 text-primary" />
            </h2>
            <p className="text-gray-500">
              View and manage all student internship information
            </p>
          </div>
          
          <Button onClick={() => toast.success("Student data exported")}>
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                All Students
              </CardTitle>
              
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search students..."
                    className="pl-8 md:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={majorFilter || ""} onValueChange={(value) => setMajorFilter(value || null)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by major" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Majors</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Business Informatics">Business Informatics</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Major</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Internship Status</TableHead>
                  <TableHead>PRO Status</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback>{student.name.charAt(0)}{student.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.major}</TableCell>
                    <TableCell>{student.gpa}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          student.internshipStatus === "Completed" 
                            ? "bg-green-100 text-green-800 hover:bg-green-100" 
                            : student.internshipStatus === "In Progress"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : student.internshipStatus === "Rejected"
                            ? "bg-red-100 text-red-800 hover:bg-red-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {student.internshipStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {student.proStatus ? (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 flex items-center w-fit">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          PRO
                        </Badge>
                      ) : (
                        <span className="text-gray-500 text-sm">Standard</span>
                      )}
                    </TableCell>
                    <TableCell>{student.submissions}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewProfile(student.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleSendEmail(student.email)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Students;

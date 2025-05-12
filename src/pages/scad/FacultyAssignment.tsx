
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
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Search, 
  UserCheck, 
  Filter 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock data for faculty members
const facultyData = [
  { id: 1, name: "Dr. Ahmed Mostafa", department: "Computer Science", assignedCount: 5, expertise: ["Web Development", "Databases"] },
  { id: 2, name: "Dr. Sara Ibrahim", department: "Engineering", assignedCount: 8, expertise: ["Networks", "IoT"] },
  { id: 3, name: "Dr. Mohamed Adel", department: "Business Informatics", assignedCount: 3, expertise: ["ERP Systems", "Business Intelligence"] },
  { id: 4, name: "Dr. Hany Fawzy", department: "Computer Science", assignedCount: 12, expertise: ["AI", "Machine Learning"] },
  { id: 5, name: "Dr. Noha Hamed", department: "Engineering", assignedCount: 7, expertise: ["Embedded Systems", "Robotics"] },
];

// Mock data for pending assignments
const pendingAssignmentsData = [
  { id: 101, student: "Ahmed Hassan", company: "Microsoft", internshipType: "Full-time", status: "Pending Assignment" },
  { id: 102, student: "Nour Ahmed", company: "Oracle", internshipType: "Part-time", status: "Pending Assignment" },
  { id: 103, student: "Omar Tarek", company: "IBM", internshipType: "Full-time", status: "Pending Assignment" },
  { id: 104, student: "Salma Khaled", company: "Amazon", internshipType: "Full-time", status: "Pending Assignment" },
  { id: 105, student: "Youssef Amr", company: "Vodafone", internshipType: "Part-time", status: "Pending Assignment" },
];

const FacultyAssignment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
  const [facultyList] = useState(facultyData);
  const [pendingAssignments] = useState(pendingAssignmentsData);

  // Filter faculty based on search and department
  const filteredFaculty = facultyList.filter((faculty) => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = !departmentFilter || faculty.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const handleAssign = (internshipId: number, facultyId: number) => {
    // In a real app, this would call an API
    toast.success(`Internship #${internshipId} assigned to faculty #${facultyId}`);
  };

  return (
    <DashboardLayout 
      sidebar={<ScadSidebar />} 
      pageTitle="Faculty Assignment"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              Faculty Assignment
              <UserCheck className="ml-2 h-5 w-5 text-primary" />
            </h2>
            <p className="text-gray-500">
              Assign faculty members to review internship submissions
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Faculty Members</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search faculty..."
                      className="pl-8 w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={departmentFilter || ""} onValueChange={(value) => setDepartmentFilter(value || null)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Departments</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Business Informatics">Business Informatics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Expertise</TableHead>
                    <TableHead>Assigned</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFaculty.map((faculty) => (
                    <TableRow key={faculty.id}>
                      <TableCell className="font-medium">{faculty.name}</TableCell>
                      <TableCell>{faculty.department}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {faculty.expertise.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={faculty.assignedCount > 10 ? "text-amber-600 font-medium" : "text-green-600"}>
                          {faculty.assignedCount}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAssign(pendingAssignments[0]?.id, faculty.id)}
                        >
                          Assign
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-gray-500" />
                  Pending Assignments
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingAssignments.map((assignment) => (
                  <div 
                    key={assignment.id} 
                    className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{assignment.student}</p>
                        <p className="text-sm text-gray-500">{assignment.company}</p>
                        <Badge variant="outline" className="mt-1">
                          {assignment.internshipType}
                        </Badge>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary"
                        onClick={() => {
                          document.getElementById("assign-modal")?.classList.remove("hidden");
                        }}
                      >
                        Assign
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* For visualization - in a real app, use a proper dialog/modal component */}
        <div id="assign-modal" className="hidden">
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <Card className="w-[500px]">
              <CardHeader>
                <CardTitle>Assign Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Select faculty to review this submission:</p>
                <div className="mt-4 space-y-2">
                  {facultyList.map((faculty) => (
                    <div key={faculty.id} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50 cursor-pointer">
                      <div>
                        <p className="font-medium">{faculty.name}</p>
                        <p className="text-sm text-gray-500">{faculty.department}</p>
                      </div>
                      <Badge>{faculty.assignedCount} assigned</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="flex justify-end gap-2 p-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    document.getElementById("assign-modal")?.classList.add("hidden");
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast.success("Assignment complete!");
                  document.getElementById("assign-modal")?.classList.add("hidden");
                }}>
                  Confirm Assignment
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyAssignment;


import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ScadSidebar from "@/components/navigation/ScadSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  ChevronDown,
  ClipboardCheck,
  Download,
  Eye,
  Filter,
  MessageSquare,
  Search,
  UserCheck,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Mock data for submissions
const submissionsData = [
  {
    id: "SUB-2025-001",
    student: { name: "Ahmed Hassan", id: "49-12345" },
    company: "Microsoft Egypt",
    submissionDate: "2025-05-10",
    internshipType: "Full-time",
    status: "pending" as const,
    assignedTo: "Dr. Ahmed Mostafa",
  },
  {
    id: "SUB-2025-002",
    student: { name: "Sara Mohamed", id: "49-12346" },
    company: "IBM Egypt",
    submissionDate: "2025-05-09",
    internshipType: "Part-time",
    status: "approved" as const,
    assignedTo: "Dr. Sara Ibrahim",
  },
  {
    id: "SUB-2025-003",
    student: { name: "Omar Khaled", id: "49-12347" },
    company: "Vodafone Egypt",
    submissionDate: "2025-05-08",
    internshipType: "Full-time",
    status: "rejected" as const,
    assignedTo: "Dr. Mohamed Adel",
  },
  {
    id: "SUB-2025-004",
    student: { name: "Nour Ahmed", id: "49-12348" },
    company: "Oracle",
    submissionDate: "2025-05-07",
    internshipType: "Part-time",
    status: "flagged" as const,
    assignedTo: null,
  },
  {
    id: "SUB-2025-005",
    student: { name: "Youssef Ali", id: "49-12349" },
    company: "Amazon",
    submissionDate: "2025-05-06",
    internshipType: "Full-time",
    status: "pending" as const,
    assignedTo: null,
  },
  {
    id: "SUB-2025-006",
    student: { name: "Mariam Samy", id: "49-12350" },
    company: "Google",
    submissionDate: "2025-05-05",
    internshipType: "Full-time",
    status: "pending" as const,
    assignedTo: null,
  },
];

const Submissions = () => {
  const [submissions] = useState(submissionsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  // Filter submissions based on search and filters
  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || submission.status === statusFilter;
    const matchesType = !typeFilter || submission.internshipType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDownload = (id: string) => {
    toast.success(`Downloaded submission ${id}`);
  };

  const handleAssign = (id: string) => {
    toast.success(`Opened assignment modal for ${id}`);
  };

  const handleView = (id: string) => {
    toast.success(`Viewing submission ${id}`);
  };

  return (
    <DashboardLayout 
      sidebar={<ScadSidebar />} 
      pageTitle="Submissions"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              Internship Submissions
              <ClipboardCheck className="ml-2 h-5 w-5 text-primary" />
            </h2>
            <p className="text-gray-500">
              Manage and review student internship evaluation submissions
            </p>
          </div>
          
          <Button onClick={() => toast.success("Generated report")}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <CardTitle>All Submissions</CardTitle>
              
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search submissions..."
                    className="pl-8 md:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter || "all"} onValueChange={(value) => setTypeFilter(value === "all" ? null : value)}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{submission.student.name}</div>
                        <div className="text-xs text-gray-500">{submission.student.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{submission.company}</TableCell>
                    <TableCell>{submission.submissionDate}</TableCell>
                    <TableCell>{submission.internshipType}</TableCell>
                    <TableCell>
                      <StatusBadge status={submission.status} />
                    </TableCell>
                    <TableCell>
                      {submission.assignedTo || (
                        <span className="text-amber-600 text-sm">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleView(submission.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(submission.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {!submission.assignedTo && (
                            <DropdownMenuItem onClick={() => handleAssign(submission.id)}>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Assign Faculty
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Add Comment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default Submissions;


import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Download,
  User,
  Calendar,
  Clock,
  FileCheck,
  FileX
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Application {
  id: string;
  studentName: string;
  studentId: string;
  jobTitle: string;
  jobId: string;
  appliedDate: string;
  status: "pending" | "finalized" | "accepted" | "rejected" | "current" | "completed";
  resumeUrl: string;
  coverLetterUrl?: string;
  additionalDocsUrls?: string[];
}

const CompanyApplications = () => {
  const [searchParams] = useSearchParams();
  const jobFilterFromUrl = searchParams.get('job');
  
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState(jobFilterFromUrl || "all");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Sample data for jobs
  const jobs = [
    { id: "1", title: "Frontend Developer Intern" },
    { id: "2", title: "Backend Developer Intern" },
    { id: "3", title: "UI/UX Design Intern" },
  ];

  // Sample data for applications
  const [applications] = useState<Application[]>([
    {
      id: "a1",
      studentName: "Ahmed Mohamed",
      studentId: "s1",
      jobTitle: "Frontend Developer Intern",
      jobId: "1",
      appliedDate: "2025-05-10",
      status: "pending",
      resumeUrl: "#",
      coverLetterUrl: "#",
      additionalDocsUrls: ["#", "#"]
    },
    {
      id: "a2",
      studentName: "Sara Ali",
      studentId: "s2",
      jobTitle: "Frontend Developer Intern",
      jobId: "1",
      appliedDate: "2025-05-12",
      status: "finalized",
      resumeUrl: "#"
    },
    {
      id: "a3",
      studentName: "Omar Hassan",
      studentId: "s3",
      jobTitle: "Backend Developer Intern",
      jobId: "2",
      appliedDate: "2025-05-08",
      status: "accepted",
      resumeUrl: "#",
      coverLetterUrl: "#"
    },
    {
      id: "a4",
      studentName: "Fatima Nour",
      studentId: "s4",
      jobTitle: "UI/UX Design Intern",
      jobId: "3",
      appliedDate: "2025-05-15",
      status: "current",
      resumeUrl: "#"
    },
    {
      id: "a5",
      studentName: "Youssef Kamal",
      studentId: "s5",
      jobTitle: "Backend Developer Intern",
      jobId: "2",
      appliedDate: "2025-04-20",
      status: "completed",
      resumeUrl: "#"
    }
  ]);

  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
    setViewDialogOpen(true);
  };

  const handleUpdateStatus = (application: Application, newStatus: Application['status']) => {
    toast.success(`Application status updated to ${newStatus}`);
    setViewDialogOpen(false);
  };

  const handleDownloadDocument = (docType: string) => {
    toast.info(`Downloading ${docType}...`);
  };

  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "finalized":
        return <Badge variant="secondary">Finalized</Badge>;
      case "accepted":
        return <Badge variant="default">Accepted</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "current":
        return <Badge className="bg-green-500">Current Intern</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || application.status === statusFilter;
    const matchesJob = jobFilter === "all" || application.jobId === jobFilter;
    return matchesSearch && matchesStatus && matchesJob;
  });

  return (
    <DashboardLayout
      sidebar={<CompanySidebar />}
      pageTitle="Internship Applications"
    >
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            View and manage internship applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by student name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 md:flex-nowrap">
              <div className="w-full md:w-48">
                <Select value={jobFilter} onValueChange={setJobFilter}>
                  <SelectTrigger>
                    <Filter size={16} className="mr-2" />
                    <span className="truncate">
                      {jobFilter === "all" ? "All Positions" : jobs.find(job => job.id === jobFilter)?.title || "All Positions"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Positions</SelectItem>
                    {jobs.map(job => (
                      <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter size={16} className="mr-2" />
                    <span className="truncate">Status</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="finalized">Finalized</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="current">Current Interns</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileCheck className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No applications found</h3>
              <p className="text-muted-foreground">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <Card key={application.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <User size={18} className="text-gray-400" />
                          <h3 className="font-semibold text-lg">{application.studentName}</h3>
                          {getStatusBadge(application.status)}
                        </div>
                        
                        <p className="text-sm mt-1 text-gray-600">{application.jobTitle}</p>
                        
                        <div className="flex flex-wrap gap-3 mt-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar size={14} className="mr-1" />
                            <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <FileCheck size={14} className="mr-1" />
                            <span>{application.additionalDocsUrls ? `${application.additionalDocsUrls.length + 1} documents` : "1 document"}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewApplication(application)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        {selectedApplication && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
              <DialogDescription>
                View and manage this application
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Applicant Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedApplication.studentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Position</p>
                      <p className="font-medium">{selectedApplication.jobTitle}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Applied On</p>
                      <p className="font-medium">{new Date(selectedApplication.appliedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Status</p>
                      <div className="mt-1">{getStatusBadge(selectedApplication.status)}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Documents</h3>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      onClick={() => handleDownloadDocument("Resume")}
                      className="w-full justify-start"
                    >
                      <Download size={16} className="mr-2" />
                      Download Resume
                    </Button>
                    
                    {selectedApplication.coverLetterUrl && (
                      <Button 
                        variant="outline" 
                        onClick={() => handleDownloadDocument("Cover Letter")}
                        className="w-full justify-start"
                      >
                        <Download size={16} className="mr-2" />
                        Download Cover Letter
                      </Button>
                    )}
                    
                    {selectedApplication.additionalDocsUrls && selectedApplication.additionalDocsUrls.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Additional Documents</p>
                        {selectedApplication.additionalDocsUrls.map((_, idx) => (
                          <Button 
                            key={idx}
                            variant="outline" 
                            onClick={() => handleDownloadDocument(`Additional Document ${idx + 1}`)}
                            className="w-full justify-start"
                          >
                            <Download size={16} className="mr-2" />
                            Document {idx + 1}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedApplication.status === "completed" ? (
                <div>
                  <h3 className="text-lg font-medium mb-4">Evaluation</h3>
                  <Button>
                    Create Evaluation
                  </Button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-medium mb-4">Update Status</h3>
                  <div className="flex gap-2 flex-wrap">
                    {selectedApplication.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => handleUpdateStatus(selectedApplication, "finalized")}
                        >
                          Mark as Finalized
                        </Button>
                        <Button
                          variant="default"
                          onClick={() => handleUpdateStatus(selectedApplication, "accepted")}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleUpdateStatus(selectedApplication, "rejected")}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {selectedApplication.status === "finalized" && (
                      <>
                        <Button
                          variant="default"
                          onClick={() => handleUpdateStatus(selectedApplication, "accepted")}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleUpdateStatus(selectedApplication, "rejected")}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {selectedApplication.status === "accepted" && (
                      <Button
                        variant="default"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => handleUpdateStatus(selectedApplication, "current")}
                      >
                        Mark as Current Intern
                      </Button>
                    )}
                    {selectedApplication.status === "current" && (
                      <Button
                        variant="default"
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={() => handleUpdateStatus(selectedApplication, "completed")}
                      >
                        Mark as Completed
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </DashboardLayout>
  );
};

export default CompanyApplications;

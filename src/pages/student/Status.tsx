
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StudentSidebar from "@/components/navigation/StudentSidebar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  FileText,
  Download,
  MessageSquare,
  CalendarRange,
  Building
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Sample data for current internship status
const currentInternship = {
  id: "INT-2025-102",
  company: "Oracle Egypt",
  position: "Software Engineering Intern",
  startDate: "2025-01-15",
  endDate: "2025-04-15",
  duration: "3 months",
  type: "Full-time",
  status: "pending",
  submissionDate: "2025-01-10",
  currentStage: 2, // 1: Submitted, 2: SCAD Review, 3: Faculty Review, 4: Final Decision
  supervisor: "Dr. Ahmed Hamdy",
  comments: [
    {
      from: "SCAD Admin",
      date: "2025-01-12",
      message: "Your documents have been received and are being processed. Please ensure your company supervisor submits their evaluation by next week."
    }
  ]
};

const Status = () => {
  // Function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case "flagged":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-300">
            <AlertCircle className="h-3 w-3 mr-1" />
            Flagged
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  // Function to render the progress value based on current stage
  const calculateProgress = (stage: number) => {
    const totalStages = 4;
    return (stage / totalStages) * 100;
  };

  return (
    <DashboardLayout 
      sidebar={<StudentSidebar />}
      pageTitle="Internship Status"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Current Internship Status</h2>
            <p className="text-gray-500">
              Track the status of your current internship submission
            </p>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">
                  Internship Application #{currentInternship.id}
                </CardTitle>
                <CardDescription>
                  Submitted on {currentInternship.submissionDate}
                </CardDescription>
              </div>
              {renderStatusBadge(currentInternship.status)}
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Approval Process</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="text-gray-500">Stage {currentInternship.currentStage} of 4</span>
                </div>
                <Progress value={calculateProgress(currentInternship.currentStage)} className="h-2" />
                <div className="grid grid-cols-4 text-xs mt-1">
                  <div className={`text-center ${currentInternship.currentStage >= 1 ? "text-blue-600" : "text-gray-400"}`}>
                    Submitted
                  </div>
                  <div className={`text-center ${currentInternship.currentStage >= 2 ? "text-blue-600" : "text-gray-400"}`}>
                    SCAD Review
                  </div>
                  <div className={`text-center ${currentInternship.currentStage >= 3 ? "text-blue-600" : "text-gray-400"}`}>
                    Faculty Review
                  </div>
                  <div className={`text-center ${currentInternship.currentStage >= 4 ? "text-blue-600" : "text-gray-400"}`}>
                    Final Decision
                  </div>
                </div>
              </div>
            </div>

            <Separator />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">Internship Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium flex items-center mt-1">
                      <Building className="h-4 w-4 mr-1 text-gray-400" />
                      {currentInternship.company}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Position</p>
                    <p className="font-medium">{currentInternship.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{currentInternship.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{currentInternship.type}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium flex items-center mt-1">
                      <CalendarRange className="h-4 w-4 mr-1 text-gray-400" />
                      {currentInternship.startDate} to {currentInternship.endDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Review Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Faculty Supervisor</p>
                    <p className="font-medium">{currentInternship.supervisor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Latest Update</p>
                    <div className="border rounded-md p-3 mt-1 bg-gray-50">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{currentInternship.comments[0].from}</span>
                        <span>{currentInternship.comments[0].date}</span>
                      </div>
                      <p className="text-sm">{currentInternship.comments[0].message}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />
            
            <div className="space-y-4">
              <h3 className="font-medium">Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" size="sm" className="justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Submitted Evaluation Form
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Submission Receipt
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t flex justify-between">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              View Full Details
            </Button>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact SCAD
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">What happens next?</p>
                <p className="text-xs text-blue-700 mt-1">
                  Your internship submission is currently being reviewed by the SCAD administration. 
                  Once this review is complete, it will be forwarded to a faculty member for academic assessment. 
                  You'll receive notifications as your application progresses through each stage.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Status;

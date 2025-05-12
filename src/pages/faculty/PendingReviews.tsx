
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import FacultySidebar from "@/components/navigation/FacultySidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckSquare,
  Download,
  Eye,
  FileText,
  Flag,
  XSquare
} from "lucide-react";
import { toast } from "sonner";

// Mock data for pending reviews
const pendingReviewsData = [
  {
    id: 1,
    studentName: "Ahmed Hassan",
    studentId: "123456789",
    company: "Tech Innovators Inc.",
    submissionDate: "2025-05-10",
    internshipType: "Full-time",
    faculty: "MET"
  },
  {
    id: 2,
    studentName: "Sara Mahmoud",
    studentId: "987654321",
    company: "Global Solutions",
    submissionDate: "2025-05-09",
    internshipType: "Part-time",
    faculty: "BI"
  },
  {
    id: 3,
    studentName: "Khaled Omar",
    studentId: "456789123",
    company: "DataTech Corp",
    submissionDate: "2025-05-08",
    internshipType: "Full-time",
    faculty: "DMET"
  }
];

const PendingReviews = () => {
  const [pendingReviews] = useState(pendingReviewsData);
  const [selectedReview, setSelectedReview] = useState<any | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [currentAction, setCurrentAction] = useState<"approve" | "reject" | "flag" | null>(null);

  const handleOpenReview = (review: any) => {
    setSelectedReview(review);
    setIsReviewDialogOpen(true);
  };

  const handleAction = (action: "approve" | "reject" | "flag") => {
    setCurrentAction(action);
    
    // In a real app, send to backend
    const actionMessages = {
      approve: "Internship approved successfully!",
      reject: "Internship rejected. Student will be notified.",
      flag: "Internship flagged for revision. Student will be notified."
    };
    
    toast.success(actionMessages[action]);
    setIsReviewDialogOpen(false);
    setFeedback("");
    setCurrentAction(null);
  };

  return (
    <DashboardLayout 
      sidebar={<FacultySidebar />}
      pageTitle="Pending Reviews"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Pending Internship Reviews</h2>
          <p className="text-gray-500">Review and provide feedback on student internship submissions</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Assigned Submissions</CardTitle>
            <CardDescription>
              Review these submissions and decide whether to accept, reject, or flag them
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.studentName}</TableCell>
                    <TableCell>{review.studentId}</TableCell>
                    <TableCell>{review.company}</TableCell>
                    <TableCell>{review.submissionDate}</TableCell>
                    <TableCell>{review.internshipType}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenReview(review)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Review Dialog */}
        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogContent className="max-w-4xl">
            {selectedReview && (
              <>
                <DialogHeader>
                  <DialogTitle>Review Internship Submission</DialogTitle>
                  <DialogDescription>
                    Reviewing {selectedReview.studentName}'s internship at {selectedReview.company}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-sm">Student Information</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <Label className="text-xs text-gray-500">Name</Label>
                          <p className="text-sm">{selectedReview.studentName}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">ID</Label>
                          <p className="text-sm">{selectedReview.studentId}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Faculty</Label>
                          <p className="text-sm">{selectedReview.faculty}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-sm">Company Information</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <Label className="text-xs text-gray-500">Company</Label>
                          <p className="text-sm">{selectedReview.company}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Internship Type</Label>
                          <p className="text-sm">{selectedReview.internshipType}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-sm">Tasks Performed</h3>
                      <div className="mt-2 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm">
                          {/* Mock data */}
                          Developed frontend components using React, assisted in API integration, 
                          fixed UI bugs, and participated in code reviews. Contributed to the development 
                          of new features for the company's main product.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-sm">Skills Acquired</h3>
                      <div className="mt-2 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm">
                          {/* Mock data */}
                          Enhanced React skills, learned TypeScript, improved knowledge of 
                          REST API design principles, gained experience with Git workflow 
                          in a team environment, and developed soft skills in communication.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-sm mb-2">Evaluation Form</h3>
                      <div className="border rounded-md p-4 flex flex-col items-center justify-center h-40">
                        <FileText className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm font-medium">Company Evaluation Form</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="feedback">Faculty Feedback</Label>
                      <Textarea 
                        id="feedback" 
                        placeholder="Provide your feedback on this internship submission..."
                        rows={8}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <DialogFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsReviewDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="destructive" 
                      onClick={() => handleAction("reject")}
                    >
                      <XSquare className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-orange-500 text-orange-500 hover:bg-orange-50"
                      onClick={() => handleAction("flag")}
                    >
                      <Flag className="h-4 w-4 mr-2" />
                      Flag for Revision
                    </Button>
                    <Button 
                      variant="default" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleAction("approve")}
                    >
                      <CheckSquare className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default PendingReviews;

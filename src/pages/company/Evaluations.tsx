
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
import { Input } from "@/components/ui/input";
import {
  Search,
  User,
  Calendar,
  Star,
  Edit,
  Trash2,
  ClipboardList,
  FileCheck
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Evaluation {
  id: string;
  internId: string;
  internName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  rating: number;
  comments: string;
  submittedDate: string;
}

const CompanyEvaluations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // Form state for editing
  const [editRating, setEditRating] = useState(0);
  const [editComments, setEditComments] = useState("");

  // Sample data for evaluations
  const [evaluations] = useState<Evaluation[]>([
    {
      id: "e1",
      internId: "i1",
      internName: "Nour Ahmed",
      jobTitle: "Data Science Intern",
      startDate: "2024-11-15",
      endDate: "2025-02-15",
      rating: 4,
      comments: "Nour was an excellent intern. She quickly adapted to our team environment and took initiative in her projects. Her analytical skills and attention to detail were particularly impressive.",
      submittedDate: "2025-02-20"
    },
    {
      id: "e2",
      internId: "i2",
      internName: "Youssef Kamal",
      jobTitle: "Backend Developer Intern",
      startDate: "2025-01-01",
      endDate: "2025-04-01",
      rating: 5,
      comments: "Youssef exceeded our expectations in every way. His technical skills were exemplary, and his problem-solving abilities were outstanding. He made significant contributions to our project and would be an asset to any team.",
      submittedDate: "2025-04-05"
    }
  ]);

  const handleEditEvaluation = () => {
    if (editRating === 0) {
      toast.error("Please provide a rating");
      return;
    }
    
    toast.success("Evaluation updated successfully");
    setIsEditOpen(false);
  };

  const handleDeleteEvaluation = () => {
    toast.success("Evaluation deleted successfully");
    setIsDeleteOpen(false);
  };

  const filteredEvaluations = evaluations.filter(evaluation => 
    evaluation.internName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evaluation.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      sidebar={<CompanySidebar />}
      pageTitle="Evaluations"
    >
      <Card>
        <CardHeader>
          <CardTitle>Intern Evaluations</CardTitle>
          <CardDescription>
            View and manage your evaluations for previous interns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by intern name or position..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredEvaluations.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileCheck className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No evaluations found</h3>
              <p className="text-muted-foreground">
                You haven't submitted any evaluations yet or no matches found for your search
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredEvaluations.map((evaluation) => (
                <Card key={evaluation.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <User size={18} className="text-gray-400" />
                          <h3 className="font-semibold text-lg">{evaluation.internName}</h3>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1">{evaluation.jobTitle}</p>
                        
                        <div className="mt-2 flex items-center text-sm text-gray-600">
                          <Calendar size={14} className="mr-1" />
                          <span>
                            {new Date(evaluation.startDate).toLocaleDateString()} - {new Date(evaluation.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="mt-2 flex items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={i < evaluation.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            Submitted on {new Date(evaluation.submittedDate).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <p className="mt-3 text-sm line-clamp-2">{evaluation.comments}</p>
                      </div>
                      
                      <div className="flex gap-2 mt-4 md:mt-0 md:ml-4">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => {
                            setSelectedEvaluation(evaluation);
                            setIsViewOpen(true);
                          }}
                        >
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => {
                            setSelectedEvaluation(evaluation);
                            setEditRating(evaluation.rating);
                            setEditComments(evaluation.comments);
                            setIsEditOpen(true);
                          }}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => {
                            setSelectedEvaluation(evaluation);
                            setIsDeleteOpen(true);
                          }}
                        >
                          <Trash2 size={14} />
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

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Evaluation Details</DialogTitle>
            <DialogDescription>
              View the full evaluation for this intern
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label>Intern</Label>
              <div className="text-sm font-medium mt-1">{selectedEvaluation?.internName}</div>
            </div>
            
            <div>
              <Label>Position</Label>
              <div className="text-sm font-medium mt-1">{selectedEvaluation?.jobTitle}</div>
            </div>
            
            <div>
              <Label>Internship Period</Label>
              <div className="text-sm font-medium mt-1">
                {selectedEvaluation && 
                  `${new Date(selectedEvaluation.startDate).toLocaleDateString()} - 
                   ${new Date(selectedEvaluation.endDate).toLocaleDateString()}`
                }
              </div>
            </div>
            
            <div>
              <Label>Rating</Label>
              <div className="flex mt-2">
                {selectedEvaluation && [...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={i < selectedEvaluation.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                  />
                ))}
              </div>
            </div>
            
            <div>
              <Label>Comments</Label>
              <div className="mt-2 p-3 border rounded-md bg-gray-50 text-sm">
                {selectedEvaluation?.comments}
              </div>
            </div>
            
            <div>
              <Label>Submitted on</Label>
              <div className="text-sm font-medium mt-1">
                {selectedEvaluation && new Date(selectedEvaluation.submittedDate).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Evaluation</DialogTitle>
            <DialogDescription>
              Update your evaluation for this intern
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label>Intern</Label>
              <div className="text-sm font-medium mt-1">{selectedEvaluation?.internName}</div>
            </div>
            
            <div>
              <Label>Position</Label>
              <div className="text-sm font-medium mt-1">{selectedEvaluation?.jobTitle}</div>
            </div>
            
            <div>
              <Label htmlFor="rating">Rating</Label>
              <div className="flex mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setEditRating(star)}
                    className="p-0 w-6 h-6 focus:outline-none"
                  >
                    <Star 
                      size={20} 
                      className={`${star <= editRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                                   cursor-pointer hover:text-yellow-400`}
                    />
                  </button>
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {editRating > 0 ? `${editRating} out of 5` : "No rating"}
                </span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="comments">Comments</Label>
              <Textarea 
                id="comments"
                placeholder="Provide feedback on the intern's performance..."
                value={editComments}
                onChange={(e) => setEditComments(e.target.value)}
                className="mt-1 min-h-[120px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditEvaluation}>
              Update Evaluation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Evaluation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this evaluation? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p>
              You are about to delete the evaluation for <strong>{selectedEvaluation?.internName}</strong> ({selectedEvaluation?.jobTitle}).
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvaluation}>
              Delete Evaluation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default CompanyEvaluations;

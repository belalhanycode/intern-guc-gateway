
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
  Filter,
  User,
  Calendar,
  MailOpen,
  Star,
  Briefcase,
  ClipboardList
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Intern {
  id: string;
  name: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  status: "current" | "completed";
  university: string;
  major: string;
  evaluation?: {
    id: string;
    rating: number;
    comments: string;
    submittedDate: string;
  };
}

const CompanyInterns = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [evaluationOpen, setEvaluationOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  // Sample data for interns
  const [interns] = useState<Intern[]>([
    {
      id: "i1",
      name: "Ahmed Mohamed",
      jobTitle: "Frontend Developer Intern",
      startDate: "2025-02-01",
      status: "current",
      university: "German University in Cairo",
      major: "Computer Science",
    },
    {
      id: "i2",
      name: "Laila Hassan",
      jobTitle: "UI/UX Design Intern",
      startDate: "2025-02-15",
      status: "current",
      university: "German University in Cairo",
      major: "Media Engineering",
    },
    {
      id: "i3",
      name: "Youssef Kamal",
      jobTitle: "Backend Developer Intern",
      startDate: "2025-01-01",
      endDate: "2025-04-01",
      status: "completed",
      university: "German University in Cairo",
      major: "Computer Science",
    },
    {
      id: "i4",
      name: "Nour Ahmed",
      jobTitle: "Data Science Intern",
      startDate: "2024-11-15",
      endDate: "2025-02-15",
      status: "completed",
      university: "German University in Cairo",
      major: "Data Science",
      evaluation: {
        id: "e1",
        rating: 4,
        comments: "Nour was an excellent intern. She quickly adapted to our team environment and took initiative in her projects. Her analytical skills and attention to detail were particularly impressive.",
        submittedDate: "2025-02-20"
      }
    }
  ]);

  const handleSubmitEvaluation = () => {
    if (!rating) {
      toast.error("Please provide a rating");
      return;
    }
    
    toast.success("Evaluation submitted successfully");
    setEvaluationOpen(false);
  };

  const filteredInterns = interns.filter(intern => {
    const matchesSearch = 
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || intern.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout
      sidebar={<CompanySidebar />}
      pageTitle="Interns"
    >
      <Card>
        <CardHeader>
          <CardTitle>Interns</CardTitle>
          <CardDescription>
            Manage and evaluate your interns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by name or position..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-40">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter size={16} className="mr-2" />
                  <span className="truncate">Status</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredInterns.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <User className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No interns found</h3>
              <p className="text-muted-foreground">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredInterns.map((intern) => (
                <Card key={intern.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="text-gray-400" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{intern.name}</h3>
                          <Badge
                            variant={intern.status === "current" ? "default" : "secondary"}
                            className={intern.status === "current" ? "bg-green-500" : ""}
                          >
                            {intern.status === "current" ? "Current" : "Completed"}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600">{intern.jobTitle}</p>
                        
                        <div className="mt-2 flex items-center text-sm text-gray-600">
                          <Briefcase size={14} className="mr-1" />
                          <span className="mr-3">{intern.university}</span>
                          <ClipboardList size={14} className="mr-1" />
                          <span>{intern.major}</span>
                        </div>
                        
                        <div className="mt-1 flex items-center text-sm text-gray-600">
                          <Calendar size={14} className="mr-1" />
                          <span>
                            {new Date(intern.startDate).toLocaleDateString()} 
                            {intern.endDate && ` - ${new Date(intern.endDate).toLocaleDateString()}`}
                          </span>
                        </div>
                        
                        <div className="mt-3">
                          {intern.status === "completed" ? (
                            intern.evaluation ? (
                              <div className="flex items-center">
                                <div className="flex items-center mr-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      size={16} 
                                      className={i < intern.evaluation!.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                  Evaluated on {new Date(intern.evaluation.submittedDate).toLocaleDateString()}
                                </span>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => {
                                    setSelectedIntern(intern);
                                    setRating(intern.evaluation?.rating || 0);
                                    setComments(intern.evaluation?.comments || "");
                                    setEvaluationOpen(true);
                                  }}
                                  className="ml-auto"
                                >
                                  View
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => {
                                  setSelectedIntern(intern);
                                  setRating(0);
                                  setComments("");
                                  setEvaluationOpen(true);
                                }}
                              >
                                Add Evaluation
                              </Button>
                            )
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                toast.info("You can contact the intern via email");
                              }}
                            >
                              <MailOpen size={14} className="mr-1" />
                              Contact
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Evaluation Dialog */}
      <Dialog open={evaluationOpen} onOpenChange={setEvaluationOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedIntern?.evaluation ? "View Evaluation" : "Add Evaluation"}
            </DialogTitle>
            <DialogDescription>
              {selectedIntern?.evaluation 
                ? "Review the evaluation you've provided for this intern" 
                : "Provide an evaluation for the intern's performance"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="intern-name">Intern</Label>
              <div className="text-sm font-medium mt-1">{selectedIntern?.name}</div>
            </div>
            
            <div>
              <Label htmlFor="intern-position">Position</Label>
              <div className="text-sm font-medium mt-1">{selectedIntern?.jobTitle}</div>
            </div>
            
            <div>
              <Label htmlFor="rating">Rating</Label>
              <div className="flex mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => !selectedIntern?.evaluation && setRating(star)}
                    className={`p-0 w-6 h-6 focus:outline-none`}
                  >
                    <Star 
                      size={20} 
                      className={`${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                                   ${selectedIntern?.evaluation ? "" : "cursor-pointer hover:text-yellow-400"}`}
                    />
                  </button>
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {rating > 0 ? `${rating} out of 5` : "No rating"}
                </span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="comments">Comments</Label>
              <Textarea 
                id="comments"
                placeholder="Provide feedback on the intern's performance..."
                value={comments}
                onChange={(e) => !selectedIntern?.evaluation && setComments(e.target.value)}
                className="mt-1 min-h-[120px]"
                readOnly={!!selectedIntern?.evaluation}
              />
            </div>
          </div>
          
          <DialogFooter>
            {selectedIntern?.evaluation ? (
              <Button variant="outline" onClick={() => setEvaluationOpen(false)}>
                Close
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setEvaluationOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitEvaluation}>
                  Submit Evaluation
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default CompanyInterns;

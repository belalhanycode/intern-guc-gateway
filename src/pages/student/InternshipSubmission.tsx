
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StudentSidebar from "@/components/navigation/StudentSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const InternshipSubmission = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [internshipType, setInternshipType] = useState("full-time");
  const [evaluationFile, setEvaluationFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("personal");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEvaluationFile(e.target.files[0]);
      toast.success("File uploaded successfully!");
    }
  };

  const handleSaveAsDraft = () => {
    toast.success("Saved as draft successfully!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, perform validation and submit to backend
    if (!startDate || !endDate || !evaluationFile) {
      toast.error("Please fill in all required fields and upload the evaluation form");
      return;
    }
    
    toast.success("Internship evaluation submitted successfully!");
    navigate("/student/status");
  };

  return (
    <DashboardLayout 
      sidebar={<StudentSidebar />}
      pageTitle="Submit Internship Evaluation"
    >
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Internship Evaluation Form</CardTitle>
            <CardDescription>
              Submit your internship evaluation form for assessment by SCAD
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Details</TabsTrigger>
                <TabsTrigger value="company">Company Details</TabsTrigger>
                <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleSubmit}>
                <TabsContent value="personal" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-id">Student ID</Label>
                      <Input id="student-id" placeholder="123456789" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john.doe@student.guc.edu.eg" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="faculty">Faculty</Label>
                      <Select defaultValue="met">
                        <SelectTrigger id="faculty">
                          <SelectValue placeholder="Select faculty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="met">Media Engineering & Technology</SelectItem>
                          <SelectItem value="bi">Business Informatics</SelectItem>
                          <SelectItem value="csen">Computer Science & Engineering</SelectItem>
                          <SelectItem value="dmet">Digital Media Engineering & Technology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="major">Major</Label>
                      <Select defaultValue="cs">
                        <SelectTrigger id="major">
                          <SelectValue placeholder="Select major" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="is">Information Systems</SelectItem>
                          <SelectItem value="ds">Data Science</SelectItem>
                          <SelectItem value="se">Software Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="button" onClick={() => setActiveTab("company")}>
                      Continue
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="company" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" placeholder="Tech Solutions Inc." required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-address">Company Address</Label>
                      <Input id="company-address" placeholder="123 Tech St., Cairo" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="supervisor-name">Supervisor Name</Label>
                      <Input id="supervisor-name" placeholder="Jane Smith" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supervisor-position">Supervisor Position</Label>
                      <Input id="supervisor-position" placeholder="Senior Developer" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="supervisor-email">Supervisor Email</Label>
                    <Input id="supervisor-email" type="email" placeholder="jane.smith@techsolutions.com" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Internship Type</Label>
                      <Select value={internshipType} onValueChange={setInternshipType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {internshipType === "part-time" && (
                      <div className="space-y-2">
                        <Label htmlFor="hours-per-week">Hours per Week</Label>
                        <div className="flex items-center space-x-2">
                          <Input 
                            id="hours-per-week" 
                            type="number" 
                            placeholder="20" 
                            min="10" 
                            max="30"
                          />
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("personal")}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("evaluation")}>
                      Continue
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="evaluation" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="tasks">Tasks Performed</Label>
                    <Textarea 
                      id="tasks" 
                      placeholder="Describe the main tasks and responsibilities during your internship"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills Acquired</Label>
                    <Textarea 
                      id="skills" 
                      placeholder="List the key skills and knowledge you developed"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Upload Evaluation Form</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm font-medium">
                          {evaluationFile ? evaluationFile.name : "Upload company-stamped evaluation form"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF or image files only (max 10MB)
                        </p>
                        <input
                          type="file"
                          id="evaluation-file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-2"
                          onClick={() => document.getElementById("evaluation-file")?.click()}
                        >
                          Select File
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("company")}>
                      Back
                    </Button>
                    <div className="space-x-2">
                      <Button type="button" variant="outline" onClick={handleSaveAsDraft}>
                        Save as Draft
                      </Button>
                      <Button type="submit">Submit Evaluation</Button>
                    </div>
                  </div>
                </TabsContent>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InternshipSubmission;

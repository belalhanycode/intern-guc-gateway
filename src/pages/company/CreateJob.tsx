
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import CompanySidebar from "@/components/navigation/CompanySidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const CreateJob = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [isPaid, setIsPaid] = useState("paid");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !description || !duration || !skills) {
      toast.error("Please fill out all required fields");
      return;
    }

    if (isPaid === "paid" && !salary) {
      toast.error("Please enter the expected salary for paid internships");
      return;
    }

    // In a real app, we would save this to a database
    toast.success("Internship opportunity posted successfully!");
    navigate("/company/internships");
  };

  return (
    <DashboardLayout
      sidebar={<CompanySidebar />}
      pageTitle="Create Internship Posting"
    >
      <Card className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>New Internship Opportunity</CardTitle>
            <CardDescription>
              Create a new internship posting to attract students
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input 
                id="title" 
                placeholder="e.g. Frontend Developer Intern" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the internship role, responsibilities, and what the intern will learn" 
                className="min-h-[200px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={duration} onValueChange={setDuration} required>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="2months">2 Months</SelectItem>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="compensationType">Compensation Type</Label>
                <Select value={isPaid} onValueChange={setIsPaid} required>
                  <SelectTrigger id="compensationType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isPaid === "paid" && (
              <div className="space-y-2">
                <Label htmlFor="salary">Expected Salary/Stipend (per month)</Label>
                <Input 
                  id="salary" 
                  placeholder="e.g. $500" 
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="skills">Required Skills</Label>
              <Textarea 
                id="skills" 
                placeholder="List the skills required for this internship (e.g. JavaScript, React, Communication skills)" 
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" type="button" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit">Post Internship</Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default CreateJob;

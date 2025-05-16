
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import BaseLayout from "@/components/layouts/BaseLayout";

const CompanyRegister = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);
  
  const industries = [
    "Technology", 
    "Healthcare", 
    "Finance", 
    "Education", 
    "Manufacturing",
    "Retail",
    "Media",
    "Telecommunications",
    "Consulting",
    "Construction"
  ];

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setDocuments(filesArray);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, we would upload the files and submit the form data
    setTimeout(() => {
      toast.success("Registration submitted successfully! You will be notified when your application is reviewed.");
      setIsSubmitting(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <BaseLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Company Registration</h1>
            <p className="mt-2 text-gray-600">Join the GUC Internship System as a company partner</p>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Please provide your company details. All fields are required.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input id="name" required placeholder="e.g. Acme Corporation" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Official Company Email</Label>
                    <Input id="email" type="email" required placeholder="e.g. hr@company.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={industry} onValueChange={setIndustry} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => (
                          <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="size">Company Size</Label>
                    <Select value={companySize} onValueChange={setCompanySize} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (50 employees or less)</SelectItem>
                        <SelectItem value="medium">Medium (51-100 employees)</SelectItem>
                        <SelectItem value="large">Large (101-500 employees)</SelectItem>
                        <SelectItem value="corporate">Corporate (500+ employees)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Brief description of your company" 
                    className="min-h-[100px]" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logo">Company Logo</Label>
                  <div className="flex items-center gap-4">
                    {logo && (
                      <div className="w-16 h-16 border rounded overflow-hidden bg-gray-50 flex items-center justify-center">
                        <img 
                          src={URL.createObjectURL(logo)} 
                          alt="Logo preview" 
                          className="max-w-full max-h-full object-contain" 
                        />
                      </div>
                    )}
                    <Input 
                      id="logo" 
                      type="file" 
                      accept="image/*" 
                      required 
                      onChange={handleLogoChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="documents">
                    Verification Documents
                    <span className="text-sm text-gray-500 ml-2">(Tax documents, business license, etc.)</span>
                  </Label>
                  <Input 
                    id="documents" 
                    type="file" 
                    multiple 
                    required 
                    onChange={handleDocumentsChange}
                  />
                  {documents.length > 0 && (
                    <div className="mt-2 text-sm text-gray-500">
                      {documents.length} document(s) selected
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="password">Create Password</Label>
                  <Input id="password" type="password" required className="mt-1" />
                  <p className="mt-1 text-xs text-gray-500">
                    Password must be at least 8 characters and include a number and special character.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" type="button" onClick={() => navigate("/login")}>
                  Back to Login
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Register Company"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
};

export default CompanyRegister;

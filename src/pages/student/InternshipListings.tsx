
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StudentSidebar from "@/components/navigation/StudentSidebar";
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
  Briefcase, 
  Calendar, 
  DollarSign,
  Star,
  Building,
  MapPin
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

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  industry: string;
  duration: string;
  paid: boolean;
  salary: string;
  postedDate: string;
  logo: string;
  skills: string[];
}

const InternshipListings = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [paidFilter, setPaidFilter] = useState("all");

  // Sample data
  const [internships] = useState<Internship[]>([
    {
      id: "1",
      title: "Frontend Developer Intern",
      company: "Tech Innovators",
      location: "Cairo",
      industry: "Technology",
      duration: "3 months",
      paid: true,
      salary: "$500/month",
      postedDate: "2025-05-10",
      logo: "https://via.placeholder.com/40",
      skills: ["JavaScript", "React", "HTML/CSS"],
    },
    {
      id: "2",
      title: "Data Analysis Intern",
      company: "Finance Experts",
      location: "Giza",
      industry: "Finance",
      duration: "2 months",
      paid: true,
      salary: "$450/month",
      postedDate: "2025-05-12",
      logo: "https://via.placeholder.com/40",
      skills: ["Excel", "SQL", "Data Visualization"],
    },
    {
      id: "3",
      title: "Marketing Assistant",
      company: "Media Productions",
      location: "Alexandria",
      industry: "Media",
      duration: "3 months",
      paid: false,
      salary: "",
      postedDate: "2025-05-14",
      logo: "https://via.placeholder.com/40",
      skills: ["Social Media", "Content Creation", "Adobe Creative Suite"],
    },
    {
      id: "4",
      title: "UX/UI Design Intern",
      company: "Design Studio",
      location: "Cairo",
      industry: "Technology",
      duration: "6 months",
      paid: true,
      salary: "$600/month",
      postedDate: "2025-05-08",
      logo: "https://via.placeholder.com/40",
      skills: ["Figma", "UX Research", "Prototyping"],
    },
    {
      id: "5",
      title: "HR Assistant",
      company: "Global Healthcare",
      location: "Cairo",
      industry: "Healthcare",
      duration: "3 months",
      paid: false,
      salary: "",
      postedDate: "2025-05-15",
      logo: "https://via.placeholder.com/40",
      skills: ["Communication", "Organization", "MS Office"],
    },
    {
      id: "6",
      title: "Teaching Assistant",
      company: "EduTech Solutions",
      location: "Giza",
      industry: "Education",
      duration: "4 months",
      paid: true,
      salary: "$300/month",
      postedDate: "2025-05-09",
      logo: "https://via.placeholder.com/40",
      skills: ["Teaching", "Curriculum Development", "Student Assessment"],
    },
  ]);

  const handleViewDetails = (id: string) => {
    // In a real app, navigate to details page
    toast.info("Viewing details for internship " + id);
  };

  const handleApply = (id: string) => {
    // In a real app, open application form
    toast.success("Application started for internship " + id);
    navigate(`/student/apply/${id}`);
  };

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = industryFilter === "all" || internship.industry === industryFilter;
    
    const matchesDuration = durationFilter === "all" || (
      (durationFilter === "short" && parseInt(internship.duration) <= 2) ||
      (durationFilter === "medium" && parseInt(internship.duration) === 3) ||
      (durationFilter === "long" && parseInt(internship.duration) > 3)
    );
    
    const matchesPaid = paidFilter === "all" || 
      (paidFilter === "paid" && internship.paid) || 
      (paidFilter === "unpaid" && !internship.paid);
    
    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
  });

  const industries = ["Technology", "Finance", "Healthcare", "Education", "Media", "Manufacturing"];

  return (
    <DashboardLayout
      sidebar={<StudentSidebar />}
      pageTitle="Internship Opportunities"
    >
      <Card>
        <CardHeader>
          <CardTitle>Available Internships</CardTitle>
          <CardDescription>
            Explore and apply for internship opportunities from our partner companies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by job title or company..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <div className="w-full md:w-40">
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger>
                    <Filter size={16} className="mr-2" />
                    <span className="truncate">
                      {industryFilter === "all" ? "Industry" : industryFilter}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-40">
                <Select value={durationFilter} onValueChange={setDurationFilter}>
                  <SelectTrigger>
                    <Calendar size={16} className="mr-2" />
                    <span>Duration</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Durations</SelectItem>
                    <SelectItem value="short">Short (≤ 2 months)</SelectItem>
                    <SelectItem value="medium">Medium (3 months)</SelectItem>
                    <SelectItem value="long">Long ({`>`} 3 months)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-40">
                <Select value={paidFilter} onValueChange={setPaidFilter}>
                  <SelectTrigger>
                    <DollarSign size={16} className="mr-2" />
                    <span>Compensation</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="paid">Paid Only</SelectItem>
                    <SelectItem value="unpaid">Unpaid Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredInternships.map((internship) => (
              <Card key={internship.id} className="overflow-hidden border shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-md bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img 
                        src={internship.logo} 
                        alt={`${internship.company} logo`} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{internship.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <Building size={14} className="mr-1" />
                        <span className="mr-3">{internship.company}</span>
                        <MapPin size={14} className="mr-1" />
                        <span>{internship.location}</span>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge variant="outline" className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {internship.duration}
                        </Badge>
                        <Badge variant={internship.paid ? "default" : "secondary"} className="flex items-center">
                          {internship.paid ? (
                            <>
                              <DollarSign size={12} className="mr-1" />
                              {internship.salary}
                            </>
                          ) : "Unpaid"}
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50">
                          {internship.industry}
                        </Badge>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-1">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {internship.skills.map((skill, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Posted: {new Date(internship.postedDate).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewDetails(internship.id)}
                          >
                            Details
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleApply(internship.id)}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredInternships.length === 0 && (
              <div className="col-span-full py-12 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Briefcase className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">No internships found</h3>
                <p className="text-gray-500">Try adjusting your search filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default InternshipListings;


import { useState } from "react";
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
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Users,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Internship {
  id: string;
  title: string;
  description: string;
  duration: string;
  isPaid: boolean;
  salary: string;
  applicants: number;
  postedDate: string;
  status: "active" | "closed";
}

const CompanyInternships = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample data
  const [internships] = useState<Internship[]>([
    {
      id: "1",
      title: "Frontend Developer Intern",
      description: "Work on our web applications using React and related technologies.",
      duration: "3 months",
      isPaid: true,
      salary: "$500/month",
      applicants: 12,
      postedDate: "2025-05-02",
      status: "active"
    },
    {
      id: "2",
      title: "Backend Developer Intern",
      description: "Build and maintain server-side applications using Node.js.",
      duration: "3 months",
      isPaid: true,
      salary: "$550/month",
      applicants: 7,
      postedDate: "2025-05-05",
      status: "active"
    },
    {
      id: "3",
      title: "UI/UX Design Intern",
      description: "Create user interfaces and improve user experience for our products.",
      duration: "2 months",
      isPaid: false,
      salary: "",
      applicants: 15,
      postedDate: "2025-04-15",
      status: "closed"
    }
  ]);

  const handleViewApplicants = (id: string) => {
    navigate(`/company/applications?job=${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/company/edit-job/${id}`);
    toast.info("Editing job " + id);
  };

  const handleDelete = (id: string) => {
    toast.success("Job post deleted successfully");
  };

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || internship.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout
      sidebar={<CompanySidebar />}
      pageTitle="My Internship Listings"
    >
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center md:justify-between">
        <div className="w-full md:w-auto">
          <Button 
            onClick={() => navigate("/company/create-job")} 
            className="flex gap-2 items-center"
          >
            <Plus size={16} />
            Post New Internship
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="w-full md:w-60 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search by title..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-40">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <Filter size={16} className="mr-2" />
                <span>Status</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredInternships.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Clock className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-1">No internship listings found</h3>
          <p className="text-muted-foreground">Create your first internship posting to get started</p>
          <Button 
            onClick={() => navigate("/company/create-job")} 
            variant="default" 
            className="mt-4"
          >
            <Plus size={16} className="mr-2" />
            Create Internship Listing
          </Button>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>My Internship Listings</CardTitle>
            <CardDescription>
              Manage your company's internship opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInternships.map((internship) => (
                <Card key={internship.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{internship.title}</h3>
                          <Badge variant={internship.status === "active" ? "default" : "secondary"}>
                            {internship.status === "active" ? "Active" : "Closed"}
                          </Badge>
                        </div>

                        <p className="text-sm mt-1 text-gray-600 line-clamp-2">{internship.description}</p>
                        
                        <div className="flex flex-wrap gap-3 mt-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar size={14} className="mr-1" />
                            <span>{internship.duration}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign size={14} className="mr-1" />
                            <span>{internship.isPaid ? internship.salary : "Unpaid"}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Users size={14} className="mr-1" />
                            <span>{internship.applicants} applicants</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock size={14} className="mr-1" />
                            <span>Posted: {new Date(internship.postedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewApplicants(internship.id)}
                          className="flex gap-1 items-center"
                        >
                          <Eye size={14} />
                          <span>Applicants</span>
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(internship.id)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button 
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(internship.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default CompanyInternships;

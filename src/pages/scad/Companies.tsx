
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ScadSidebar from "@/components/navigation/ScadSidebar";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter,
  Eye,
  Check,
  X
} from "lucide-react";
import { toast } from "sonner";

interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  status: "pending" | "approved" | "rejected";
  applicationDate: string;
}

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample data
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "Acme Corporation",
      industry: "Technology",
      size: "large",
      status: "pending",
      applicationDate: "2025-05-10",
    },
    {
      id: "2",
      name: "Global Healthcare",
      industry: "Healthcare",
      size: "corporate",
      status: "approved",
      applicationDate: "2025-05-05",
    },
    {
      id: "3",
      name: "EduTech Solutions",
      industry: "Education",
      size: "medium",
      status: "pending",
      applicationDate: "2025-05-12",
    },
    {
      id: "4",
      name: "Finance Experts",
      industry: "Finance",
      size: "small",
      status: "rejected",
      applicationDate: "2025-05-01",
    },
    {
      id: "5",
      name: "Tech Innovators",
      industry: "Technology",
      size: "medium",
      status: "pending",
      applicationDate: "2025-05-14",
    },
    {
      id: "6",
      name: "Media Productions",
      industry: "Media",
      size: "small",
      status: "approved",
      applicationDate: "2025-04-28",
    },
  ]);

  const handleApprove = (id: string) => {
    setCompanies(
      companies.map(company =>
        company.id === id ? { ...company, status: "approved" } : company
      )
    );
    toast.success("Company application approved");
  };

  const handleReject = (id: string) => {
    setCompanies(
      companies.map(company =>
        company.id === id ? { ...company, status: "rejected" } : company
      )
    );
    toast.success("Company application rejected");
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === "all" || company.industry === industryFilter;
    const matchesStatus = statusFilter === "all" || company.status === statusFilter;
    
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  const industries = ["Technology", "Healthcare", "Finance", "Education", "Media", "Manufacturing"];

  return (
    <DashboardLayout
      sidebar={<ScadSidebar />}
      pageTitle="Companies"
    >
      <Card>
        <CardHeader>
          <CardTitle>Company Applications</CardTitle>
          <CardDescription>
            Review and manage company applications to join the SCAD system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by company name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-48">
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger>
                    <Filter size={16} className="mr-2" />
                    <span>{industryFilter === "all" ? "All Industries" : industryFilter}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter size={16} className="mr-2" />
                    <span>
                      {statusFilter === "all" 
                        ? "All Statuses" 
                        : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Industry
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCompanies.map((company) => (
                  <tr key={company.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{company.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {company.industry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="capitalize">{company.size}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={
                        company.status === "approved" 
                          ? "default" 
                          : company.status === "rejected" 
                            ? "destructive" 
                            : "secondary"
                      }>
                        {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(company.applicationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye size={16} />
                        </Button>
                        {company.status === "pending" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleApprove(company.id)}
                            >
                              <Check size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleReject(company.id)}
                            >
                              <X size={16} />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCompanies.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      No companies found matching the current filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Companies;

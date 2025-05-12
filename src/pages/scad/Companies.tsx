
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ScadSidebar from "@/components/navigation/ScadSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Building, 
  Search, 
  Plus, 
  MapPin, 
  Phone, 
  Globe,
  User,
  Shield,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Mock data for companies
const companiesData = [
  {
    id: 1,
    name: "Microsoft Egypt",
    location: "Cairo, Egypt",
    website: "microsoft.com",
    phone: "+20-2-2461-9855",
    contactPerson: "Ahmed Mahmoud",
    activeInterns: 5,
    totalInterns: 48,
    blacklisted: false,
  },
  {
    id: 2,
    name: "IBM Egypt",
    location: "Smart Village, Giza",
    website: "ibm.com",
    phone: "+20-2-3535-9100",
    contactPerson: "Nour Ibrahim",
    activeInterns: 3,
    totalInterns: 36,
    blacklisted: false,
  },
  {
    id: 3,
    name: "Oracle Egypt",
    location: "Heliopolis, Cairo",
    website: "oracle.com",
    phone: "+20-2-2417-0000",
    contactPerson: "Khaled Ahmed",
    activeInterns: 2,
    totalInterns: 29,
    blacklisted: false,
  },
  {
    id: 4,
    name: "Amazon Development Center",
    location: "Maadi, Cairo",
    website: "amazon.com",
    phone: "+20-2-2527-1111",
    contactPerson: "Sara Mohamed",
    activeInterns: 4,
    totalInterns: 22,
    blacklisted: false,
  },
  {
    id: 5,
    name: "Tech Scammers Ltd",
    location: "Dokki, Giza",
    website: "techscammers.com",
    phone: "+20-2-3336-4444",
    contactPerson: "Omar Tarek",
    activeInterns: 0,
    totalInterns: 1,
    blacklisted: true,
  },
];

const Companies = () => {
  const [companies, setCompanies] = useState(companiesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBlacklisted, setShowBlacklisted] = useState(true);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyLocation, setNewCompanyLocation] = useState("");
  const [blacklistReason, setBlacklistReason] = useState("");
  const [blacklistCompanyId, setBlacklistCompanyId] = useState<number | null>(null);
  const [isBlacklistDialogOpen, setIsBlacklistDialogOpen] = useState(false);
  const [isAddCompanyDialogOpen, setIsAddCompanyDialogOpen] = useState(false);

  // Filter companies based on search and blacklist filter
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBlacklistFilter = showBlacklisted || !company.blacklisted;
    return matchesSearch && matchesBlacklistFilter;
  });

  const handleAddCompany = () => {
    if (!newCompanyName || !newCompanyLocation) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newCompany = {
      id: companies.length + 1,
      name: newCompanyName,
      location: newCompanyLocation,
      website: "",
      phone: "",
      contactPerson: "",
      activeInterns: 0,
      totalInterns: 0,
      blacklisted: false,
    };
    
    setCompanies([...companies, newCompany]);
    setNewCompanyName("");
    setNewCompanyLocation("");
    setIsAddCompanyDialogOpen(false);
    toast.success("Company added successfully");
  };

  const handleToggleBlacklist = (id: number) => {
    const company = companies.find(c => c.id === id);
    if (!company) return;
    
    if (company.blacklisted) {
      // Remove from blacklist
      setCompanies(companies.map(c => 
        c.id === id ? { ...c, blacklisted: false } : c
      ));
      toast.success(`${company.name} removed from blacklist`);
    } else {
      // Prepare to blacklist
      setBlacklistCompanyId(id);
      setBlacklistReason("");
      setIsBlacklistDialogOpen(true);
    }
  };

  const handleConfirmBlacklist = () => {
    if (!blacklistReason || !blacklistCompanyId) {
      toast.error("Please provide a reason for blacklisting");
      return;
    }
    
    setCompanies(companies.map(c => 
      c.id === blacklistCompanyId ? { ...c, blacklisted: true } : c
    ));
    
    const company = companies.find(c => c.id === blacklistCompanyId);
    if (company) {
      toast.success(`${company.name} added to blacklist`);
    }
    
    setIsBlacklistDialogOpen(false);
    setBlacklistCompanyId(null);
    setBlacklistReason("");
  };

  return (
    <DashboardLayout 
      sidebar={<ScadSidebar />} 
      pageTitle="Companies"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              Company Management
              <Building className="ml-2 h-5 w-5 text-primary" />
            </h2>
            <p className="text-gray-500">
              Manage internship companies and maintain blacklist
            </p>
          </div>
          
          <Dialog open={isAddCompanyDialogOpen} onOpenChange={setIsAddCompanyDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Company
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Company</DialogTitle>
                <DialogDescription>
                  Enter the details of the new company to add to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name*
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location*
                  </Label>
                  <Input
                    id="location"
                    className="col-span-3"
                    value={newCompanyLocation}
                    onChange={(e) => setNewCompanyLocation(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCompanyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCompany}>Add Company</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <CardTitle>All Companies</CardTitle>
              
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search companies..."
                    className="pl-8 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowBlacklisted(!showBlacklisted)}
                  className={!showBlacklisted ? "bg-gray-100" : ""}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {showBlacklisted ? "Hide Blacklisted" : "Show Blacklisted"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Active Interns</TableHead>
                  <TableHead>Total Interns</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company) => (
                  <TableRow key={company.id} className={company.blacklisted ? "bg-red-50" : ""}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-gray-500 mr-2" />
                        {company.name}
                      </div>
                      {company.website && (
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <Globe className="h-3 w-3 mr-1" />
                          {company.website}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                        {company.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      {company.contactPerson && (
                        <div className="text-sm flex items-center">
                          <User className="h-3 w-3 mr-1 text-gray-500" />
                          {company.contactPerson}
                        </div>
                      )}
                      {company.phone && (
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <Phone className="h-3 w-3 mr-1" />
                          {company.phone}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{company.activeInterns}</TableCell>
                    <TableCell>{company.totalInterns}</TableCell>
                    <TableCell>
                      {company.blacklisted ? (
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">
                          <ShieldAlert className="h-3 w-3 mr-1" />
                          Blacklisted
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                          Approved
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant={company.blacklisted ? "outline" : "ghost"}
                        size="sm"
                        className={company.blacklisted ? "text-green-600 hover:text-green-700" : "text-red-600 hover:text-red-700"}
                        onClick={() => handleToggleBlacklist(company.id)}
                      >
                        {company.blacklisted ? "Unblacklist" : "Blacklist"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Dialog open={isBlacklistDialogOpen} onOpenChange={setIsBlacklistDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Blacklist Company</DialogTitle>
              <DialogDescription>
                Please provide a reason for blacklisting this company. This information will be stored for future reference.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="reason" className="text-sm font-medium">
                Reason for Blacklisting
              </Label>
              <Textarea
                id="reason"
                placeholder="Enter detailed reason for blacklisting..."
                value={blacklistReason}
                onChange={(e) => setBlacklistReason(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsBlacklistDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmBlacklist}>
                Confirm Blacklist
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-lg text-red-800 flex items-center">
              <ShieldAlert className="h-5 w-5 text-red-600 mr-2" />
              Blacklisted Companies
            </CardTitle>
            <CardDescription className="text-red-700">
              Companies on this list have violated internship policies or provided 
              inadequate learning experiences. Students cannot submit internships from these companies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {companies.filter(c => c.blacklisted).map((company) => (
                <div 
                  key={company.id} 
                  className="flex justify-between items-center p-3 bg-white rounded-md border border-red-200"
                >
                  <div>
                    <p className="font-medium">{company.name}</p>
                    <p className="text-sm text-gray-500">{company.location}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-600 hover:text-green-700"
                    onClick={() => handleToggleBlacklist(company.id)}
                  >
                    Remove from Blacklist
                  </Button>
                </div>
              ))}
              {companies.filter(c => c.blacklisted).length === 0 && (
                <p className="text-center text-gray-500 py-4">No companies are currently blacklisted</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Companies;


import DashboardLayout from "@/components/layouts/DashboardLayout";
import StudentSidebar from "@/components/navigation/StudentSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  FileText,
  Clock,
  Download,
  History as HistoryIcon,
  Calendar,
  ChevronRight
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Sample data for submission history
const submissionHistory = [
  {
    year: "2025",
    submissions: [
      {
        id: "INT-2025-102",
        company: "Oracle Egypt",
        position: "Software Engineering Intern",
        submissionDate: "January 10, 2025",
        cycle: "Winter 2025",
        status: "pending",
        documents: [
          { name: "Evaluation Form", type: "pdf" },
          { name: "Company Certificate", type: "pdf" }
        ],
        timeline: [
          { 
            date: "January 10, 2025", 
            event: "Submission Created", 
            details: "Initial submission of internship documents" 
          },
          { 
            date: "January 12, 2025", 
            event: "SCAD Processing", 
            details: "Documents received and under review by SCAD" 
          }
        ]
      }
    ]
  },
  {
    year: "2024",
    submissions: [
      {
        id: "INT-2024-089",
        company: "IBM Egypt",
        position: "Front-end Developer Intern",
        submissionDate: "August 15, 2024",
        cycle: "Summer 2024",
        status: "approved",
        documents: [
          { name: "Evaluation Form", type: "pdf" },
          { name: "Company Certificate", type: "pdf" },
          { name: "Project Report", type: "docx" }
        ],
        timeline: [
          { 
            date: "August 15, 2024", 
            event: "Submission Created", 
            details: "Initial submission of internship documents" 
          },
          { 
            date: "August 20, 2024", 
            event: "SCAD Processing", 
            details: "Documents received and under review by SCAD" 
          },
          { 
            date: "August 25, 2024", 
            event: "Faculty Review", 
            details: "Documents forwarded to faculty for academic assessment" 
          },
          { 
            date: "September 5, 2024", 
            event: "Approved", 
            details: "Internship approved by faculty reviewer" 
          }
        ]
      },
      {
        id: "INT-2024-056",
        company: "Tech Solutions Ltd",
        position: "QA Testing Intern",
        submissionDate: "March 20, 2024",
        cycle: "Spring 2024",
        status: "rejected",
        documents: [
          { name: "Evaluation Form", type: "pdf" },
          { name: "Company Certificate", type: "pdf" }
        ],
        timeline: [
          { 
            date: "March 20, 2024", 
            event: "Submission Created", 
            details: "Initial submission of internship documents" 
          },
          { 
            date: "March 25, 2024", 
            event: "SCAD Processing", 
            details: "Documents received and under review by SCAD" 
          },
          { 
            date: "April 2, 2024", 
            event: "Faculty Review", 
            details: "Documents forwarded to faculty for academic assessment" 
          },
          { 
            date: "April 10, 2024", 
            event: "Rejected", 
            details: "Internship rejected due to unrelated tasks to field of study" 
          }
        ]
      }
    ]
  },
  {
    year: "2023",
    submissions: [
      {
        id: "INT-2023-128",
        company: "Vodafone Egypt",
        position: "Software Development Intern",
        submissionDate: "June 10, 2023",
        cycle: "Summer 2023",
        status: "approved",
        documents: [
          { name: "Evaluation Form", type: "pdf" },
          { name: "Company Certificate", type: "pdf" },
          { name: "Project Report", type: "docx" }
        ],
        timeline: [
          { 
            date: "June 10, 2023", 
            event: "Submission Created", 
            details: "Initial submission of internship documents" 
          },
          { 
            date: "June 15, 2023", 
            event: "SCAD Processing", 
            details: "Documents received and under review by SCAD" 
          },
          { 
            date: "June 22, 2023", 
            event: "Faculty Review", 
            details: "Documents forwarded to faculty for academic assessment" 
          },
          { 
            date: "June 30, 2023", 
            event: "Approved", 
            details: "Internship approved by faculty reviewer" 
          }
        ]
      }
    ]
  }
];

const History = () => {
  // Function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case "flagged":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-300">
            <AlertCircle className="h-3 w-3 mr-1" />
            Flagged
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <DashboardLayout 
      sidebar={<StudentSidebar />}
      pageTitle="Submission History"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <HistoryIcon className="mr-2 h-6 w-6 text-gray-500" />
              Internship Submission History
            </h2>
            <p className="text-gray-500">
              View a chronological record of all your internship submissions
            </p>
          </div>
        </div>
        
        <div className="space-y-8">
          {submissionHistory.map((yearData) => (
            <div key={yearData.year} className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-lg font-medium">{yearData.year}</h3>
              </div>
              
              <div className="space-y-4">
                {yearData.submissions.map((submission) => (
                  <Card key={submission.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          {submission.company}
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-base font-normal text-gray-600">
                            {submission.position}
                          </span>
                        </CardTitle>
                        {renderStatusBadge(submission.status)}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-gray-500">Submission ID</p>
                          <p className="font-medium">{submission.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date Submitted</p>
                          <p className="font-medium">{submission.submissionDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Submission Cycle</p>
                          <p className="font-medium">{submission.cycle}</p>
                        </div>
                      </div>
                      
                      <Accordion type="single" collapsible className="border rounded-md">
                        <AccordionItem value="documents">
                          <AccordionTrigger className="px-4 py-3 hover:no-underline">
                            <span className="font-medium">Documents</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-3 pt-0">
                            <div className="space-y-2">
                              {submission.documents.map((doc, idx) => (
                                <div key={idx} className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                    <span>{doc.name}</span>
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="timeline">
                          <AccordionTrigger className="px-4 py-3 hover:no-underline">
                            <span className="font-medium">Submission Timeline</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-3 pt-0">
                            <ol className="relative border-l border-gray-200 ml-3 space-y-4">
                              {submission.timeline.map((event, idx) => (
                                <li key={idx} className="ml-6">
                                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                                    {idx === submission.timeline.length - 1 && submission.status === "approved" ? (
                                      <CheckCircle className="w-3 h-3 text-blue-800" />
                                    ) : idx === submission.timeline.length - 1 && submission.status === "rejected" ? (
                                      <XCircle className="w-3 h-3 text-red-800" />
                                    ) : (
                                      <Clock className="w-3 h-3 text-blue-800" />
                                    )}
                                  </span>
                                  <h4 className="font-medium">{event.event}</h4>
                                  <time className="block mb-1 text-xs font-normal leading-none text-gray-500">
                                    {event.date}
                                  </time>
                                  <p className="text-sm text-gray-600">
                                    {event.details}
                                  </p>
                                </li>
                              ))}
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View Full Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-start">
              <HistoryIcon className="h-5 w-5 text-gray-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-800">Your Internship Journey</p>
                <p className="text-xs text-gray-600 mt-1">
                  This page shows your complete internship history. Each entry includes the submission details,
                  timeline of events, and final outcome. You can download documents and view the detailed evaluation
                  for each submission.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default History;

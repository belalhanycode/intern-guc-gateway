
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";

// Authentication
import Login from "./pages/Login";

// Student
import StudentDashboard from "./pages/student/Dashboard";
import InternshipSubmission from "./pages/student/InternshipSubmission";
import Assessments from "./pages/student/Assessments";
import Status from "./pages/student/Status";
import Messages from "./pages/student/Messages";
import History from "./pages/student/History";
import CareerGuidance from "./pages/student/CareerGuidance";
import Workshops from "./pages/student/Workshops";
import InternshipListings from "./pages/student/InternshipListings";

// SCAD
import ScadDashboard from "./pages/scad/Dashboard";
import SubmissionCycles from "./pages/scad/SubmissionCycles";
import Submissions from "./pages/scad/Submissions";
import Students from "./pages/scad/Students";
import Companies from "./pages/scad/Companies";
import { default as ScadMessages } from "./pages/scad/Messages";
import Analytics from "./pages/scad/Analytics";
import FacultyAssignment from "./pages/scad/FacultyAssignment";

// Faculty
import PendingReviews from "./pages/faculty/PendingReviews";
import ApprovedInternships from "./pages/faculty/ApprovedInternships";
import RejectedInternships from "./pages/faculty/RejectedInternships";
import FacultyMessages from "./pages/faculty/Messages";

// Company
import CompanyRegister from "./pages/company/Register";
import CompanyDashboard from "./pages/company/Dashboard";
import CreateJob from "./pages/company/CreateJob";
import CompanyInternships from "./pages/company/Internships";
import CompanyApplications from "./pages/company/Applications";
import CompanyInterns from "./pages/company/Interns";
import CompanyEvaluations from "./pages/company/Evaluations";
import CompanyMessages from "./pages/company/Messages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect from home to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/company/register" element={<CompanyRegister />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/submission" element={<InternshipSubmission />} />
          <Route path="/student/status" element={<Status />} />
          <Route path="/student/messages" element={<Messages />} />
          <Route path="/student/history" element={<History />} />
          <Route path="/student/assessments" element={<Assessments />} />
          <Route path="/student/career-guidance" element={<CareerGuidance />} />
          <Route path="/student/workshops" element={<Workshops />} />
          <Route path="/student/internships" element={<InternshipListings />} />
          
          {/* SCAD Routes */}
          <Route path="/scad" element={<ScadDashboard />} />
          <Route path="/scad/cycles" element={<SubmissionCycles />} />
          <Route path="/scad/submissions" element={<Submissions />} />
          <Route path="/scad/students" element={<Students />} />
          <Route path="/scad/companies" element={<Companies />} />
          <Route path="/scad/faculty-assignment" element={<FacultyAssignment />} />
          <Route path="/scad/analytics" element={<Analytics />} />
          <Route path="/scad/messages" element={<ScadMessages />} />
          
          {/* Faculty Routes */}
          <Route path="/faculty" element={<Navigate to="/faculty/pending" replace />} />
          <Route path="/faculty/pending" element={<PendingReviews />} />
          <Route path="/faculty/approved" element={<ApprovedInternships />} />
          <Route path="/faculty/rejected" element={<RejectedInternships />} />
          <Route path="/faculty/messages" element={<FacultyMessages />} />
          
          {/* Company Routes */}
          <Route path="/company" element={<CompanyDashboard />} />
          <Route path="/company/create-job" element={<CreateJob />} />
          <Route path="/company/internships" element={<CompanyInternships />} />
          <Route path="/company/applications" element={<CompanyApplications />} />
          <Route path="/company/interns" element={<CompanyInterns />} />
          <Route path="/company/evaluations" element={<CompanyEvaluations />} />
          <Route path="/company/messages" element={<CompanyMessages />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


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

// SCAD
import ScadDashboard from "./pages/scad/Dashboard";
import SubmissionCycles from "./pages/scad/SubmissionCycles";

// Faculty
import PendingReviews from "./pages/faculty/PendingReviews";

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
          
          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/submission" element={<InternshipSubmission />} />
          <Route path="/student/assessments" element={<Assessments />} />
          
          {/* SCAD Routes */}
          <Route path="/scad" element={<ScadDashboard />} />
          <Route path="/scad/cycles" element={<SubmissionCycles />} />
          
          {/* Faculty Routes */}
          <Route path="/faculty" element={<Navigate to="/faculty/pending" replace />} />
          <Route path="/faculty/pending" element={<PendingReviews />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

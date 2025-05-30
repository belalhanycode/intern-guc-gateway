
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  CheckSquare, 
  ClockIcon, 
  MessageSquare,
  BookOpen,
  Award,
  Calendar,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

const StudentSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      icon: <Home size={18} />,
      path: "/student",
    },
    {
      title: "Internship Listings",
      icon: <Briefcase size={18} />,
      path: "/student/internships",
    },
    {
      title: "Submit Internship",
      icon: <FileText size={18} />,
      path: "/student/submission",
    },
    {
      title: "Submission Status",
      icon: <CheckSquare size={18} />,
      path: "/student/status",
    },
    {
      title: "History",
      icon: <ClockIcon size={18} />,
      path: "/student/history",
    },
    {
      title: "Assessments",
      icon: <Award size={18} />,
      path: "/student/assessments",
    },
    {
      title: "Career Guidance",
      icon: <BookOpen size={18} />,
      path: "/student/career-guidance",
    },
    {
      title: "Workshops",
      icon: <Calendar size={18} />,
      path: "/student/workshops",
    },
    {
      title: "Messages",
      icon: <MessageSquare size={18} />,
      path: "/student/messages",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="space-y-1 px-2">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={isActive(item.path) ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              isActive(item.path)
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
            onClick={() => navigate(item.path)}
          >
            <span className="mr-2">{item.icon}</span>
            <span>{item.title}</span>
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default StudentSidebar;

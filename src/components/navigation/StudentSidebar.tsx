
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  GraduationCap,
  CalendarRange,
  Award,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";

const StudentSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      icon: <FileText size={18} />,
      path: "/student",
    },
    {
      title: "Submission",
      icon: <CheckCircle size={18} />,
      path: "/student/submission",
    },
    {
      title: "Status",
      icon: <Clock size={18} />,
      path: "/student/status",
    },
    {
      title: "Messages",
      icon: <MessageSquare size={18} />,
      path: "/student/messages",
    },
    {
      title: "Submission History",
      icon: <History size={18} />,
      path: "/student/history",
    },
  ];

  // PRO Services Section
  const proServices = [
    {
      title: "Career Guidance",
      icon: <GraduationCap size={18} />,
      path: "/student/career-guidance",
    },
    {
      title: "Workshops",
      icon: <CalendarRange size={18} />,
      path: "/student/workshops",
    },
    {
      title: "Assessments",
      icon: <Award size={18} />,
      path: "/student/assessments",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="space-y-6 px-2">
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

      <div className="px-3 py-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground">
          PRO Services
        </h3>
      </div>
      
      <nav className="space-y-1">
        {proServices.map((item) => (
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

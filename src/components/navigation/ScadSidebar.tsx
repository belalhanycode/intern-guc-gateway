
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  Users, 
  Building,
  Calendar,
  FileText,
  BarChart,
  MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const ScadSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/scad",
    },
    {
      title: "Submissions",
      icon: <ClipboardCheck size={18} />,
      path: "/scad/submissions",
    },
    {
      title: "Students",
      icon: <Users size={18} />,
      path: "/scad/students",
    },
    {
      title: "Companies",
      icon: <Building size={18} />,
      path: "/scad/companies",
    },
    {
      title: "Submission Cycles",
      icon: <Calendar size={18} />,
      path: "/scad/cycles",
    },
    {
      title: "Faculty Assignment",
      icon: <FileText size={18} />,
      path: "/scad/faculty-assignment",
    },
    {
      title: "Analytics",
      icon: <BarChart size={18} />,
      path: "/scad/analytics",
    },
    {
      title: "Messages",
      icon: <MessageCircle size={18} />,
      path: "/scad/messages",
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

export default ScadSidebar;

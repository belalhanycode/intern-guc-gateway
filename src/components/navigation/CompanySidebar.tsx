
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Users, 
  FileText, 
  MessageCircle,
  ClipboardList,
  Star,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const CompanySidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      icon: <Briefcase size={18} />,
      path: "/company",
    },
    {
      title: "My Internships",
      icon: <ClipboardList size={18} />,
      path: "/company/internships",
    },
    {
      title: "Create Job Post",
      icon: <Plus size={18} />,
      path: "/company/create-job",
    },
    {
      title: "Applications",
      icon: <FileText size={18} />,
      path: "/company/applications",
    },
    {
      title: "Current Interns",
      icon: <Users size={18} />,
      path: "/company/interns",
    },
    {
      title: "Evaluations",
      icon: <Star size={18} />,
      path: "/company/evaluations",
    },
    {
      title: "Messages",
      icon: <MessageCircle size={18} />,
      path: "/company/messages",
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

export default CompanySidebar;


import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  CheckSquare, 
  XSquare, 
  Flag,
  MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const FacultySidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      icon: <ClipboardList size={18} />,
      path: "/faculty",
    },
    {
      title: "Pending Reviews",
      icon: <Flag size={18} />,
      path: "/faculty/pending",
    },
    {
      title: "Approved Internships",
      icon: <CheckSquare size={18} />,
      path: "/faculty/approved",
    },
    {
      title: "Rejected Internships",
      icon: <XSquare size={18} />,
      path: "/faculty/rejected",
    },
    {
      title: "Messages",
      icon: <MessageCircle size={18} />,
      path: "/faculty/messages",
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

export default FacultySidebar;

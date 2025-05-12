
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseLayout from "./BaseLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  ChevronDown, 
  Menu, 
  MessageSquare, 
  LogOut,
  User,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  pageTitle: string;
}

const DashboardLayout = ({ children, sidebar, pageTitle }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // In a real app, handle logout logic
    navigate("/login");
  };

  return (
    <BaseLayout>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={cn(
            "bg-sidebar transition-all duration-300 ease-in-out",
            sidebarOpen ? "w-64" : "w-0 sm:w-16"
          )}
        >
          <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-md bg-guc-blue flex items-center justify-center text-white font-bold">
                  GUC
                </div>
                <span className="font-semibold text-sidebar-foreground">Internship System</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-sidebar-foreground"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </Button>
          </div>
          <div className="py-4">
            {sidebar}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
            <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageSquare size={20} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground">GS</AvatarFallback>
                    </Avatar>
                    {sidebarOpen && (
                      <div className="flex items-center">
                        <span className="mr-2 text-sm font-medium">GUC Student</span>
                        <ChevronDown size={16} />
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content Scrollable Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </BaseLayout>
  );
};

export default DashboardLayout;


import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Calendar, Heart, Pill, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export const AppLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Heart,
    },
    {
      title: "Medications",
      url: "/medications",
      icon: Pill,
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: Calendar,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
  ];
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="py-6">
            <div className="flex items-center px-4">
              <Pill className="h-6 w-6 text-med-blue-500" />
              <span className="ml-2 font-semibold text-lg">DoseWise</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link 
                          to={item.url}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                            isActivePath(item.url) 
                              ? "bg-med-blue-50 text-med-blue-700" 
                              : "hover:bg-gray-100"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            {user && (
              <div className="space-y-2">
                <p className="text-sm font-medium truncate">{user.name || user.email}</p>
                <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                  Sign Out
                </Button>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1">
          <header className="h-14 border-b flex items-center px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold ml-4">
              {menuItems.find(item => isActivePath(item.url))?.title || "DoseWise"}
            </h1>
          </header>
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

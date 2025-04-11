
import React from "react";
import Navbar from "./Navbar";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Dumbbell, 
  Utensils, 
  LineChart, 
  Users, 
  Settings, 
  LogOut 
} from "lucide-react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, logout } = useAuth();
  const { theme } = useTheme();

  const menuItems = [
    { title: "Home", path: "/", icon: Home },
    { title: "Workouts", path: "/workouts", icon: Dumbbell },
    { title: "Nutrition", path: "/nutrition", icon: Utensils },
    { title: "Progress", path: "/progress", icon: LineChart },
    { title: "Community", path: "/community", icon: Users },
    { title: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {currentUser && (
          <Sidebar variant="sidebar">
            <SidebarHeader className="flex items-center justify-center p-4">
              <h1 className="text-xl font-bold text-primary">FitGenius</h1>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton 
                          asChild 
                          tooltip={item.title}
                          isActive={window.location.pathname === item.path}
                        >
                          <NavLink to={item.path} className="w-full">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4">
              <div className="text-sm text-muted-foreground">
                Logged in as: {currentUser?.email}
              </div>
            </SidebarFooter>
          </Sidebar>
        )}
        <div className="flex flex-col w-full min-h-screen">
          {currentUser && <Navbar />}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

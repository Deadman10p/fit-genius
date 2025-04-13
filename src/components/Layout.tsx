
import React from "react";
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
import { NavLink, useNavigate } from "react-router-dom";
import { 
  Home, 
  Dumbbell, 
  Utensils, 
  LineChart, 
  Users, 
  Settings, 
  LogOut,
  User,
  Moon,
  Sun 
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useOnboarding } from "@/contexts/OnboardingContext";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { onboardingData } = useOnboarding();
  const navigate = useNavigate();

  const menuItems = [
    { title: "Home", path: "/", icon: Home },
    { title: "Workouts", path: "/workouts", icon: Dumbbell },
    { title: "Nutrition", path: "/nutrition", icon: Utensils },
    { title: "Progress", path: "/progress", icon: LineChart },
    { title: "Community", path: "/community", icon: Users },
    { title: "Settings", path: "/settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

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
              
              <SidebarGroup>
                <SidebarGroupLabel>Account</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        asChild 
                        tooltip="Profile"
                        isActive={window.location.pathname === "/profile"}
                      >
                        <NavLink to="/profile" className="w-full">
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
                
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser?.photoURL || ""} alt={onboardingData?.name || "User"} />
                    <AvatarFallback className="text-xs">
                      {onboardingData?.name ? onboardingData.name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-xs text-muted-foreground truncate max-w-[120px]">
                    {currentUser?.email}
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2" 
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </SidebarFooter>
          </Sidebar>
        )}
        <div className="flex flex-col w-full min-h-screen">
          <div className="sticky top-0 z-20 flex items-center justify-end px-4 py-2 bg-background border-b">
            {currentUser && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}
          </div>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};


import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  User, 
  Dumbbell, 
  Utensils, 
  LineChart, 
  Settings, 
  Users, 
  MapPin,
  LogOut, 
  Moon, 
  Sun,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Layout({ children }: { children: React.ReactNode }) {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Workouts', path: '/workouts', icon: Dumbbell },
    { name: 'Nutrition', path: '/nutrition', icon: Utensils },
    { name: 'Progress', path: '/progress', icon: LineChart },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Gym Locator', path: '/gym-locator', icon: MapPin },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-card border-r border-border transition-all duration-300 flex flex-col",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-primary">FitGenius</h1>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleSidebar}
            className={cn(
              "p-2",
              isCollapsed && "mx-auto"
            )}
          >
            {isCollapsed ? "→" : "←"}
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto pt-4">
          <ul className="space-y-2 px-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <li key={item.name}>
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          size={isCollapsed ? "icon" : "default"}
                          className={cn(
                            "w-full justify-start",
                            isActive && "font-semibold"
                          )}
                          onClick={() => navigate(item.path)}
                        >
                          <Icon className={cn(
                            "mr-2 h-5 w-5",
                            isCollapsed && "mr-0"
                          )} />
                          {!isCollapsed && <span>{item.name}</span>}
                        </Button>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          {item.name}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex flex-col space-y-2">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size={isCollapsed ? "icon" : "default"}
                    onClick={toggleTheme}
                    className="w-full justify-start"
                  >
                    {theme === "dark" ? (
                      <Sun className={cn(
                        "mr-2 h-5 w-5",
                        isCollapsed && "mr-0"
                      )} />
                    ) : (
                      <Moon className={cn(
                        "mr-2 h-5 w-5",
                        isCollapsed && "mr-0"
                      )} />
                    )}
                    {!isCollapsed && <span>Toggle Theme</span>}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    Toggle Theme
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size={isCollapsed ? "icon" : "default"}
                    onClick={handleSignOut}
                    className="w-full justify-start"
                  >
                    <LogOut className={cn(
                      "mr-2 h-5 w-5",
                      isCollapsed && "mr-0"
                    )} />
                    {!isCollapsed && <span>Sign Out</span>}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    Sign Out
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

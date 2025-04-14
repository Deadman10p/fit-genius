
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  // Only show on home page
  if (location.pathname !== '/') {
    return null;
  }

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="bg-background shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary">FitGenius</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="mr-2"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        
        {currentUser ? (
          <Button variant="ghost" onClick={handleProfile} className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span className="hidden md:inline">Profile</span>
          </Button>
        ) : (
          <Button onClick={handleSignIn}>Sign In</Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

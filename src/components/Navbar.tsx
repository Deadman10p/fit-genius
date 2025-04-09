
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-poppins font-bold text-2xl gold-gradient bg-clip-text text-transparent">
                FitGenius
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/workouts" className="text-gray-700 hover:text-gold transition-colors">
              Workouts
            </Link>
            <Link to="/nutrition" className="text-gray-700 hover:text-gold transition-colors">
              Nutrition
            </Link>
            <Link to="/progress" className="text-gray-700 hover:text-gold transition-colors">
              Progress
            </Link>
            <Link to="/community" className="text-gray-700 hover:text-gold transition-colors">
              Community
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-sm font-normal opacity-70">{currentUser.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pb-3 px-4 animate-fade-in-up">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/workouts" 
              className="text-gray-700 hover:text-gold transition-colors py-2 border-b"
              onClick={() => setMobileMenuOpen(false)}
            >
              Workouts
            </Link>
            <Link 
              to="/nutrition" 
              className="text-gray-700 hover:text-gold transition-colors py-2 border-b"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nutrition
            </Link>
            <Link 
              to="/progress" 
              className="text-gray-700 hover:text-gold transition-colors py-2 border-b"
              onClick={() => setMobileMenuOpen(false)}
            >
              Progress
            </Link>
            <Link 
              to="/community" 
              className="text-gray-700 hover:text-gold transition-colors py-2 border-b"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link>
            {!currentUser && (
              <Link 
                to="/login" 
                className="text-gold hover:text-gold-dark transition-colors py-2 border-b"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
            {currentUser && (
              <button 
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="text-red-500 hover:text-red-700 transition-colors py-2 border-b text-left"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

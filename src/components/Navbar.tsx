
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <nav className="bg-background shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary">FitGenius</h1>
      </div>
      <div>
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

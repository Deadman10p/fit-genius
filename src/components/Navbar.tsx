import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="hidden">
      {/* This component is no longer in use */}
    </nav>
  );
};

export default Navbar;

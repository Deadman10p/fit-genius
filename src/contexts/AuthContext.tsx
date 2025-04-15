import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  firebaseSignOut,
  onAuthStateChanged,
  updateUserPassword
} from '@/config/firebase';
import { User } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Setting up auth state listener");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user ? "User logged in" : "No user");
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in with:", email);
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Sign in successful");
      toast({
        title: "Signed in successfully",
        description: "Welcome back to FitGenius!",
      });
    } catch (error: any) {
      console.error("Sign in error:", error);
      let errorMessage = "Failed to sign in. Please check your credentials.";
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many attempts. Please try again later";
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = "Network error. Please check your connection";
      } else if (error.code === 'auth/configuration-not-found') {
        errorMessage = "Authentication service configuration error. Please try again later";
        console.error("Firebase configuration error. Please check your Firebase setup");
      }
      
      toast({
        title: "Sign in failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log("Attempting sign up with:", email);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Sign up successful");
      toast({
        title: "Account created successfully",
        description: "Welcome to FitGenius!",
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      let errorMessage = "Failed to create account";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Email already in use";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak";
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = "Network error. Please check your connection";
      } else if (error.code === 'auth/configuration-not-found') {
        errorMessage = "Authentication service configuration error. Please try again later";
        console.error("Firebase configuration error. Please check your Firebase setup");
      }
      
      toast({
        title: "Sign up failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("Attempting to sign out");
      await firebaseSignOut(auth);
      console.log("Sign out successful");
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign out failed",
        description: error.message || "Failed to sign out",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const dummyCurrentPassword = "current-password";
      await updateUserPassword(dummyCurrentPassword, newPassword);
      
      toast({
        title: "Password updated successfully",
        description: "Your password has been changed",
      });
      
      return;
    } catch (error: any) {
      console.error("Failed to update password:", error);
      
      toast({
        title: "Password update failed",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
      
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    signOut,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

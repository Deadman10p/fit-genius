
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { app } from '@/config/firebase';
import { useToast } from '@/hooks/use-toast';

type OnboardingData = {
  name: string;
  age: string;
  height: string;
  weight: string;
  heightUnit: 'cm' | 'in';
  weightUnit: 'kg' | 'lbs';
  workoutDuration: string;
  workoutDaysPerWeek: string;
  allergies: string;
  bmi: number | null;
  completed: boolean;
};

interface OnboardingContextType {
  onboardingData: OnboardingData;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  saveOnboardingData: () => Promise<void>;
  isLoading: boolean;
}

const defaultOnboardingData: OnboardingData = {
  name: '',
  age: '',
  height: '',
  weight: '',
  heightUnit: 'cm',
  weightUnit: 'kg',
  workoutDuration: '',
  workoutDaysPerWeek: '',
  allergies: '',
  bmi: null,
  completed: false,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(defaultOnboardingData);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  const db = getFirestore(app);
  const { toast } = useToast();

  // Load onboarding data from Firebase when user logs in
  useEffect(() => {
    const loadOnboardingData = async () => {
      if (!currentUser) {
        setOnboardingData(defaultOnboardingData);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData?.onboarding) {
            setOnboardingData({
              ...defaultOnboardingData,
              ...userData.onboarding,
            });
          }
        }
      } catch (error) {
        console.error("Error loading onboarding data:", error);
        toast({
          title: "Error",
          description: "Could not load your profile data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadOnboardingData();
  }, [currentUser, db, toast]);

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const saveOnboardingData = async () => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to save your profile",
        variant: "destructive",
      });
      return Promise.reject(new Error("Not logged in"));
    }

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      // Use merge: true to only update the onboarding field without overwriting other data
      await setDoc(userDocRef, {
        onboarding: {
          ...onboardingData,
          completed: true,
        },
      }, { merge: true });
      
      // Update local state to reflect the completed status
      setOnboardingData(prev => ({
        ...prev,
        completed: true
      }));
      
      toast({
        title: "Success",
        description: "Your profile has been saved successfully!",
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      toast({
        title: "Error",
        description: "Failed to save your profile data. Please try again.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  return (
    <OnboardingContext.Provider value={{ 
      onboardingData, 
      updateOnboardingData, 
      saveOnboardingData,
      isLoading 
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

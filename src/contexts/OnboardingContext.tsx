
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { firebase } from '@/config/firebase';

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

  // Load onboarding data from Firebase when user logs in
  useEffect(() => {
    const loadOnboardingData = async () => {
      if (!currentUser) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const db = firebase.firestore();
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        
        if (userDoc.exists) {
          const userData = userDoc.data();
          if (userData?.onboarding) {
            setOnboardingData({
              ...defaultOnboardingData,
              ...userData.onboarding,
            });
          }
        }
      } catch (error) {
        console.error("Error loading onboarding data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOnboardingData();
  }, [currentUser]);

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const saveOnboardingData = async () => {
    if (!currentUser) return;

    try {
      const db = firebase.firestore();
      await db.collection('users').doc(currentUser.uid).set({
        onboarding: onboardingData,
      }, { merge: true });
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      throw error;
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

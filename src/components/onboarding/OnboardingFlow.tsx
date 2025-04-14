
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import HeightWeightStep from './steps/HeightWeightStep';
import NameAgeStep from './steps/NameAgeStep';
import WorkoutPreferencesStep from './steps/WorkoutPreferencesStep';
import AllergiesStep from './steps/AllergiesStep';
import SummaryStep from './steps/SummaryStep';

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { onboardingData, updateOnboardingData, saveOnboardingData } = useOnboarding();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate total steps
  const totalSteps = 5; // Height/Weight, Name/Age, Workout Preferences, Allergies, Summary

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission
    
    if (currentStep < totalSteps - 1) {
      // Validation for each step
      if (currentStep === 0) {
        if (!onboardingData.height || !onboardingData.weight) {
          toast({
            title: 'Missing information',
            description: 'Please enter your height and weight to continue.',
            variant: 'destructive',
          });
          return;
        }
        // Calculate BMI here before moving to next step
        calculateBMI();
      } else if (currentStep === 1 && !onboardingData.name) {
        toast({
          title: 'Missing information',
          description: 'Please enter your name to continue.',
          variant: 'destructive',
        });
        return;
      } else if (currentStep === 2 && (!onboardingData.workoutDuration || !onboardingData.workoutDaysPerWeek)) {
        toast({
          title: 'Missing information',
          description: 'Please enter your workout preferences to continue.',
          variant: 'destructive',
        });
        return;
      }

      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete(e);
    }
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateBMI = () => {
    try {
      const height = parseFloat(onboardingData.height);
      const weight = parseFloat(onboardingData.weight);

      if (!height || !weight || isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        console.error("Invalid height or weight values:", { height, weight });
        return;
      }

      let heightInMeters: number;
      let weightInKg: number;

      // Convert units if necessary
      if (onboardingData.heightUnit === 'in') {
        heightInMeters = height * 0.0254; // inches to meters
      } else {
        heightInMeters = height / 100; // cm to meters
      }

      if (onboardingData.weightUnit === 'lbs') {
        weightInKg = weight * 0.453592; // pounds to kg
      } else {
        weightInKg = weight;
      }

      // Calculate BMI: weight (kg) / (height (m))^2
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      
      // Check for valid BMI calculation
      if (isNaN(bmi) || !isFinite(bmi) || bmi <= 0) {
        console.error("Invalid BMI calculation:", { heightInMeters, weightInKg, bmi });
        toast({
          title: 'Invalid measurements',
          description: 'Please check your height and weight values.',
          variant: 'destructive',
        });
        return;
      }
      
      console.log("BMI calculated:", bmi, "using height (m):", heightInMeters, "weight (kg):", weightInKg);
      updateOnboardingData({ bmi: parseFloat(bmi.toFixed(1)) });
    } catch (error) {
      console.error("Error in BMI calculation:", error);
      toast({
        title: 'Calculation Error',
        description: 'There was an error calculating your BMI.',
        variant: 'destructive',
      });
    }
  };

  const handleComplete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      // Final validation
      if (!onboardingData.name || !onboardingData.height || !onboardingData.weight) {
        throw new Error("Missing required information");
      }
      
      // Save data to Firebase
      console.log("Saving onboarding data...");
      await saveOnboardingData();
      
      console.log("Onboarding completed successfully");
      toast({
        title: 'Setup completed!',
        description: `Welcome, ${onboardingData.name}! Your preferences have been saved.`,
      });
      
      // Redirect to home
      navigate('/');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast({
        title: 'Error saving your information',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {currentStep === 0 && "Let's get started!"}
            {currentStep === 1 && "Tell us about yourself"}
            {currentStep === 2 && "Your workout preferences"}
            {currentStep === 3 && "Any allergies?"}
            {currentStep === 4 && "Almost done!"}
          </CardTitle>
          <CardDescription className="text-center">
            Step {currentStep + 1} of {totalSteps}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            {currentStep === 0 && <HeightWeightStep />}
            {currentStep === 1 && <NameAgeStep />}
            {currentStep === 2 && <WorkoutPreferencesStep />}
            {currentStep === 3 && <AllergiesStep />}
            {currentStep === 4 && <SummaryStep />}
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={currentStep === 0 || isSubmitting}
            type="button"
          >
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={isSubmitting}
            type="button"
          >
            {isSubmitting ? 'Saving...' : (currentStep < totalSteps - 1 ? 'Next' : 'Complete Setup')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingFlow;

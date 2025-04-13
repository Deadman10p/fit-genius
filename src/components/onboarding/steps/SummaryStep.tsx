
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Card, CardContent } from '@/components/ui/card';

const SummaryStep = () => {
  const { onboardingData } = useOnboarding();

  const getBmiCategory = (bmi: number | null) => {
    if (bmi === null) return 'Not calculated';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obesity';
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <p className="text-muted-foreground">
          Here's a summary of the information you've provided. Please review before completing.
        </p>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-muted-foreground">Name:</div>
          <div className="font-medium">{onboardingData.name}</div>
          
          <div className="text-muted-foreground">Age:</div>
          <div className="font-medium">{onboardingData.age} years</div>
          
          <div className="text-muted-foreground">Height:</div>
          <div className="font-medium">{onboardingData.height} {onboardingData.heightUnit}</div>
          
          <div className="text-muted-foreground">Weight:</div>
          <div className="font-medium">{onboardingData.weight} {onboardingData.weightUnit}</div>
        </div>
        
        <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-muted-foreground">Your BMI:</div>
              <div className="font-medium">{onboardingData.bmi}</div>
              
              <div className="text-muted-foreground">Category:</div>
              <div className="font-medium">{getBmiCategory(onboardingData.bmi)}</div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="text-muted-foreground">Workout Duration:</div>
          <div className="font-medium">{onboardingData.workoutDuration}</div>
          
          <div className="text-muted-foreground">Days per Week:</div>
          <div className="font-medium">{onboardingData.workoutDaysPerWeek} days</div>
          
          <div className="text-muted-foreground">Allergies/Concerns:</div>
          <div className="font-medium">{onboardingData.allergies || 'None'}</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;

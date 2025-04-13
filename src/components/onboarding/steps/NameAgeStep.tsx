
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';

const NameAgeStep = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <p className="text-muted-foreground">
          Tell us a bit about yourself so we can personalize your experience.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">What is your name?</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your first name"
          value={onboardingData.name}
          onChange={(e) => {
            // Extract first word only
            const firstName = e.target.value.split(' ')[0];
            updateOnboardingData({ name: firstName });
          }}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">Only your first name will be used</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="age">How old are you?</Label>
        <Input
          id="age"
          type="number"
          placeholder="Enter your age"
          value={onboardingData.age}
          onChange={(e) => updateOnboardingData({ age: e.target.value })}
          className="w-full"
          min="1"
          max="120"
        />
      </div>
    </div>
  );
};

export default NameAgeStep;

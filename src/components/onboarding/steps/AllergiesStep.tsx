
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useOnboarding } from '@/contexts/OnboardingContext';

const AllergiesStep = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <p className="text-muted-foreground">
          Let us know if you have any allergies or specific health concerns that might affect your fitness routine.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="allergies">Do you have any allergies or health concerns?</Label>
        <Textarea
          id="allergies"
          placeholder="e.g. Knee problems, shellfish allergy, etc."
          value={onboardingData.allergies}
          onChange={(e) => updateOnboardingData({ allergies: e.target.value })}
          className="w-full min-h-[100px]"
        />
        <p className="text-xs text-muted-foreground">This helps us tailor exercise and nutrition recommendations</p>
      </div>
    </div>
  );
};

export default AllergiesStep;

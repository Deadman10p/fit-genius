
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOnboarding } from '@/contexts/OnboardingContext';

const WorkoutPreferencesStep = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <p className="text-muted-foreground">
          Let us know your workout preferences so we can tailor recommendations to you.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="workoutDuration">How long do you usually workout for?</Label>
        <Input
          id="workoutDuration"
          type="text"
          placeholder="e.g. 30 minutes, 1 hour"
          value={onboardingData.workoutDuration}
          onChange={(e) => updateOnboardingData({ workoutDuration: e.target.value })}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="workoutDaysPerWeek">How many days a week do you wish to workout?</Label>
        <Select
          value={onboardingData.workoutDaysPerWeek}
          onValueChange={(value) => updateOnboardingData({ workoutDaysPerWeek: value })}
        >
          <SelectTrigger id="workoutDaysPerWeek" className="w-full">
            <SelectValue placeholder="Select days per week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 day</SelectItem>
            <SelectItem value="2">2 days</SelectItem>
            <SelectItem value="3">3 days</SelectItem>
            <SelectItem value="4">4 days</SelectItem>
            <SelectItem value="5">5 days</SelectItem>
            <SelectItem value="6">6 days</SelectItem>
            <SelectItem value="7">7 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default WorkoutPreferencesStep;

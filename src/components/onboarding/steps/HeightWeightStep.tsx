
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOnboarding } from '@/contexts/OnboardingContext';

const HeightWeightStep = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <p className="text-muted-foreground">
          Let's start by getting your basic measurements to calculate your Body Mass Index (BMI).
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-2 items-end">
        <div className="col-span-2">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            type="number"
            placeholder="Enter your height"
            value={onboardingData.height}
            onChange={(e) => updateOnboardingData({ height: e.target.value })}
            className="w-full"
          />
        </div>
        <div>
          <Select
            value={onboardingData.heightUnit}
            onValueChange={(value) => updateOnboardingData({ heightUnit: value as 'cm' | 'in' })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cm">cm</SelectItem>
              <SelectItem value="in">inches</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 items-end">
        <div className="col-span-2">
          <Label htmlFor="weight">Weight</Label>
          <Input
            id="weight"
            type="number"
            placeholder="Enter your weight"
            value={onboardingData.weight}
            onChange={(e) => updateOnboardingData({ weight: e.target.value })}
            className="w-full"
          />
        </div>
        <div>
          <Select
            value={onboardingData.weightUnit}
            onValueChange={(value) => updateOnboardingData({ weightUnit: value as 'kg' | 'lbs' })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">kg</SelectItem>
              <SelectItem value="lbs">lbs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default HeightWeightStep;

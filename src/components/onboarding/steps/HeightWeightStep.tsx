
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOnboarding } from '@/contexts/OnboardingContext';

const HeightWeightStep = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();

  // Ensure default values are set
  React.useEffect(() => {
    if (!onboardingData.heightUnit) {
      updateOnboardingData({ heightUnit: 'cm' });
    }
    if (!onboardingData.weightUnit) {
      updateOnboardingData({ weightUnit: 'kg' });
    }
  }, [onboardingData.heightUnit, onboardingData.weightUnit, updateOnboardingData]);

  // Handle unit conversion when switching units
  const handleHeightUnitChange = (value: string) => {
    const newUnit = value as 'cm' | 'in';
    
    if (onboardingData.height && onboardingData.heightUnit !== newUnit) {
      let convertedHeight;
      if (newUnit === 'cm' && onboardingData.heightUnit === 'in') {
        // Convert inches to cm
        convertedHeight = (parseFloat(onboardingData.height) * 2.54).toFixed(1);
      } else if (newUnit === 'in' && onboardingData.heightUnit === 'cm') {
        // Convert cm to inches
        convertedHeight = (parseFloat(onboardingData.height) / 2.54).toFixed(1);
      }
      
      if (convertedHeight) {
        updateOnboardingData({ 
          height: convertedHeight,
          heightUnit: newUnit 
        });
      } else {
        updateOnboardingData({ heightUnit: newUnit });
      }
    } else {
      updateOnboardingData({ heightUnit: newUnit });
    }
  };

  const handleWeightUnitChange = (value: string) => {
    const newUnit = value as 'kg' | 'lbs';
    
    if (onboardingData.weight && onboardingData.weightUnit !== newUnit) {
      let convertedWeight;
      if (newUnit === 'kg' && onboardingData.weightUnit === 'lbs') {
        // Convert lbs to kg
        convertedWeight = (parseFloat(onboardingData.weight) * 0.453592).toFixed(1);
      } else if (newUnit === 'lbs' && onboardingData.weightUnit === 'kg') {
        // Convert kg to lbs
        convertedWeight = (parseFloat(onboardingData.weight) / 0.453592).toFixed(1);
      }
      
      if (convertedWeight) {
        updateOnboardingData({ 
          weight: convertedWeight,
          weightUnit: newUnit 
        });
      } else {
        updateOnboardingData({ weightUnit: newUnit });
      }
    } else {
      updateOnboardingData({ weightUnit: newUnit });
    }
  };

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
            value={onboardingData.heightUnit || 'cm'}
            onValueChange={handleHeightUnitChange}
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
            value={onboardingData.weightUnit || 'kg'}
            onValueChange={handleWeightUnitChange}
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

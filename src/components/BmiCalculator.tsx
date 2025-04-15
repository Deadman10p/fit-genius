
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertCircle, Check } from 'lucide-react';
import BmiWorkoutRecommendations from './BmiWorkoutRecommendations';
import { WorkoutCategory } from '@/utils/bmiWorkoutRecommendations';

const BmiCalculator = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [fitnessGoal, setFitnessGoal] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<WorkoutCategory | ''>('');
  const [fitnessLevel, setFitnessLevel] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'in'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [showRecommendations, setShowRecommendations] = useState<boolean>(false);

  const calculateBmi = () => {
    if (!height || !weight || !age || !gender || !fitnessGoal) {
      // Handle validation
      return;
    }

    // Convert height to meters based on unit
    let heightInMeters: number;
    if (heightUnit === 'cm') {
      heightInMeters = parseFloat(height) / 100;
    } else { // inches
      heightInMeters = parseFloat(height) * 0.0254;
    }

    // Convert weight to kg based on unit
    let weightInKg: number;
    if (weightUnit === 'kg') {
      weightInKg = parseFloat(weight);
    } else { // pounds
      weightInKg = parseFloat(weight) * 0.453592;
    }
    
    // Calculate BMI
    const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
    
    // Handle calculation errors or extreme values
    if (isNaN(calculatedBmi) || !isFinite(calculatedBmi) || calculatedBmi <= 0) {
      setBmi(null);
      setBmiCategory('');
      setFitnessLevel('');
      setShowRecommendations(false);
      return;
    }
    
    setBmi(parseFloat(calculatedBmi.toFixed(1)));
    
    // Determine BMI category with improved thresholds
    let category: WorkoutCategory = 'Normal weight';
    if (calculatedBmi < 18.5) {
      category = 'Underweight';
      setFitnessLevel('Beginner');
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      category = 'Normal weight';
      setFitnessLevel(parseInt(age) < 30 ? 'Intermediate' : 'Beginner');
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      category = 'Overweight';
      setFitnessLevel('Beginner');
    } else {
      category = 'Obesity';
      setFitnessLevel('Beginner');
    }
    
    setBmiCategory(category);
    setShowRecommendations(true);
  };

  const resetForm = () => {
    setHeight('');
    setWeight('');
    setAge('');
    setGender('');
    setFitnessGoal('');
    setBmi(null);
    setBmiCategory('');
    setFitnessLevel('');
    setShowRecommendations(false);
  };

  const renderBmiResult = () => {
    if (bmi === null) return null;
    
    const getBmiColor = () => {
      if (bmiCategory === 'Normal weight') return 'text-green-600';
      if (bmiCategory === 'Underweight' || bmiCategory === 'Overweight') return 'text-amber-600';
      return 'text-red-600';
    };
    
    return (
      <div className="mt-6 bg-card dark:bg-gray-800 p-4 rounded-lg animate-fade-in-up">
        <h3 className="font-semibold text-lg mb-2">Your Results</h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">BMI Score:</span>
            <span className={`font-bold ${getBmiColor()}`}>{bmi}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Category:</span>
            <span className={`font-bold ${getBmiColor()}`}>{bmiCategory}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Fitness Level:</span>
            <span className="font-bold text-gold">{fitnessLevel}</span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Based on your BMI of {bmi}, you are classified as {bmiCategory.toLowerCase()}. 
              We recommend starting with {fitnessLevel.toLowerCase()}-level workouts 
              focused on {fitnessGoal.toLowerCase()}.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="fitness-card max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Fitness Assessment</CardTitle>
          <CardDescription className="text-center">
            Enter your details to get a personalized fitness plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                <div className="flex">
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="fitness-input rounded-r-none"
                    placeholder="175"
                  />
                  <Select value={heightUnit} onValueChange={(value) => setHeightUnit(value as 'cm' | 'in')}>
                    <SelectTrigger className="w-20 rounded-l-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="in">in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <div className="flex">
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="fitness-input rounded-r-none"
                    placeholder="70"
                  />
                  <Select value={weightUnit} onValueChange={(value) => setWeightUnit(value as 'kg' | 'lbs')}>
                    <SelectTrigger className="w-20 rounded-l-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="fitness-input"
                  placeholder="30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender" className="fitness-input">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goal">Fitness Goal</Label>
              <Select value={fitnessGoal} onValueChange={setFitnessGoal}>
                <SelectTrigger id="goal" className="fitness-input">
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="overall-fitness">Overall Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {renderBmiResult()}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={resetForm}
            disabled={!height && !weight && !age && !gender && !fitnessGoal}
          >
            Reset
          </Button>
          <Button 
            onClick={calculateBmi} 
            className="fitness-button" 
            disabled={!height || !weight || !age || !gender || !fitnessGoal}
          >
            Calculate
          </Button>
        </CardFooter>
      </Card>
      
      {showRecommendations && bmiCategory && (
        <div className="mt-8">
          <BmiWorkoutRecommendations 
            bmiCategory={bmiCategory as WorkoutCategory} 
            fitnessLevel={fitnessLevel as any} 
          />
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;

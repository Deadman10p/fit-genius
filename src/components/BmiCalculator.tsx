
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertCircle, Check } from 'lucide-react';

type BmiCategory = 'Underweight' | 'Normal weight' | 'Overweight' | 'Obesity' | '';

const BmiCalculator = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [fitnessGoal, setFitnessGoal] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<BmiCategory>('');
  const [fitnessLevel, setFitnessLevel] = useState<string>('');

  const calculateBmi = () => {
    if (!height || !weight || !age || !gender || !fitnessGoal) {
      // Handle validation
      return;
    }

    // Convert height from cm to meters
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    
    // Calculate BMI
    const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
    setBmi(parseFloat(calculatedBmi.toFixed(1)));
    
    // Determine BMI category
    let category: BmiCategory = '';
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
  };

  const renderBmiResult = () => {
    if (bmi === null) return null;
    
    const getBmiColor = () => {
      if (bmiCategory === 'Normal weight') return 'text-green-600';
      if (bmiCategory === 'Underweight' || bmiCategory === 'Overweight') return 'text-amber-600';
      return 'text-red-600';
    };
    
    return (
      <div className="mt-6 bg-gray-50 p-4 rounded-lg animate-fade-in-up">
        <h3 className="font-semibold text-lg mb-2">Your Results</h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">BMI Score:</span>
            <span className={`font-bold ${getBmiColor()}`}>{bmi}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Category:</span>
            <span className={`font-bold ${getBmiColor()}`}>{bmiCategory}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Fitness Level:</span>
            <span className="font-bold text-gold">{fitnessLevel}</span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
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
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="fitness-input"
                placeholder="175"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="fitness-input"
                placeholder="70"
              />
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
  );
};

export default BmiCalculator;

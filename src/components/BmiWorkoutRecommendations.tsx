
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  WorkoutCategory, 
  ExerciseLevel, 
  getWorkoutRecommendationsForBMI 
} from '@/utils/bmiWorkoutRecommendations';
import { Dumbbell } from 'lucide-react';

interface BmiWorkoutRecommendationsProps {
  bmiCategory: WorkoutCategory;
  fitnessLevel?: ExerciseLevel;
}

const BmiWorkoutRecommendations: React.FC<BmiWorkoutRecommendationsProps> = ({ 
  bmiCategory, 
  fitnessLevel = 'Beginner' 
}) => {
  const recommendation = getWorkoutRecommendationsForBMI(bmiCategory);
  
  if (!recommendation) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Personalized Workout Plan</CardTitle>
            <CardDescription>Based on your BMI category: {bmiCategory}</CardDescription>
          </div>
          <Badge variant={bmiCategory === 'Normal weight' ? 'default' : 'secondary'}>
            {bmiCategory}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">{recommendation.description}</p>
        
        <Tabs defaultValue={fitnessLevel.toLowerCase()} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="beginner" className="mt-4">
            <div className="grid gap-3">
              {recommendation.exercises.beginner.map((exercise, index) => (
                <div key={index} className="flex items-start p-3 rounded-lg bg-card border">
                  <Dumbbell className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{exercise.name}</h4>
                    <p className="text-sm text-muted-foreground">{exercise.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="mt-4">
            <div className="grid gap-3">
              {recommendation.exercises.advanced.map((exercise, index) => (
                <div key={index} className="flex items-start p-3 rounded-lg bg-card border">
                  <Dumbbell className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{exercise.name}</h4>
                    <p className="text-sm text-muted-foreground">{exercise.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BmiWorkoutRecommendations;

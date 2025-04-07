
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Flame, Dumbbell, ChevronRight } from 'lucide-react';

export type WorkoutType = {
  id: string;
  title: string;
  description: string;
  duration: number;
  caloriesBurn: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  image: string;
};

interface WorkoutCardProps {
  workout: WorkoutType;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const getLevelColor = () => {
    switch (workout.level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  return (
    <Card className="fitness-card h-full flex flex-col overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={workout.image}
          alt={workout.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className={`absolute top-2 right-2 ${getLevelColor()}`}>
          {workout.level}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{workout.title}</CardTitle>
        <CardDescription className="line-clamp-2">{workout.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4 flex-grow">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gold" />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center">
            <Flame className="h-4 w-4 mr-1 text-gold" />
            <span>{workout.caloriesBurn} cal</span>
          </div>
          <div className="flex items-center">
            <Dumbbell className="h-4 w-4 mr-1 text-gold" />
            <span>{workout.category}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button className="w-full fitness-button group-hover:animate-pulse-gold flex items-center justify-between">
          <span>Start Workout</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;

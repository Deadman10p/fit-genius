
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getWorkoutById } from '@/services/workoutService';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ArrowLeft, Clock, Flame, Dumbbell, Play, Pause, RotateCcw, CheckCircle, Music } from 'lucide-react';
import { logAnalyticsEvent } from '@/utils/analytics';

const WorkoutDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseTimeLeft, setExerciseTimeLeft] = useState(0);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);

  const { data: workout, isLoading, error } = useQuery({
    queryKey: ['workout', id],
    queryFn: () => getWorkoutById(id || ''),
    enabled: !!id
  });

  React.useEffect(() => {
    if (workout?.exercises && workout.exercises.length > 0) {
      // Initialize with the first exercise duration or 0 if it's rep-based
      const initialDuration = workout.exercises[0].duration || 0;
      setExerciseTimeLeft(initialDuration);
    }
    
    return () => {
      // Clean up timer on unmount
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [workout]);

  const startWorkout = () => {
    if (!workout?.exercises || workout.exercises.length === 0) {
      toast.error("No exercises found for this workout");
      return;
    }
    
    setIsWorkoutActive(true);
    setCurrentExerciseIndex(0);
    setWorkoutCompleted(false);
    
    const exercise = workout.exercises[0];
    
    // Set initial time for the first exercise
    setExerciseTimeLeft(exercise.duration);
    
    // Start the timer if this exercise is time-based
    if (exercise.duration > 0) {
      const timerId = window.setInterval(() => {
        setExerciseTimeLeft(prev => {
          if (prev <= 1) {
            moveToNextExercise();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setTimer(timerId);
    }
    
    // Log analytics event
    logAnalyticsEvent('workout_started', {
      workout_id: workout.id,
      workout_name: workout.title,
      workout_level: workout.level
    });
    
    toast.success("Workout started! Let's go!");
  };

  const pauseWorkout = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setIsWorkoutActive(false);
    toast("Workout paused", { icon: <Pause className="text-yellow-500" /> });
  };

  const resumeWorkout = () => {
    if (workout?.exercises && currentExerciseIndex < workout.exercises.length) {
      setIsWorkoutActive(true);
      
      const exercise = workout.exercises[currentExerciseIndex];
      
      // Only restart timer if time-based and time is left
      if (exercise.duration > 0 && exerciseTimeLeft > 0) {
        const timerId = window.setInterval(() => {
          setExerciseTimeLeft(prev => {
            if (prev <= 1) {
              moveToNextExercise();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        setTimer(timerId);
      }
      
      toast("Workout resumed", { icon: <Play className="text-green-500" /> });
    }
  };

  const resetWorkout = () => {
    if (timer) {
      clearInterval(timer);
    }
    
    setIsWorkoutActive(false);
    setCurrentExerciseIndex(0);
    setWorkoutCompleted(false);
    
    if (workout?.exercises && workout.exercises.length > 0) {
      setExerciseTimeLeft(workout.exercises[0].duration || 0);
    }
    
    toast("Workout reset", { icon: <RotateCcw className="text-blue-500" /> });
  };

  const moveToNextExercise = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    
    if (workout?.exercises) {
      const nextIndex = currentExerciseIndex + 1;
      
      if (nextIndex >= workout.exercises.length) {
        // End of workout
        completeWorkout();
        return;
      }
      
      setCurrentExerciseIndex(nextIndex);
      const nextExercise = workout.exercises[nextIndex];
      setExerciseTimeLeft(nextExercise.duration || 0);
      
      // If the next exercise is time-based, start the timer
      if (nextExercise.duration > 0) {
        const timerId = window.setInterval(() => {
          setExerciseTimeLeft(prev => {
            if (prev <= 1) {
              moveToNextExercise();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        setTimer(timerId);
      }
      
      toast.info(`Next exercise: ${nextExercise.name}`);
    }
  };

  const markExerciseComplete = () => {
    // Only for rep-based exercises that don't have a timer
    if (workout?.exercises && currentExerciseIndex < workout.exercises.length) {
      const exercise = workout.exercises[currentExerciseIndex];
      
      if (exercise.duration === 0) {
        moveToNextExercise();
      }
    }
  };

  const completeWorkout = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    
    setIsWorkoutActive(false);
    setWorkoutCompleted(true);
    
    // Log analytics event
    if (workout) {
      logAnalyticsEvent('workout_completed', {
        workout_id: workout.id,
        workout_name: workout.title,
        workout_duration: workout.duration
      });
    }
    
    toast.success("Workout completed! Great job!", {
      icon: <CheckCircle className="text-green-500" />,
      duration: 5000
    });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = (): number => {
    if (!workout?.exercises || workout.exercises.length === 0) return 0;
    return (currentExerciseIndex / workout.exercises.length) * 100;
  };

  const getLevelColor = (level?: 'Beginner' | 'Intermediate' | 'Advanced') => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" className="mr-2" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Skeleton className="h-8 w-1/3" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-64 w-full rounded-lg mb-6" />
              <Skeleton className="h-8 w-2/3 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-6" />
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-full mb-4" />
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-6 w-1/4" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !workout) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Workout Not Found</h1>
          <p className="text-muted-foreground mb-6">The workout you're looking for doesn't exist or there was an error.</p>
          <Button onClick={() => navigate('/workouts')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Workouts
          </Button>
        </div>
      </Layout>
    );
  }

  const currentExercise = workout.exercises && workout.exercises.length > currentExerciseIndex 
    ? workout.exercises[currentExerciseIndex] 
    : null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Button variant="ghost" className="mr-2" onClick={() => navigate('/workouts')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">{workout.title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className={getLevelColor(workout.level)}>
              {workout.level}
            </Badge>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-primary" />
              <span>{workout.duration} min</span>
            </div>
            <div className="flex items-center">
              <Flame className="h-4 w-4 mr-1 text-primary" />
              <span>{workout.caloriesBurn} cal</span>
            </div>
            <div className="flex items-center">
              <Dumbbell className="h-4 w-4 mr-1 text-primary" />
              <span>{workout.category}</span>
            </div>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Workout Details and Active Workout */}
          <div className="lg:col-span-2">
            {!isWorkoutActive && !workoutCompleted && (
              <>
                <img 
                  src={workout.image} 
                  alt={workout.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground mb-6">{workout.description}</p>
                
                <Button 
                  className="fitness-button w-full sm:w-auto mb-8"
                  onClick={startWorkout}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Workout
                </Button>
              </>
            )}
            
            {/* Active Workout UI */}
            {isWorkoutActive && currentExercise && (
              <div className="bg-card rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold mb-4">
                  Current Exercise: {currentExercise.name}
                </h2>
                
                <div className="mb-6">
                  <Progress value={progressPercentage()} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progress: {currentExerciseIndex + 1}/{workout.exercises?.length || 0}</span>
                    <span>Exercise {currentExerciseIndex + 1} of {workout.exercises?.length || 0}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  {currentExercise.duration > 0 ? (
                    <div className="text-center mb-4">
                      <div className="text-5xl font-bold mb-2">{formatTime(exerciseTimeLeft)}</div>
                      <p className="text-muted-foreground">Time Remaining</p>
                    </div>
                  ) : (
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold mb-2">
                        {currentExercise.sets} sets × {currentExercise.reps} reps
                      </div>
                      <p className="text-muted-foreground">Complete all sets and reps</p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  <Button variant="outline" onClick={pauseWorkout}>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                  {!isWorkoutActive && (
                    <Button onClick={resumeWorkout}>
                      <Play className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                  )}
                  <Button variant="outline" onClick={resetWorkout}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  {currentExercise.duration === 0 && (
                    <Button onClick={markExerciseComplete} className="fitness-button">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Complete & Next
                    </Button>
                  )}
                </div>
                
                {currentExercise.duration > 0 && (
                  <div className="text-center text-sm text-muted-foreground">
                    Timer will automatically move to the next exercise when done
                  </div>
                )}
                
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" size="sm">
                    <Music className="h-4 w-4 mr-2" />
                    Toggle Workout Music
                  </Button>
                </div>
              </div>
            )}
            
            {/* Completed Workout UI */}
            {workoutCompleted && (
              <div className="bg-card rounded-lg p-6 shadow-md text-center">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <h2 className="text-2xl font-bold mb-2">Workout Complete!</h2>
                <p className="text-lg mb-6">Great job! You've finished {workout.title}.</p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-background p-4 rounded-lg">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="font-medium">{workout.duration} minutes</p>
                    <p className="text-sm text-muted-foreground">Duration</p>
                  </div>
                  <div className="bg-background p-4 rounded-lg">
                    <Flame className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="font-medium">{workout.caloriesBurn}</p>
                    <p className="text-sm text-muted-foreground">Calories</p>
                  </div>
                  <div className="bg-background p-4 rounded-lg">
                    <Dumbbell className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="font-medium">{workout.exercises?.length || 0}</p>
                    <p className="text-sm text-muted-foreground">Exercises</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="outline" onClick={resetWorkout}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Do It Again
                  </Button>
                  <Button onClick={() => navigate('/workouts')} className="fitness-button">
                    <Dumbbell className="h-4 w-4 mr-2" />
                    Find Another Workout
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Exercises List */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Exercises</h2>
                
                <div className="space-y-4">
                  {workout.exercises?.map((exercise, index) => (
                    <div 
                      key={`${exercise.name}-${index}`} 
                      className={`flex justify-between items-center p-3 rounded-md ${
                        index === currentExerciseIndex && isWorkoutActive
                          ? 'bg-primary/20 border-l-4 border-primary'
                          : 'bg-background'
                      } ${
                        index < currentExerciseIndex || workoutCompleted
                          ? 'text-muted-foreground'
                          : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-card mr-3 text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className={index < currentExerciseIndex || workoutCompleted ? 'line-through' : ''}>
                          {exercise.name}
                        </span>
                      </div>
                      <div>
                        {exercise.duration > 0 ? (
                          <span>{formatTime(exercise.duration)}</span>
                        ) : (
                          <span>{exercise.sets}×{exercise.reps}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkoutDetail;

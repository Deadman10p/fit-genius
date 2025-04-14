
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Dumbbell, ChevronRight, Utensils, Calendar, Award, LineChart, Target, Flame, Clock } from 'lucide-react';

// Mock data for dashboard
const upcomingWorkouts = [
  { id: 1, name: 'Upper Body Strength', time: 'Tomorrow, 10:00 AM', duration: '45 min' },
  { id: 2, name: 'HIIT Cardio', time: 'Wednesday, 6:00 PM', duration: '30 min' },
  { id: 3, name: 'Yoga Flow', time: 'Friday, 8:00 AM', duration: '60 min' },
];

const weeklyStats = [
  { name: 'Workouts', value: 4, target: 5, icon: Dumbbell },
  { name: 'Calories', value: 2400, target: 3000, icon: Flame },
  { name: 'Active Hours', value: 6, target: 10, icon: Clock },
];

const nutritionPlan = [
  { meal: 'Breakfast', food: 'Oatmeal with berries and protein shake', calories: 450 },
  { meal: 'Lunch', food: 'Grilled chicken salad with quinoa', calories: 520 },
  { meal: 'Snack', food: 'Greek yogurt with almonds', calories: 250 },
  { meal: 'Dinner', food: 'Salmon with roasted vegetables', calories: 580 },
];

const recentAchievements = [
  { id: 1, name: 'Workout Streak', description: 'Completed 5 workouts in a row', icon: Award },
  { id: 2, name: 'New Personal Best', description: 'Bench press: 185 lbs', icon: Target },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  
  // Get user's first name for personalized greeting
  const firstName = currentUser?.displayName?.split(' ')[0] || currentUser?.email?.split('@')[0] || 'Fitness Enthusiast';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t('dashboard.welcome')}, {firstName}!</h1>
          <p className="text-muted-foreground">Here's your fitness summary for today</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button onClick={() => navigate('/workouts')} className="flex items-center">
            <Dumbbell className="mr-2 h-4 w-4" />
            Start Workout
          </Button>
          <Button variant="outline" onClick={() => navigate('/nutrition')}>
            <Utensils className="mr-2 h-4 w-4" />
            View Meal Plan
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {weeklyStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-primary/20 mr-3">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{stat.name}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Target: {stat.target}</p>
              </div>
              <Progress value={(stat.value / stat.target) * 100} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Today's Workout and Nutrition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Today's Workout */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center">
                <Dumbbell className="mr-2 h-5 w-5 text-primary" />
                {t('dashboard.todayWorkout')}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/workouts')}>
                {t('dashboard.viewAll')} <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-lg bg-card/50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">Full Body Strength</h3>
                  <p className="text-sm text-muted-foreground">Medium intensity • 45 minutes</p>
                </div>
                <Button size="sm">Start</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <div className="bg-background p-2 rounded text-center">
                  <p className="text-xs text-muted-foreground">Exercises</p>
                  <p className="font-semibold">8</p>
                </div>
                <div className="bg-background p-2 rounded text-center">
                  <p className="text-xs text-muted-foreground">Calories</p>
                  <p className="font-semibold">320</p>
                </div>
                <div className="bg-background p-2 rounded text-center">
                  <p className="text-xs text-muted-foreground">Difficulty</p>
                  <p className="font-semibold">Medium</p>
                </div>
                <div className="bg-background p-2 rounded text-center">
                  <p className="text-xs text-muted-foreground">Equipment</p>
                  <p className="font-semibold">Basic</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Nutrition Plan */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center">
                <Utensils className="mr-2 h-5 w-5 text-primary" />
                {t('dashboard.nutritionPlan')}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/nutrition')}>
                {t('dashboard.viewAll')} <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nutritionPlan.map((meal, index) => (
                <div key={index} className="flex justify-between items-start pb-2">
                  <div>
                    <p className="font-medium">{meal.meal}</p>
                    <p className="text-sm text-muted-foreground">{meal.food}</p>
                  </div>
                  <div className="text-sm font-medium">{meal.calories} cal</div>
                </div>
              ))}
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Daily Total</p>
                  <p className="font-bold">{nutritionPlan.reduce((sum, meal) => sum + meal.calories, 0)} cal</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Workouts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Upcoming Workouts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              {t('dashboard.upcomingWorkouts')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingWorkouts.map((workout) => (
                <div key={workout.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                  <div>
                    <h3 className="font-medium">{workout.name}</h3>
                    <p className="text-sm text-muted-foreground">{workout.time}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-3">{workout.duration}</span>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Award className="mr-2 h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start p-3 border rounded-lg">
                  <div className="p-2 rounded-full bg-primary/20 mr-3">
                    <achievement.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <LineChart className="mr-2 h-5 w-5 text-primary" />
            {t('dashboard.recentProgress')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <div className="text-center">
              <LineChart className="h-12 w-12 text-primary mx-auto mb-3 opacity-40" />
              <p className="text-lg font-medium">Track your fitness journey</p>
              <p className="text-sm text-muted-foreground">Start logging your workouts to see progress charts here</p>
              <Button className="mt-4" onClick={() => navigate('/progress')}>
                View Progress Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

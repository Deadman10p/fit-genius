
import React from 'react';
import Navbar from '@/components/Navbar';
import FitBot from '@/components/FitBot';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUp, Award, Clock, Calendar, Flame, TrendingUp, Dumbbell } from 'lucide-react';

// Sample data for charts
const weightData = [
  { date: 'Week 1', weight: 83 },
  { date: 'Week 2', weight: 82.3 },
  { date: 'Week 3', weight: 81.5 },
  { date: 'Week 4', weight: 80.8 },
  { date: 'Week 5', weight: 80.2 },
  { date: 'Week 6', weight: 79.7 },
  { date: 'Week 7', weight: 79.1 },
  { date: 'Week 8', weight: 78.6 },
];

const workoutData = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 30 },
  { day: 'Wed', minutes: 0 },
  { day: 'Thu', minutes: 60 },
  { day: 'Fri', minutes: 45 },
  { day: 'Sat', minutes: 90 },
  { day: 'Sun', minutes: 0 },
];

const calorieData = [
  { day: 'Mon', burned: 320, consumed: 1800 },
  { day: 'Tue', burned: 250, consumed: 1750 },
  { day: 'Wed', burned: 0, consumed: 1900 },
  { day: 'Thu', burned: 420, consumed: 1820 },
  { day: 'Fri', burned: 350, consumed: 1780 },
  { day: 'Sat', burned: 580, consumed: 2100 },
  { day: 'Sun', burned: 0, consumed: 2200 },
];

// Achievements data
const achievements = [
  { id: 1, title: 'First Workout', description: 'Completed your first workout', date: '2 weeks ago', icon: <Dumbbell className="h-6 w-6 text-gold" /> },
  { id: 2, title: 'Week Streak', description: 'Worked out 5 days in a row', date: '1 week ago', icon: <Calendar className="h-6 w-6 text-gold" /> },
  { id: 3, title: 'Calorie Burner', description: 'Burned 1000 calories in a week', date: '5 days ago', icon: <Flame className="h-6 w-6 text-gold" /> },
  { id: 4, title: 'Early Bird', description: 'Completed 5 morning workouts', date: '3 days ago', icon: <Clock className="h-6 w-6 text-gold" /> },
  { id: 5, title: 'Weight Goal', description: 'Lost 5 pounds', date: 'Yesterday', icon: <TrendingUp className="h-6 w-6 text-gold" /> },
];

const Progress = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
            <p className="text-gray-600">Track your fitness journey and achievements</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gold hover:bg-gold-dark">
              <Award className="h-4 w-4 mr-1" />
              250 FitCoins
            </Badge>
          </div>
        </div>
        
        {/* Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard 
            title="Weight Loss" 
            value="4.4 lbs" 
            trend={5.3} 
            description="Last 8 weeks" 
            icon={<TrendingUp className="h-6 w-6 text-green-500" />} 
          />
          <SummaryCard 
            title="Active Time" 
            value="270 min" 
            trend={12} 
            description="This week" 
            icon={<Clock className="h-6 w-6 text-blue-500" />} 
          />
          <SummaryCard 
            title="Calories Burned" 
            value="1,920" 
            trend={8} 
            description="This week" 
            icon={<Flame className="h-6 w-6 text-red-500" />} 
          />
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="charts" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="charts">Charts & Metrics</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="charts" className="space-y-6 mt-6">
            {/* Weight Chart */}
            <Card className="fitness-card">
              <CardHeader>
                <CardTitle>Weight Progress</CardTitle>
                <CardDescription>Tracking your weight over the last 8 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weightData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#D4AF37" 
                        strokeWidth={2} 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Workout Minutes */}
            <Card className="fitness-card">
              <CardHeader>
                <CardTitle>Workout Duration</CardTitle>
                <CardDescription>Minutes spent working out each day this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={workoutData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="minutes" fill="#D4AF37" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Calories */}
            <Card className="fitness-card">
              <CardHeader>
                <CardTitle>Calorie Balance</CardTitle>
                <CardDescription>Calories burned vs. consumed this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={calorieData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="consumed" fill="#94a3b8" name="Consumed" />
                      <Bar dataKey="burned" fill="#D4AF37" name="Burned" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-6">
            <Card className="fitness-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-6 w-6 text-gold mr-2" />
                  Your Achievements
                </CardTitle>
                <CardDescription>Badges and milestones you've reached on your fitness journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className="flex p-4 bg-white rounded-lg border border-gray-100 shadow-sm"
                    >
                      <div className="bg-gold/10 p-3 rounded-full mr-4">
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Locked Achievement */}
                  <div className="flex p-4 bg-gray-50 rounded-lg border border-gray-100 opacity-70">
                    <div className="bg-gray-200 p-3 rounded-full mr-4">
                      <Award className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold flex items-center">
                        Nutrition Master
                        <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">Locked</span>
                      </h3>
                      <p className="text-sm text-gray-600">Log your meals for 14 consecutive days</p>
                      <p className="text-xs text-gray-400 mt-1">3/14 days completed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* FitBot */}
      <FitBot />
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
  trend: number;
  description: string;
  icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, trend, description, icon }) => {
  return (
    <Card className="fitness-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500 mt-1">{description}</p>
          {trend !== 0 && (
            <div className="flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>{trend}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Progress;

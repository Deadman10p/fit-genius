
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Flame, Award, TrendingUp, Dumbbell } from 'lucide-react';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="FitCoins" 
        value="250" 
        description="Earned this month" 
        icon={<Award className="h-6 w-6 text-yellow-500" />}
        trend={+15}
      />
      <StatCard 
        title="Calories Burned" 
        value="4,320" 
        description="Total this month" 
        icon={<Flame className="h-6 w-6 text-red-500" />}
        trend={+8}
      />
      <StatCard 
        title="Active Streak" 
        value="12" 
        description="Days in a row" 
        icon={<TrendingUp className="h-6 w-6 text-green-500" />}
        trend={+3}
      />
      <StatCard 
        title="Workouts" 
        value="18" 
        description="Completed this month" 
        icon={<Dumbbell className="h-6 w-6 text-blue-500" />}
        trend={+5}
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, trend }) => {
  return (
    <Card className="fitness-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
        {trend !== 0 && (
          <div className={`flex items-center mt-2 text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            <span>{trend > 0 ? '+' : ''}{trend}%</span>
            <TrendingUp className={`h-3 w-3 ml-1 ${trend > 0 ? '' : 'transform rotate-180'}`} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardStats;

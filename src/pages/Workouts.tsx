
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import WorkoutCard from '@/components/WorkoutCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, Dumbbell } from 'lucide-react';
import FitBot from '@/components/FitBot';
import { Layout } from '@/components/Layout';
import { getWorkouts } from '@/services/workoutService';
import { Skeleton } from '@/components/ui/skeleton';

const Workouts = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterLevel, setFilterLevel] = React.useState('all');
  const [filterCategory, setFilterCategory] = React.useState('all');
  
  const { data: workouts = [], isLoading, error } = useQuery({
    queryKey: ['workouts'],
    queryFn: getWorkouts
  });
  
  const filteredWorkouts = workouts.filter(workout => {
    // Search term filter
    const matchesSearch = workout.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          workout.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Level filter
    const matchesLevel = filterLevel === 'all' || workout.level.toLowerCase() === filterLevel.toLowerCase();
    
    // Category filter
    const matchesCategory = filterCategory === 'all' || workout.category.toLowerCase() === filterCategory.toLowerCase();
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Workouts</h1>
              <p className="text-muted-foreground">Find the perfect workout for your fitness level and goals</p>
            </div>
            <Button className="fitness-button">
              <Dumbbell className="mr-2 h-4 w-4" />
              Create Custom Workout
            </Button>
          </div>
          
          {/* Search & Filters */}
          <div className="bg-card p-4 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search workouts..."
                  className="pl-10 fitness-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="fitness-input">
                  <div className="flex items-center">
                    <Filter size={18} className="mr-2 text-muted-foreground" />
                    <span>{filterLevel === 'all' ? 'All Levels' : filterLevel}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="fitness-input">
                  <div className="flex items-center">
                    <Filter size={18} className="mr-2 text-muted-foreground" />
                    <span>{filterCategory === 'all' ? 'All Categories' : filterCategory}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="hiit">HIIT</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Workouts Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <Card key={index} className="fitness-card h-full flex flex-col">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-6" />
                    <div className="flex justify-between mb-4">
                      <Skeleton className="h-4 w-[30%]" />
                      <Skeleton className="h-4 w-[30%]" />
                      <Skeleton className="h-4 w-[30%]" />
                    </div>
                    <Skeleton className="h-10 w-full mt-4" />
                  </div>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">Error loading workouts. Please try again later.</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          ) : filteredWorkouts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground mb-2">No workouts found matching your criteria</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setFilterLevel('all');
                  setFilterCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </main>
        
        {/* FitBot */}
        <FitBot />
      </div>
    </Layout>
  );
};

export default Workouts;

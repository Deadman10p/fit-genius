
import React from 'react';
import Navbar from '@/components/Navbar';
import WorkoutCard, { WorkoutType } from '@/components/WorkoutCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, Dumbbell } from 'lucide-react';
import FitBot from '@/components/FitBot';

// Sample extended workout data
const workoutData: WorkoutType[] = [
  {
    id: '1',
    title: 'Full Body Burn',
    description: 'A comprehensive workout that targets all major muscle groups for a complete burn.',
    duration: 30,
    caloriesBurn: 300,
    level: 'Beginner',
    category: 'HIIT',
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Core Crusher',
    description: 'Strengthen your core with this intense abdominal workout routine.',
    duration: 20,
    caloriesBurn: 200,
    level: 'Intermediate',
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Cardio Blast',
    description: 'Elevate your heart rate and burn maximum calories with this energetic cardio session.',
    duration: 25,
    caloriesBurn: 350,
    level: 'Beginner',
    category: 'Cardio',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=2574&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Power Yoga Flow',
    description: 'A dynamic yoga sequence to build strength and improve flexibility.',
    duration: 40,
    caloriesBurn: 250,
    level: 'Intermediate',
    category: 'Yoga',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2520&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Upper Body Strength',
    description: 'Focus on building strength in your arms, shoulders, chest, and back.',
    duration: 35,
    caloriesBurn: 280,
    level: 'Intermediate',
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'Lower Body Sculpt',
    description: 'Tone and strengthen your legs and glutes with this targeted routine.',
    duration: 30,
    caloriesBurn: 320,
    level: 'Beginner',
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=2074&auto=format&fit=crop'
  },
  {
    id: '7',
    title: 'Morning Energizer',
    description: 'Start your day with this quick and effective full-body workout.',
    duration: 15,
    caloriesBurn: 150,
    level: 'Beginner',
    category: 'HIIT',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop'
  },
  {
    id: '8',
    title: 'Advanced HIIT Challenge',
    description: 'Push your limits with this high-intensity interval training workout.',
    duration: 45,
    caloriesBurn: 450,
    level: 'Advanced',
    category: 'HIIT',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop'
  }
];

const Workouts = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterLevel, setFilterLevel] = React.useState('all');
  const [filterCategory, setFilterCategory] = React.useState('all');
  
  const filteredWorkouts = workoutData.filter(workout => {
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Workouts</h1>
            <p className="text-gray-600">Find the perfect workout for your fitness level and goals</p>
          </div>
          <Button className="fitness-button">
            <Dumbbell className="mr-2 h-4 w-4" />
            Create Custom Workout
          </Button>
        </div>
        
        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
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
                  <Filter size={18} className="mr-2 text-gray-400" />
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
                  <Filter size={18} className="mr-2 text-gray-400" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-2">No workouts found matching your criteria</p>
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
        </div>
      </main>
      
      {/* FitBot */}
      <FitBot />
    </div>
  );
};

export default Workouts;

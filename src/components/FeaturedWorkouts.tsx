
import React from 'react';
import WorkoutCard, { WorkoutType } from './WorkoutCard';

// Sample workout data
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
  }
];

const FeaturedWorkouts = () => {
  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Featured Workouts</h2>
        <a href="/workouts" className="text-gold hover:text-gold-dark transition-colors">View All</a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {workoutData.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedWorkouts;

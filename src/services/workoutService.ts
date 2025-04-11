
import { WorkoutType } from "@/components/WorkoutCard";

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
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=2070&auto=format&fit=crop',
    exercises: [
      { name: 'Jumping Jacks', duration: 60, reps: 0, sets: 0 },
      { name: 'Push-ups', duration: 0, reps: 12, sets: 3 },
      { name: 'Squats', duration: 0, reps: 15, sets: 3 },
      { name: 'Plank', duration: 30, reps: 0, sets: 3 },
      { name: 'Mountain Climbers', duration: 60, reps: 0, sets: 0 },
      { name: 'Burpees', duration: 0, reps: 10, sets: 3 },
      { name: 'Lunges', duration: 0, reps: 10, sets: 3 }
    ]
  },
  {
    id: '2',
    title: 'Core Crusher',
    description: 'Strengthen your core with this intense abdominal workout routine.',
    duration: 20,
    caloriesBurn: 200,
    level: 'Intermediate',
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop',
    exercises: [
      { name: 'Crunches', duration: 0, reps: 20, sets: 3 },
      { name: 'Russian Twists', duration: 0, reps: 20, sets: 3 },
      { name: 'Leg Raises', duration: 0, reps: 15, sets: 3 },
      { name: 'Plank', duration: 45, reps: 0, sets: 3 },
      { name: 'Side Plank', duration: 30, reps: 0, sets: 3 },
      { name: 'Mountain Climbers', duration: 45, reps: 0, sets: 0 }
    ]
  },
  {
    id: '3',
    title: 'Cardio Blast',
    description: 'Elevate your heart rate and burn maximum calories with this energetic cardio session.',
    duration: 25,
    caloriesBurn: 350,
    level: 'Beginner',
    category: 'Cardio',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=2574&auto=format&fit=crop',
    exercises: [
      { name: 'Jumping Jacks', duration: 60, reps: 0, sets: 0 },
      { name: 'High Knees', duration: 45, reps: 0, sets: 0 },
      { name: 'Butt Kicks', duration: 45, reps: 0, sets: 0 },
      { name: 'Jump Rope', duration: 120, reps: 0, sets: 0 },
      { name: 'Mountain Climbers', duration: 60, reps: 0, sets: 0 },
      { name: 'Burpees', duration: 0, reps: 15, sets: 3 }
    ]
  },
  {
    id: '4',
    title: 'Power Yoga Flow',
    description: 'A dynamic yoga sequence to build strength and improve flexibility.',
    duration: 40,
    caloriesBurn: 250,
    level: 'Intermediate',
    category: 'Yoga',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2520&auto=format&fit=crop',
    exercises: [
      { name: 'Sun Salutation', duration: 300, reps: 0, sets: 0 },
      { name: 'Warrior I', duration: 60, reps: 0, sets: 0 },
      { name: 'Warrior II', duration: 60, reps: 0, sets: 0 },
      { name: 'Triangle Pose', duration: 60, reps: 0, sets: 0 },
      { name: 'Tree Pose', duration: 60, reps: 0, sets: 0 },
      { name: 'Bridge Pose', duration: 60, reps: 0, sets: 0 },
      { name: 'Savasana', duration: 300, reps: 0, sets: 0 }
    ]
  },
  {
    id: '5',
    title: 'Upper Body Strength',
    description: 'Focus on building strength in your arms, shoulders, chest, and back.',
    duration: 35,
    caloriesBurn: 280,
    level: 'Intermediate',
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    exercises: [
      { name: 'Push-ups', duration: 0, reps: 15, sets: 3 },
      { name: 'Dumbbell Rows', duration: 0, reps: 12, sets: 3 },
      { name: 'Shoulder Press', duration: 0, reps: 12, sets: 3 },
      { name: 'Bicep Curls', duration: 0, reps: 12, sets: 3 },
      { name: 'Tricep Dips', duration: 0, reps: 15, sets: 3 },
      { name: 'Plank', duration: 60, reps: 0, sets: 3 }
    ]
  },
  {
    id: '6',
    title: 'Lower Body Sculpt',
    description: 'Tone and strengthen your legs and glutes with this targeted routine.',
    duration: 30,
    caloriesBurn: 320,
    level: 'Beginner',
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=2074&auto=format&fit=crop',
    exercises: [
      { name: 'Squats', duration: 0, reps: 20, sets: 3 },
      { name: 'Lunges', duration: 0, reps: 15, sets: 3 },
      { name: 'Glute Bridges', duration: 0, reps: 20, sets: 3 },
      { name: 'Calf Raises', duration: 0, reps: 20, sets: 3 },
      { name: 'Step-ups', duration: 0, reps: 15, sets: 3 },
      { name: 'Wall Sit', duration: 60, reps: 0, sets: 3 }
    ]
  },
  {
    id: '7',
    title: 'Morning Energizer',
    description: 'Start your day with this quick and effective full-body workout.',
    duration: 15,
    caloriesBurn: 150,
    level: 'Beginner',
    category: 'HIIT',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop',
    exercises: [
      { name: 'Jumping Jacks', duration: 60, reps: 0, sets: 0 },
      { name: 'Push-ups', duration: 0, reps: 10, sets: 2 },
      { name: 'Squats', duration: 0, reps: 15, sets: 2 },
      { name: 'Plank', duration: 30, reps: 0, sets: 2 },
      { name: 'Mountain Climbers', duration: 30, reps: 0, sets: 0 }
    ]
  },
  {
    id: '8',
    title: 'Advanced HIIT Challenge',
    description: 'Push your limits with this high-intensity interval training workout.',
    duration: 45,
    caloriesBurn: 450,
    level: 'Advanced',
    category: 'HIIT',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop',
    exercises: [
      { name: 'Burpees', duration: 0, reps: 20, sets: 4 },
      { name: 'Box Jumps', duration: 0, reps: 15, sets: 4 },
      { name: 'Kettlebell Swings', duration: 0, reps: 20, sets: 4 },
      { name: 'Plank to Push-up', duration: 0, reps: 15, sets: 4 },
      { name: 'Jumping Lunges', duration: 0, reps: 20, sets: 4 },
      { name: 'Mountain Climbers', duration: 60, reps: 0, sets: 4 },
      { name: 'Battle Ropes', duration: 45, reps: 0, sets: 4 }
    ]
  }
];

export const getWorkouts = (): Promise<WorkoutType[]> => {
  // Simulate API call with a promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(workoutData);
    }, 300);
  });
};

export const getWorkoutById = (id: string): Promise<WorkoutType | undefined> => {
  // Simulate API call with a promise
  return new Promise((resolve) => {
    setTimeout(() => {
      const workout = workoutData.find(w => w.id === id);
      resolve(workout);
    }, 300);
  });
};

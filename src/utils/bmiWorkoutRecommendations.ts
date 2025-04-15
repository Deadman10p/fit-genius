
export type WorkoutCategory = 'Underweight' | 'Normal weight' | 'Overweight' | 'Obesity';
export type ExerciseLevel = 'Beginner' | 'Advanced';

export interface Exercise {
  name: string;
  description: string;
}

export interface WorkoutRecommendation {
  category: WorkoutCategory;
  description: string;
  exercises: {
    beginner: Exercise[];
    advanced: Exercise[];
  };
}

const workoutRecommendations: Record<WorkoutCategory, WorkoutRecommendation> = {
  'Underweight': {
    category: 'Underweight',
    description: 'For individuals who are underweight, the focus is often on building muscle mass and strength in a healthy way. It\'s important to pair exercise with a nutritious diet that provides enough calories.',
    exercises: {
      beginner: [
        { name: 'Assisted Squats', description: 'Using a chair: Gently sitting down to a chair and standing back up.' },
        { name: 'Wall Push-ups', description: 'Pushing against a wall.' },
        { name: 'Counter Push-ups', description: 'Using a kitchen counter or sturdy table.' },
        { name: 'Incline Dumbbell Press', description: 'Light weights: Lying on a slightly raised surface and pushing light dumbbells upwards.' },
        { name: 'Dumbbell Bicep Curls', description: 'Light weights: Lifting light dumbbells towards your shoulders.' },
        { name: 'Dumbbell Rows', description: 'Light weights: Leaning forward slightly and pulling light dumbbells towards your chest.' },
        { name: 'Overhead Dumbbell Press', description: 'Light weights: Lifting light dumbbells above your head.' },
        { name: 'Calf Raises', description: 'Bodyweight: Standing and lifting up onto your toes.' },
        { name: 'Glute Bridges', description: 'Bodyweight: Lying on your back and lifting your hips.' },
        { name: 'Bird-dog', description: 'On hands and knees, extending one arm and the opposite leg.' }
      ],
      advanced: [
        { name: 'Squats', description: 'Bodyweight or with light weights: Going deeper in your squat.' },
        { name: 'Full Push-ups', description: 'On hands and toes.' },
        { name: 'Incline Dumbbell Press', description: 'Moderate weights: Lying on a raised surface with heavier dumbbells.' },
        { name: 'Dumbbell Bicep Curls', description: 'Moderate weights: Lifting heavier dumbbells.' },
        { name: 'Bent-Over Dumbbell Rows', description: 'Moderate weights: Pulling heavier dumbbells towards your chest while leaning forward.' },
        { name: 'Standing Overhead Press', description: 'Moderate weights: Lifting heavier dumbbells above your head.' },
        { name: 'Weighted Calf Raises', description: 'Holding dumbbells or wearing a backpack with weight while doing calf raises.' },
        { name: 'Weighted Glute Bridges', description: 'Placing a weight plate or dumbbell on your hips during glute bridges.' },
        { name: 'Full Plank', description: 'On hands and toes.' },
        { name: 'Plank with Arm/Leg Lifts', description: 'Lifting one arm or the opposite leg while in a full plank.' }
      ]
    }
  },
  'Normal weight': {
    category: 'Normal weight',
    description: 'For individuals within a normal weight range, exercise focuses on maintaining health, fitness, and overall well-being. A balanced approach including both cardiovascular and strength training is usually recommended.',
    exercises: {
      beginner: [
        { name: 'Brisk Walking', description: 'Walking at a pace where you can talk but are slightly out of breath.' },
        { name: 'Jogging Intervals', description: 'Short bursts of jogging with walking breaks.' },
        { name: 'Bodyweight Squats', description: 'Pretending to sit down in a chair.' },
        { name: 'Stationary Lunges', description: 'Stepping forward and bending both knees.' },
        { name: 'Push-ups', description: 'On knees or toes: Lowering your chest to the ground.' },
        { name: 'Plank', description: 'On knees or toes: Holding a straight line on your forearms.' },
        { name: 'Glute Bridges', description: 'Bodyweight: Lifting your hips off the ground.' },
        { name: 'Step-ups', description: 'Moderate height: Stepping onto a stable box.' },
        { name: 'Dumbbell Bicep Curls', description: 'Light to moderate weights: Lifting weights towards your shoulders.' },
        { name: 'Dumbbell Rows', description: 'Light to moderate weights: Pulling weights towards your chest while leaning slightly.' }
      ],
      advanced: [
        { name: 'Running', description: 'Longer distances or intervals: Sustained running or alternating fast and slow running.' },
        { name: 'Jump Squats', description: 'Squatting and then jumping explosively.' },
        { name: 'Walking Lunges', description: 'Stepping forward into a lunge and continuing to walk.' },
        { name: 'Push-up Variations', description: 'Various variations like diamond or wide grip: More challenging push-up styles.' },
        { name: 'Plank Variations', description: 'With arm/leg lifts, walking plank: More challenging plank exercises.' },
        { name: 'Single-Leg Glute Bridges', description: 'Lifting your hips with one leg in the air.' },
        { name: 'Step-ups with Weights', description: 'Higher box with weights: Using a taller box and adding weight.' },
        { name: 'Pull-ups', description: 'Bodyweight or weighted: Pulling your chin over a bar.' },
        { name: 'Dips', description: 'Bodyweight or weighted: Lowering and lifting your body using parallel bars or a chair.' },
        { name: 'Deadlifts', description: 'With moderate to heavy weight and proper form: Lifting weight from the floor with a straight back.' }
      ]
    }
  },
  'Overweight': {
    category: 'Overweight',
    description: 'For individuals who are overweight, the focus is often on starting with low-impact exercises to protect joints while building cardiovascular fitness and strength. Gradual progression is key.',
    exercises: {
      beginner: [
        { name: 'Gentle Walking', description: 'Gentle pace, gradually increasing duration: Starting with shorter walks and slowly walking for longer.' },
        { name: 'Water Aerobics', description: 'Exercising in a pool, which reduces impact on joints.' },
        { name: 'Chair Exercises', description: 'Seated arm raises, leg extensions, marching in place: Exercising while seated for support.' },
        { name: 'Wall Push-ups', description: 'Pushing against a wall.' },
        { name: 'Counter Push-ups', description: 'Using a kitchen counter or sturdy table.' },
        { name: 'Assisted Squats', description: 'Using a chair: Gently sitting down to a chair and standing back up.' },
        { name: 'Glute Bridges', description: 'Bodyweight: Lifting your hips off the ground while lying on your back.' },
        { name: 'Calf Raises', description: 'Bodyweight: Standing and lifting up onto your toes.' },
        { name: 'Gentle Stretching', description: 'Holding each stretch for longer: Improving flexibility without straining.' },
        { name: 'Stationary Cycling', description: 'Low resistance: Pedaling on a stationary bike at an easy pace.' }
      ],
      advanced: [
        { name: 'Brisk Walking', description: 'Longer duration, varied terrain if comfortable: Walking faster and for longer periods.' },
        { name: 'Swimming', description: 'Longer laps, varied strokes if comfortable: Increasing time in the pool and trying different ways to swim.' },
        { name: 'Bodyweight Squats', description: 'Full range of motion if comfortable: Squatting without holding onto anything.' },
        { name: 'Stationary Lunges', description: 'If comfortable on knees: Stepping forward and bending both knees.' },
        { name: 'Knee Push-ups', description: 'On knees progressing to toes if possible: Gradually trying to do push-ups on your toes.' },
        { name: 'Modified Plank', description: 'On knees progressing to toes: Holding a straight line for longer periods.' },
        { name: 'Step-ups', description: 'Low to moderate height, focusing on stability: Using a slightly higher step.' },
        { name: 'Light Dumbbell Curls', description: 'Light to moderate weights, focusing on form: Lifting weights carefully.' },
        { name: 'Dumbbell Rows', description: 'Light to moderate weights, maintaining good posture: Pulling weights with a stable back.' },
        { name: 'Overhead Press', description: 'Light weights, if shoulders are comfortable: Lifting weights above your head.' }
      ]
    }
  },
  'Obesity': {
    category: 'Obesity',
    description: 'For individuals who are obese, the focus is on starting very gently with low-impact activities to minimize stress on joints and gradually building tolerance and fitness. Consistency is key, and listening to the body is crucial.',
    exercises: {
      beginner: [
        { name: 'Very Short Walks', description: 'Focus on duration over speed: Starting with just a few minutes of easy walking.' },
        { name: 'Water Aerobics', description: 'Gentle movements: Exercising in water.' },
        { name: 'Chair Exercises', description: 'Seated marches, arm raises, leg extensions: Exercising while seated.' },
        { name: 'Wall Push-ups', description: 'Pushing against a wall.' },
        { name: 'Counter Push-ups', description: 'Using a kitchen counter.' },
        { name: 'Assisted Squats', description: 'Using a sturdy chair or holding onto something for support: Gently sitting and standing with help.' },
        { name: 'Mini Glute Bridges', description: 'Small hip lifts: Lifting your hips a little off the ground.' },
        { name: 'Supported Calf Raises', description: 'Holding onto something for balance: Lifting onto your toes while supported.' },
        { name: 'Gentle Stretching', description: 'Focus on range of motion, not depth: Moving your joints gently.' },
        { name: 'Ankle Movements', description: 'Pumps and circles while seated: Moving your feet while sitting.' }
      ],
      advanced: [
        { name: 'Longer Walks', description: 'Slightly longer, brisk walks if comfortable: Gradually increasing walking time and pace.' },
        { name: 'Swimming', description: 'Gentle laps, focusing on form: Swimming at a comfortable pace.' },
        { name: 'Partial Squats', description: 'Partial range of motion if full is difficult: Squatting as low as comfortable.' },
        { name: 'Shallow Lunges', description: 'Very shallow, if knees allow: Small steps into a lunge.' },
        { name: 'Knee Push-ups', description: 'On knees progressing to slightly off a higher surface: Trying to lower yourself a bit more.' },
        { name: 'Knee Plank', description: 'On knees, holding for slightly longer periods: Increasing the time you hold the position.' },
        { name: 'Mini Step-ups', description: 'Very low step, focusing on balance: Stepping onto a small, stable surface.' },
        { name: 'Light Dumbbell Curls', description: 'Very light weights, focusing on form: Lifting small weights.' },
        { name: 'Supported Dumbbell Rows', description: 'Supported, focusing on form: Pulling small weights while supported.' },
        { name: 'Unsupported Calf Raises', description: 'Without support if balance improves: Standing without holding onto anything.' }
      ]
    }
  }
};

export function getWorkoutRecommendationsForBMI(bmiCategory: WorkoutCategory): WorkoutRecommendation {
  return workoutRecommendations[bmiCategory];
}

export function getAllWorkoutRecommendations(): WorkoutRecommendation[] {
  return Object.values(workoutRecommendations);
}

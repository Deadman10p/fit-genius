import { faq } from '../data/knowledge';
import { exercises } from '../data/exercises';
import { programs } from '../data/programs';
import { nutrition } from '../data/nutrition';

// Helper function to find the closest match in our knowledge base
export const findRelevantAnswer = (userInput) => {
  const input = userInput.toLowerCase();
  
  // Try to match with FAQ questions
  const matchedFaq = faq.find(item => 
    item.question.toLowerCase().includes(input) || 
    input.includes(item.question.toLowerCase())
  );
  
  if (matchedFaq) {
    return matchedFaq.answer;
  }
  
  // Check for workout related queries
  if (input.includes('workout') || input.includes('program') || input.includes('routine')) {
    return handleWorkoutQuery(input);
  }
  
  // Check for exercise related queries
  if (input.includes('exercise') || input.includes('how to') || input.includes('form')) {
    return handleExerciseQuery(input);
  }
  
  // Check for nutrition related queries
  if (input.includes('diet') || input.includes('nutrition') || input.includes('food') || 
      input.includes('protein') || input.includes('carb') || input.includes('fat')) {
    return handleNutritionQuery(input);
  }
  
  // Fallback to generic response
  return generateFallbackResponse();
};

const handleWorkoutQuery = (input) => {
  // Check for level indicators
  let level = 'beginner';
  if (input.includes('intermediate')) level = 'intermediate';
  if (input.includes('advanced')) level = 'advanced';
  if (input.includes('athlete')) level = 'athlete';
  
  // Check if query is about a specific sport
  let sport = null;
  if (input.includes('basketball')) sport = 'basketball';
  if (input.includes('running')) sport = 'running';
  
  // If there's a specific sport and we have a program for it
  if (sport && programs.athlete && programs.athlete[sport]) {
    const sportProgram = programs.athlete[sport];
    return `Here's a ${sport} training program: ${JSON.stringify(sportProgram.phases[0].exercises.join(', '))}`;
  }
  
  // Otherwise return level-appropriate program
  if (programs[level]) {
    const program = level === 'beginner' ? programs[level].fullBody : 
                    (level === 'intermediate' ? programs[level].upperLower : null);
    
    if (program) {
      const firstDay = program.schedule[0];
      const exercises = firstDay.exercises.map(ex => ex.name).join(', ');
      return `Here's a ${level} level ${firstDay.focus} workout: ${exercises}. This is day 1 of a ${program.schedule.length}-day program.`;
    }
  }
  
  return "I can help you find the right workout program based on your experience level and goals. Try asking something like 'Show me a beginner full body workout' or 'What's a good intermediate upper body routine?'";
};

const handleExerciseQuery = (input) => {
  // Look for mentions of specific exercises
  for (const category in exercises) {
    const found = exercises[category].find(ex => 
      input.includes(ex.name.toLowerCase()) || 
      ex.name.toLowerCase().includes(input.replace('how to', '').trim())
    );
    
    if (found) {
      if (found.steps) {
        return `Here's how to do ${found.name}: ${found.steps.join(' ')} ${found.tips ? `Tips: ${found.tips}` : ''}`;
      } else {
        return `${found.name}: ${JSON.stringify(found)}`;
      }
    }
  }
  
  // If no specific exercise is found, check for muscle groups
  const muscleGroups = [
    'chest', 'back', 'shoulders', 'legs', 'arms', 
    'core', 'abs', 'biceps', 'triceps', 'quads', 
    'hamstrings', 'glutes', 'calves'
  ];
  
  for (const muscle of muscleGroups) {
    if (input.includes(muscle)) {
      // Find exercises for this muscle group
      const matchingExercises = [];
      
      for (const category in exercises) {
        exercises[category].forEach(ex => {
          if (ex.muscles && ex.muscles.some(m => m.toLowerCase().includes(muscle))) {
            matchingExercises.push(ex.name);
          }
        });
      }
      
      if (matchingExercises.length > 0) {
        return `Good exercises for ${muscle} include: ${matchingExercises.slice(0, 5).join(', ')}`;
      }
    }
  }
  
  return "I can help with specific exercise techniques or recommend exercises for particular muscle groups. Try asking something like 'How to do a proper squat' or 'What are good chest exercises?'";
};

const handleNutritionQuery = (input) => {
  // Check for macronutrient questions
  if (input.includes('macro') || input.includes('protein') || 
      input.includes('carb') || input.includes('fat')) {
    
    // Check for specific goals
    let goal = 'maintenance';
    if (input.includes('lose weight') || input.includes('fat loss') || input.includes('cut')) {
      goal = 'weightLoss';
    } else if (input.includes('gain') || input.includes('bulk') || input.includes('muscle')) {
      goal = 'muscleBuild';
    }
    
    const macroInfo = nutrition.macros[goal];
    return `For ${goal.replace(/([A-Z])/g, ' $1').toLowerCase()}: ${macroInfo.formula}. ${macroInfo.example}. ${macroInfo.tips ? macroInfo.tips.join(' ') : ''}`;
  }
  
  // Check for diet type questions
  if (input.includes('vegetarian') || input.includes('vegan') || input.includes('plant')) {
    if (nutrition.mealPlans.vegetarian) {
      const vegPlan = nutrition.mealPlans.vegetarian.day1;
      return `Example vegetarian day: Breakfast: ${vegPlan.breakfast}. Lunch: ${vegPlan.lunch}. Dinner: ${vegPlan.dinner}. Total macros: ${vegPlan.totalMacros || 'Not specified'}`;
    }
  }
  
  // Check for supplement questions
  if (input.includes('supplement') || input.includes('protein powder') || 
      input.includes('creatine') || input.includes('pre-workout')) {
    
    if (input.includes('pre-workout') || input.includes('before workout')) {
      const preWorkout = nutrition.supplements.preWorkout;
      return `Recommended pre-workout supplements: ${preWorkout.ingredients.join(', ')}. Timing: ${preWorkout.timing}. Benefits: ${preWorkout.benefits}`;
    }
    
    // Generic supplement info
    return "The most evidence-based supplements are: 1) Protein powder for convenience, 2) Creatine monohydrate for strength and power, 3) Caffeine for performance, and 4) Vitamin D if you have limited sun exposure.";
  }
  
  return "I can help with nutrition questions about macronutrients, meal planning, or supplements. Try asking something like 'What macros should I eat for muscle gain?' or 'What supplements are worth taking?'";
};

const generateFallbackResponse = () => {
  const fallbackResponses = [
    "I'm your fitness assistant. Ask me about workouts, exercises, nutrition, or fitness advice!",
    "I can help with exercise techniques, workout programs, or nutrition guidance. What would you like to know?",
    "Need help with your fitness journey? I can provide information on proper form, workout plans, or nutrition strategies.",
    "Ask me about specific exercises, training programs, or nutrition advice for your fitness goals.",
    "I'm here to support your fitness goals. Try asking about workout techniques, program design, or nutritional strategies."
  ];
  
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};

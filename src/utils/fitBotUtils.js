import { faq } from '../data/knowledge';
import { exercises } from '../data/exercises';
import { programs } from '../data/programs';
import { nutrition } from '../data/nutrition';

// Helper function to find the closest match in our knowledge base
export const findRelevantAnswer = (userInput, userData = {}) => {
  const input = userInput.toLowerCase();
  
  // Try to match with FAQ questions
  const matchedFaq = faq.find(item => 
    item.question.toLowerCase().includes(input) || 
    input.includes(item.question.toLowerCase())
  );
  
  if (matchedFaq) {
    return matchedFaq.answer;
  }
  
  // Check for personalized greeting
  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    if (userData.name) {
      return `Hi ${userData.name}! How can I help with your fitness journey today?`;
    }
  }
  
  // Check for workout related queries
  if (input.includes('workout') || input.includes('program') || input.includes('routine')) {
    return handleWorkoutQuery(input, userData);
  }
  
  // Check for exercise related queries
  if (input.includes('exercise') || input.includes('how to') || input.includes('form')) {
    return handleExerciseQuery(input, userData);
  }
  
  // Check for nutrition related queries
  if (input.includes('diet') || input.includes('nutrition') || input.includes('food') || 
      input.includes('protein') || input.includes('carb') || input.includes('fat')) {
    return handleNutritionQuery(input, userData);
  }
  
  // Fallback to generic response
  return generateFallbackResponse(userData);
};

const handleWorkoutQuery = (input, userData = {}) => {
  // Check for level indicators
  let level = 'beginner';
  if (input.includes('intermediate')) level = 'intermediate';
  if (input.includes('advanced')) level = 'advanced';
  if (input.includes('athlete')) level = 'athlete';
  
  // Use user's preferences if available
  if (userData.age) {
    // Adjust level based on age if necessary
    if (parseInt(userData.age) > 60) {
      level = 'beginner';
    }
  }
  
  // Check if query is about a specific sport
  let sport = null;
  if (input.includes('basketball')) sport = 'basketball';
  if (input.includes('running')) sport = 'running';
  
  // Consider allergies if provided
  let allergiesNote = '';
  if (userData.allergies && userData.allergies.trim() !== '') {
    allergiesNote = ` Based on your allergies (${userData.allergies}), you may want to avoid exercises that put stress on those areas.`;
  }
  
  // Personalize workout duration if provided
  let durationNote = '';
  if (userData.workoutDuration) {
    durationNote = ` I've selected workouts that should fit within your preferred ${userData.workoutDuration} timeframe.`;
  }
  
  // If there's a specific sport and we have a program for it
  if (sport && programs.athlete && programs.athlete[sport]) {
    const sportProgram = programs.athlete[sport];
    return `Here's a ${sport} training program tailored for you: ${JSON.stringify(sportProgram.phases[0].exercises.join(', '))}${allergiesNote}${durationNote}`;
  }
  
  // Otherwise return level-appropriate program
  if (programs[level]) {
    const program = level === 'beginner' ? programs[level].fullBody : 
                    (level === 'intermediate' ? programs[level].upperLower : null);
    
    if (program) {
      const firstDay = program.schedule[0];
      const exercises = firstDay.exercises.map(ex => ex.name).join(', ');
      return `Here's a ${level} level ${firstDay.focus} workout that should work well for you${userData.name ? ', ' + userData.name : ''}: ${exercises}. This is day 1 of a ${program.schedule.length}-day program.${allergiesNote}${durationNote}`;
    }
  }
  
  return `I can help you find the right workout program based on your experience level and goals${userData.name ? ', ' + userData.name : ''}. Try asking something like 'Show me a beginner full body workout' or 'What's a good intermediate upper body routine?'${allergiesNote}`;
};

const handleExerciseQuery = (input, userData = {}) => {
  // Look for mentions of specific exercises
  for (const category in exercises) {
    const found = exercises[category].find(ex => 
      input.includes(ex.name.toLowerCase()) || 
      ex.name.toLowerCase().includes(input.replace('how to', '').trim())
    );
    
    if (found) {
      if (found.steps) {
        return `Here's how to do ${found.name}${userData.name ? ', ' + userData.name : ''}: ${found.steps.join(' ')} ${found.tips ? `Tips: ${found.tips}` : ''}`;
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
            // Check allergies if available
            if (userData.allergies) {
              const allergies = userData.allergies.toLowerCase();
              // Skip exercises that might conflict with allergies
              if (ex.name.toLowerCase().includes('knee') && allergies.includes('knee')) {
                return;
              }
              if (ex.name.toLowerCase().includes('shoulder') && allergies.includes('shoulder')) {
                return;
              }
            }
            matchingExercises.push(ex.name);
          }
        });
      }
      
      if (matchingExercises.length > 0) {
        return `Good exercises for ${muscle}${userData.name ? ' for you, ' + userData.name : ''}, include: ${matchingExercises.slice(0, 5).join(', ')}`;
      }
    }
  }
  
  return `I can help with specific exercise techniques or recommend exercises for particular muscle groups${userData.name ? ', ' + userData.name : ''}. Try asking something like 'How to do a proper squat' or 'What are good chest exercises?'`;
};

const handleNutritionQuery = (input, userData = {}) => {
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
    
    // Use BMI to suggest appropriate goal if available
    if (userData.bmi) {
      if (userData.bmi > 25 && goal === 'maintenance') {
        goal = 'weightLoss';
      } else if (userData.bmi < 18.5 && goal === 'maintenance') {
        goal = 'muscleBuild';
      }
    }
    
    const macroInfo = nutrition.macros[goal];
    return `For ${goal.replace(/([A-Z])/g, ' $1').toLowerCase()}${userData.name ? ', ' + userData.name : ''}: ${macroInfo.formula}. ${macroInfo.example}. ${macroInfo.tips ? macroInfo.tips.join(' ') : ''}`;
  }
  
  // Check for diet type questions
  if (input.includes('vegetarian') || input.includes('vegan') || input.includes('plant')) {
    if (nutrition.mealPlans.vegetarian) {
      const vegPlan = nutrition.mealPlans.vegetarian.day1;
      return `Example vegetarian day${userData.name ? ' for you, ' + userData.name : ''}: Breakfast: ${vegPlan.breakfast}. Lunch: ${vegPlan.lunch}. Dinner: ${vegPlan.dinner}. Total macros: ${vegPlan.totalMacros || 'Not specified'}`;
    }
  }
  
  // Check for supplement questions
  if (input.includes('supplement') || input.includes('protein powder') || 
      input.includes('creatine') || input.includes('pre-workout')) {
    
    if (input.includes('pre-workout') || input.includes('before workout')) {
      const preWorkout = nutrition.supplements.preWorkout;
      return `Recommended pre-workout supplements${userData.name ? ' for you, ' + userData.name : ''}: ${preWorkout.ingredients.join(', ')}. Timing: ${preWorkout.timing}. Benefits: ${preWorkout.benefits}`;
    }
    
    // Generic supplement info
    return `The most evidence-based supplements${userData.name ? ' for you, ' + userData.name : ''} are: 1) Protein powder for convenience, 2) Creatine monohydrate for strength and power, 3) Caffeine for performance, and 4) Vitamin D if you have limited sun exposure.`;
  }
  
  return `I can help with nutrition questions about macronutrients, meal planning, or supplements${userData.name ? ', ' + userData.name : ''}. Try asking something like 'What macros should I eat for muscle gain?' or 'What supplements are worth taking?'`;
};

const generateFallbackResponse = (userData = {}) => {
  const fallbackResponses = [
    `I'm your fitness assistant${userData.name ? ', ' + userData.name : ''}. Ask me about workouts, exercises, nutrition, or fitness advice!`,
    `I can help with exercise techniques, workout programs, or nutrition guidance${userData.name ? ', ' + userData.name : ''}. What would you like to know?`,
    `Need help with your fitness journey${userData.name ? ', ' + userData.name : ''}? I can provide information on proper form, workout plans, or nutrition strategies.`,
    `Ask me about specific exercises, training programs, or nutrition advice for your fitness goals${userData.name ? ', ' + userData.name : ''}.`,
    `I'm here to support your fitness goals${userData.name ? ', ' + userData.name : ''}. Try asking about workout techniques, program design, or nutritional strategies.`
  ];
  
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};

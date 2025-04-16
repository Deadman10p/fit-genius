import { faq } from '../data/knowledge';
import { exercises } from '../data/exercises';
import { programs } from '../data/programs';
import { nutrition } from '../data/nutrition';

/**
 * Finds the most relevant answer based on user input and user data.
 * Tries local data first, then queries the AI API model if no match is found.
 * @param {string} userInput - The input provided by the user.
 * @param {Object} userData - Optional user-specific data for personalization.
 * @returns {Promise<string>} - The most relevant response.
 */
export const findRelevantAnswer = async (userInput, userData = {}) => {
  const input = userInput.toLowerCase();

  // Match FAQ questions
  const matchedFaq = faq.find(item =>
    item.question.toLowerCase().includes(input) || input.includes(item.question.toLowerCase())
  );
  if (matchedFaq) {
    return matchedFaq.answer;
  }

  // Personalized greeting
  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    return userData.name
      ? `Hi ${userData.name}! How can I help with your fitness journey today?`
      : `Hello! How can I assist you with your fitness goals today?`;
  }

  // Route user queries to specific handlers
  if (input.includes('workout') || input.includes('program') || input.includes('routine')) {
    return handleWorkoutQuery(input, userData);
  }
  if (input.includes('exercise') || input.includes('how to') || input.includes('form')) {
    return handleExerciseQuery(input, userData);
  }
  if (
    input.includes('diet') ||
    input.includes('nutrition') ||
    input.includes('food') ||
    input.includes('protein') ||
    input.includes('carb') ||
    input.includes('fat')
  ) {
    return handleNutritionQuery(input, userData);
  }

  // If no match is found in local data, query the AI API
  return await queryAIAPI(userInput, userData);
};

/**
 * Queries the external AI API model for a response.
 * @param {string} userInput - The input provided by the user.
 * @param {Object} userData - Optional user-specific data for personalization.
 * @returns {Promise<string>} - The AI-generated response.
 */
const queryAIAPI = async (userInput, userData = {}) => {
  const apiUrl = 'https://console.groq.com/v1/ai-response'; // Original API URL
  const apiKey = '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'; // Replace with your actual API key

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        input: userInput,
        userData,
      }),
    });

    if (!response.ok) {
      console.error('API Error Response:', await response.text());
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || "I'm sorry, I couldn't process your request.";
  } catch (error) {
    console.error('Error querying AI API:', error);
    return "I'm sorry, something went wrong. Please try again later.";
  }
};

export { queryAIAPI };

/**
 * Handles queries related to workout routines and programs.
 * @param {string} input - The user's input.
 * @param {Object} userData - Optional user-specific data for personalization.
 * @returns {string} - A response with a relevant workout program or guidance.
 */
const handleWorkoutQuery = (input, userData = {}) => {
  let level = 'beginner';
  if (input.includes('intermediate')) level = 'intermediate';
  if (input.includes('advanced')) level = 'advanced';

  if (userData.age && parseInt(userData.age) > 60) {
    level = 'beginner'; // Adjust for age
  }

  const sport = ['basketball', 'running'].find(s => input.includes(s));
  const allergiesNote = userData.allergies
    ? ` Based on your allergies (${userData.allergies}), avoid exercises that might cause discomfort.`
    : '';
  const durationNote = userData.workoutDuration
    ? ` I've tailored workouts to fit within your preferred ${userData.workoutDuration} timeframe.`
    : '';

  if (sport && programs.athlete?.[sport]) {
    return `Here's a ${sport} training program for you: ${programs.athlete[sport].phases[0].exercises.join(
      ', '
    )}.${allergiesNote}${durationNote}`;
  }

  if (programs[level]) {
    const program = programs[level];
    const firstDay = program.schedule[0];
    const exercises = firstDay.exercises.map(ex => ex.name).join(', ');
    return `Here's a ${level} level ${firstDay.focus} workout for you${userData.name ? ', ' + userData.name : ''}: ${exercises}. Day 1 of a ${program.schedule.length}-day program.${allergiesNote}${durationNote}`;
  }

  return `I can help you find a workout program based on your goals and experience level. Try asking something like "Show me a beginner full body workout."`;
};

/**
 * Handles queries related to specific exercises or muscle groups.
 * @param {string} input - The user's input.
 * @param {Object} userData - Optional user-specific data for personalization.
 * @returns {string} - A response with exercise techniques or recommendations.
 */
const handleExerciseQuery = (input, userData = {}) => {
  for (const category in exercises) {
    const found = exercises[category].find(ex =>
      input.includes(ex.name.toLowerCase()) || ex.name.toLowerCase().includes(input.replace('how to', '').trim())
    );
    if (found) {
      return `Here's how to do ${found.name}: ${found.steps.join(' ')}${found.tips ? ` Tips: ${found.tips}` : ''}`;
    }
  }

  return `I can help with exercise techniques or recommend exercises for particular muscle groups. Try asking something like "How to do a proper squat" or "What are good chest exercises?"`;
};

/**
 * Handles nutrition-related queries, including macronutrients, meal plans, and supplements.
 * @param {string} input - The user's input.
 * @param {Object} userData - Optional user-specific data for personalization.
 * @returns {string} - A response with nutrition advice or meal planning.
 */
const handleNutritionQuery = (input, userData = {}) => {
  let goal = 'maintenance';
  if (input.includes('lose weight') || input.includes('fat loss')) goal = 'weightLoss';
  if (input.includes('gain') || input.includes('bulk')) goal = 'muscleBuild';

  if (userData.bmi) {
    if (userData.bmi > 25) goal = 'weightLoss';
    if (userData.bmi < 18.5) goal = 'muscleBuild';
  }

  const macroInfo = nutrition.macros?.[goal];
  if (macroInfo) {
    return `For ${goal.replace(/([A-Z])/g, ' $1').toLowerCase()}: ${macroInfo.formula}. Example: ${macroInfo.example}.`;
  }

  return `I can help with nutrition questions about macronutrients, meal planning, or supplements. Try asking something like "What macros should I eat for muscle gain?"`;
};
import { faq } from '../data/knowledge'; // Corrected the import to use `faq` instead of `knowledge`
import { exercises } from '../data/exercises';
import { programs } from '../data/programs';
import { nutrition } from '../data/nutrition';

/**
 * Refactored repetitive patterns in query handlers into a utility function.
 * @param {string} input - The user's input.
 * @param {Object} userData - Optional user-specific data for personalization.
 * @param {Array} handlers - Array of handler objects with keywords and handler functions.
 * @returns {string|null} - The response from the matched handler or null.
 */
const handleQuery = (input, userData, handlers) => {
  for (const { keywords, handler } of handlers) {
    if (keywords.some(keyword => input.includes(keyword))) {
      return handler(input, userData);
    }
  }
  return null;
};

/**
 * Added localization support for responses
 * @param {string} key - The key for the response template.
 * @param {string} language - The language code for localization.
 * @param {Object} placeholders - Optional placeholders for dynamic content.
 * @returns {string} - The localized response.
 */
const getLocalizedResponse = (key, language = 'en', placeholders = {}) => {
  const translations = {
    en: {
      greeting: 'Hello! How can I assist you with your fitness goals today?',
      personalizedGreeting: 'Hi {name}! How can I help with your fitness journey today?',
      workoutSuggestion: 'I can help you find a workout program based on your goals and experience level. Try asking something like "Show me a beginner full body workout."',
    },
    es: {
      greeting: '¡Hola! ¿Cómo puedo ayudarte con tus objetivos de fitness hoy?',
      personalizedGreeting: '¡Hola {name}! ¿Cómo puedo ayudarte con tu viaje de fitness hoy?',
      workoutSuggestion: 'Puedo ayudarte a encontrar un programa de ejercicios basado en tus objetivos y nivel de experiencia. Intenta preguntar algo como "Muéstrame un entrenamiento completo para principiantes."',
    },
  };

  const template = translations[language]?.[key] || translations['en'][key];
  return Object.keys(placeholders).reduce(
    (str, placeholder) => str.replace(`{${placeholder}}`, placeholders[placeholder]),
    template
  );
};

/**
 * Finds the most relevant answer based on user input and user data.
 * Tries local data first, then queries the AI API model if no match is found.
 * @param {string} userInput - The input provided by the user.
 * @param {Object} userData - Optional user-specific data for personalization.
 * @param {string} language - The language code for localization.
 * @returns {Promise<string>} - The most relevant response.
 */
export const findRelevantAnswer = async (userInput, userData = {}, language = 'en') => {
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
      ? getLocalizedResponse('personalizedGreeting', language, { name: userData.name })
      : getLocalizedResponse('greeting', language);
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
// Improved error handling by categorizing errors and providing specific feedback
const queryAIAPI = async (userInput, userData = {}) => {
  const apiUrl = 'https://api.groq.com/openai/v1/chat/completions'; // Updated to the correct API endpoint

  const apiKey = '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';

  const relevantKnowledge = faq.filter(item => userInput.includes(item.question)); // Ensure relevantKnowledge is defined

  console.log('Sending request to AI API with payload:', {
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      { role: "system", content: "Use this data for context: " + JSON.stringify(relevantKnowledge) },
      { role: "user", content: userInput }
    ],
    n: 1
  });

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          { role: "system", content: "Use this data for context: " + JSON.stringify(relevantKnowledge) },
          { role: "user", content: userInput }
        ],
        n: 1
      }),
    });

    console.log('Received response from AI API:', response);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      } else if (response.status === 401) {
        throw new Error('Unauthorized access. Check your API key.');
      } else {
        throw new Error(`Unexpected error: ${response.status} - ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('Parsed API response:', data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from AI API.');
    }

    // Updated text wrapping for lists in responses
    if (Array.isArray(data.choices[0].message.content)) {
      return data.choices[0].message.content.join('\n'); // Join list items with newlines for better readability
    }

    return data.choices[0].message.content || "I'm sorry, I couldn't process your request.";
  } catch (error) {
    console.error('Error querying AI API:', error);
    return error.message || "I'm sorry, something went wrong. Please try again later.";
  }
};

export { queryAIAPI };

/**
 * Handles queries related to workout routines and programs.
 * @param {string} input - The user's input.
 * @param {Object} userData - Optional user-specific data for personalization.
 * @returns {string} - A response with a relevant workout program or guidance.
 */
// Add default values and checks for userData properties
const handleWorkoutQuery = (input, userData = {}) => {
  const { age = null, allergies = null, workoutDuration = null, name = null } = userData;

  let level = 'beginner';
  if (input.includes('intermediate')) level = 'intermediate';
  if (input.includes('advanced')) level = 'advanced';

  if (age && parseInt(age) > 60) {
    level = 'beginner'; // Adjust for age
  }

  const sport = ['basketball', 'running'].find(s => input.includes(s));
  const allergiesNote = allergies
    ? ` Based on your allergies (${allergies}), avoid exercises that might cause discomfort.`
    : '';
  const durationNote = workoutDuration
    ? ` I've tailored workouts to fit within your preferred ${workoutDuration} timeframe.`
    : '';

  if (!programs.athlete?.[sport] || !programs.athlete[sport].phases?.[0]?.exercises) {
    return `Sorry, I couldn't find a training program for ${sport}.`;
  }

  return `Here's a ${sport} training program for you: ${programs.athlete[sport].phases[0].exercises.join(', ')}.${allergiesNote}${durationNote}`;

  if (programs[level]) {
    const program = programs[level];
    const firstDay = program.schedule[0];
    const exercises = firstDay.exercises.map(ex => ex.name).join(', ');
    return `Here's a ${level} level ${firstDay.focus} workout for you${name ? ', ' + name : ''}: ${exercises}. Day 1 of a ${program.schedule.length}-day program.${allergiesNote}${durationNote}`;
  }

  return getLocalizedResponse('workoutSuggestion', userData.language || 'en');
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
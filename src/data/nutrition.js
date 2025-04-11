
export const nutrition = {
  macros: {
    weightLoss: {
      formula: "Protein: 1.2g/lb, Fat: 0.4g/lb, Carbs: Remainder",
      example: "180lb person: 216g P, 72g F, 150g C",
      calorieDeficit: "500 calories below maintenance",
      tips: [
        "Focus on high protein to preserve muscle mass",
        "Drink plenty of water to help with satiety",
        "Include fibrous vegetables with every meal",
        "Time carbs around workouts when possible"
      ]
    },
    maintenance: {
      formula: "Protein: 0.8-1g/lb, Fat: 0.4-0.5g/lb, Carbs: Remainder",
      example: "180lb person: 160g P, 80g F, 270g C",
      calorieTarget: "At calculated TDEE (Total Daily Energy Expenditure)",
      tips: [
        "Adjust based on activity level",
        "Monitor weight weekly and adjust as needed",
        "Focus on nutrient-dense foods"
      ]
    },
    muscleBuild: {
      formula: "Protein: 1g/lb, Fat: 0.4g/lb, Carbs: Higher for performance",
      example: "180lb person: 180g P, 72g F, 350g C",
      calorieSurplus: "300-500 calories above maintenance",
      tips: [
        "Prioritize protein distribution throughout the day",
        "Consume carbs before and after training",
        "Focus on quality weight gain of 0.5-1lb per week"
      ]
    }
  },
  
  mealPlans: {
    vegetarian: {
      day1: {
        breakfast: "Tofu scramble with spinach, peppers, and nutritional yeast. Whole grain toast with avocado.",
        macros: "Protein: 32g, Carbs: 45g, Fat: 18g",
        snack1: "Greek yogurt with berries and hemp seeds",
        lunch: "Quinoa bowl with roasted chickpeas, mixed vegetables, and tahini dressing",
        macros: "Protein: 28g, Carbs: 60g, Fat: 15g",
        snack2: "Protein smoothie with plant protein, banana, and almond butter",
        dinner: "Lentil pasta with vegetable marinara sauce and side salad",
        macros: "Protein: 35g, Carbs: 65g, Fat: 12g"
      },
      totalMacros: "Protein: 125g, Carbs: 220g, Fat: 60g, Calories: ~1900"
    },
    highProtein: {
      day1: {
        breakfast: "Egg white omelet with spinach, turkey, and low-fat cheese. Oatmeal with protein powder.",
        macros: "Protein: 45g, Carbs: 35g, Fat: 10g",
        snack1: "Greek yogurt with berries",
        lunch: "Grilled chicken breast, brown rice, and steamed broccoli",
        macros: "Protein: 40g, Carbs: 40g, Fat: 8g",
        snack2: "Protein shake with whey isolate",
        dinner: "Baked salmon, sweet potato, and asparagus",
        macros: "Protein: 35g, Carbs: 30g, Fat: 15g"
      },
      totalMacros: "Protein: 180g, Carbs: 170g, Fat: 45g, Calories: ~1800"
    }
  },
  
  supplements: {
    preWorkout: {
      ingredients: ["Citrulline Malate 6g", "Beta-Alanine 3g", "Caffeine 200mg", "L-Theanine 100mg"],
      timing: "30 mins pre-workout",
      benefits: "Improves blood flow, reduces fatigue, increases alertness",
      caution: "Start with half dose to assess tolerance"
    },
    recovery: {
      ingredients: ["Whey/Plant Protein 25g", "Creatine Monohydrate 5g", "Tart Cherry Extract 1g"],
      timing: "Within 30 minutes post-workout",
      benefits: "Supports muscle protein synthesis, reduces soreness, improves recovery"
    },
    daily: {
      ingredients: ["Vitamin D3 2000-5000 IU", "Fish Oil 2-3g", "Magnesium 300-400mg"],
      timing: "With meals for better absorption",
      benefits: "Supports overall health, recovery, and performance"
    }
  }
};

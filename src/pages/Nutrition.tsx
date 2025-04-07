
import React from 'react';
import Navbar from '@/components/Navbar';
import FitBot from '@/components/FitBot';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Utensils, Clock, PlusCircle, BookOpen, ShoppingBag } from 'lucide-react';

type MealType = {
  id: string;
  title: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number;
  image: string;
  tags: string[];
};

const mealData: MealType[] = [
  {
    id: '1',
    title: 'Protein-Packed Breakfast Bowl',
    description: 'Greek yogurt topped with fresh berries, honey, and granola for a protein-rich start to your day.',
    calories: 320,
    protein: 22,
    carbs: 40,
    fat: 8,
    prepTime: 10,
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=2187&auto=format&fit=crop',
    tags: ['Breakfast', 'High-Protein', 'Vegetarian']
  },
  {
    id: '2',
    title: 'Grilled Chicken Salad',
    description: 'Lean grilled chicken breast on a bed of mixed greens with avocado and light dressing.',
    calories: 380,
    protein: 35,
    carbs: 15,
    fat: 18,
    prepTime: 20,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
    tags: ['Lunch', 'High-Protein', 'Low-Carb']
  },
  {
    id: '3',
    title: 'Salmon with Roasted Vegetables',
    description: 'Baked salmon fillet with a side of colorful roasted vegetables seasoned with herbs.',
    calories: 420,
    protein: 32,
    carbs: 20,
    fat: 22,
    prepTime: 30,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2187&auto=format&fit=crop',
    tags: ['Dinner', 'Omega-3', 'Gluten-Free']
  },
  {
    id: '4',
    title: 'Protein Smoothie',
    description: 'Blend of protein powder, banana, spinach, almond milk, and peanut butter for a quick energy boost.',
    calories: 280,
    protein: 25,
    carbs: 30,
    fat: 8,
    prepTime: 5,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a90a0868?q=80&w=2071&auto=format&fit=crop',
    tags: ['Snack', 'Pre-Workout', 'Quick']
  },
  {
    id: '5',
    title: 'Quinoa Bowl with Vegetables',
    description: 'Protein-rich quinoa mixed with sautéed vegetables and topped with tahini sauce.',
    calories: 350,
    protein: 12,
    carbs: 45,
    fat: 14,
    prepTime: 25,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2153&auto=format&fit=crop',
    tags: ['Lunch', 'Vegan', 'Plant-Based']
  },
  {
    id: '6',
    title: 'Overnight Oats',
    description: 'Rolled oats soaked in almond milk with chia seeds, cinnamon, and fresh fruits.',
    calories: 310,
    protein: 14,
    carbs: 48,
    fat: 8,
    prepTime: 5,
    image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=2070&auto=format&fit=crop',
    tags: ['Breakfast', 'Meal-Prep', 'Vegetarian']
  }
];

const Nutrition = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Nutrition</h1>
            <p className="text-gray-600">Personalized meal plans to support your fitness goals</p>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="meal-plans" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="meal-plans" className="text-sm">
              <Utensils className="h-4 w-4 mr-2 md:mr-1" />
              <span className="hidden md:inline">Meal Plans</span>
            </TabsTrigger>
            <TabsTrigger value="recipes" className="text-sm">
              <BookOpen className="h-4 w-4 mr-2 md:mr-1" />
              <span className="hidden md:inline">Recipes</span>
            </TabsTrigger>
            <TabsTrigger value="grocery-list" className="text-sm">
              <ShoppingBag className="h-4 w-4 mr-2 md:mr-1" />
              <span className="hidden md:inline">Grocery List</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="meal-plans" className="bg-white p-4 rounded-lg shadow-sm mt-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Meal Plan</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Goal: Weight Loss</span>
                <Badge>1800 cal/day</Badge>
              </div>
            </div>
            
            <div className="space-y-6">
              {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((mealTime) => (
                <div key={mealTime} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-semibold mb-3">{mealTime}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mealData.filter((_, idx) => idx < 2).map((meal) => (
                      <MealCard key={meal.id} meal={meal} />
                    ))}
                    <Card className="fitness-card h-full border-dashed border-2 flex flex-col justify-center items-center p-6">
                      <PlusCircle className="h-10 w-10 text-gray-300 mb-2" />
                      <p className="text-gray-400 text-center text-sm">Add {mealTime} Option</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recipes" className="bg-white p-4 rounded-lg shadow-sm mt-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recipe Collection</h2>
              <Button className="fitness-button">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Recipe
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mealData.map((meal) => (
                <MealCard key={meal.id} meal={meal} showDetails />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="grocery-list" className="bg-white p-4 rounded-lg shadow-sm mt-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Weekly Grocery List</h2>
              <Button className="fitness-button">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Generate List
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <GroceryCategory title="Proteins" items={["Chicken breast (1 lb)", "Greek yogurt (32 oz)", "Eggs (dozen)", "Salmon fillet (1 lb)", "Tofu (14 oz)"]} />
              <GroceryCategory title="Fruits & Vegetables" items={["Spinach (10 oz)", "Broccoli (1 head)", "Sweet potatoes (3)", "Bananas (bunch)", "Blueberries (1 pint)", "Avocados (2)"]} />
              <GroceryCategory title="Grains & Legumes" items={["Quinoa (1 cup)", "Brown rice (2 cups)", "Rolled oats (16 oz)", "Black beans (15 oz can)", "Chickpeas (15 oz can)"]} />
              <GroceryCategory title="Misc & Condiments" items={["Olive oil", "Almond butter", "Protein powder", "Almond milk", "Chia seeds", "Honey"]} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* FitBot */}
      <FitBot />
    </div>
  );
};

interface MealCardProps {
  meal: MealType;
  showDetails?: boolean;
}

const MealCard: React.FC<MealCardProps> = ({ meal, showDetails = false }) => {
  return (
    <Card className="fitness-card h-full overflow-hidden flex flex-col">
      <div className="relative h-40 overflow-hidden">
        <img
          src={meal.image}
          alt={meal.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {meal.tags.slice(0, 1).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-base">{meal.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs">
          {meal.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 pb-2 flex-grow">
        <div className="flex text-xs text-gray-500 mb-2">
          <Clock className="h-3 w-3 mr-1" />
          <span>{meal.prepTime} min</span>
        </div>
        
        {showDetails && (
          <div className="grid grid-cols-4 gap-1 mt-2 text-xs">
            <div className="text-center">
              <p className="font-bold">{meal.calories}</p>
              <p className="text-gray-500">Cal</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{meal.protein}g</p>
              <p className="text-gray-500">Protein</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{meal.carbs}g</p>
              <p className="text-gray-500">Carbs</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{meal.fat}g</p>
              <p className="text-gray-500">Fat</p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full">
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
};

interface GroceryCategoryProps {
  title: string;
  items: string[];
}

const GroceryCategory: React.FC<GroceryCategoryProps> = ({ title, items }) => {
  return (
    <div>
      <h3 className="font-semibold mb-2 text-gold">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <input type="checkbox" id={`item-${title}-${index}`} className="rounded border-gray-300 text-gold focus:ring-gold" />
            <label htmlFor={`item-${title}-${index}`} className="text-sm">{item}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nutrition;

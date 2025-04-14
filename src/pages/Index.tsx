
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import BmiCalculator from '@/components/BmiCalculator';
import FitBot from '@/components/FitBot';
import DashboardStats from '@/components/DashboardStats';
import FeaturedWorkouts from '@/components/FeaturedWorkouts';
import { Button } from '@/components/ui/button';
import { ChevronRight, Dumbbell, Utensils, LineChart, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/workouts');
    } else {
      navigate('/login');
    }
  };

  const handleLearnMore = () => {
    // Scroll to the features section
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative py-12 mb-12 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center z-[-1]" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2940&auto=format&fit=crop')" }}
          ></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your AI-Powered <span className="text-gold">Fitness</span> Journey
            </h1>
            <p className="text-gray-200 mb-8 text-lg">
              Personalized workouts, nutrition plans, and motivation - all in one place
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="fitness-button" onClick={handleGetStarted}>
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent text-white border-white hover:bg-white/10"
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
        
        {/* Dashboard Stats */}
        <DashboardStats />
        
        {/* Features Section */}
        <section id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
          <FeatureCard 
            icon={<Dumbbell className="h-8 w-8 text-gold" />}
            title="Personalized Workouts"
            description="Get custom workout plans based on your fitness level and goals"
          />
          <FeatureCard 
            icon={<Utensils className="h-8 w-8 text-gold" />}
            title="Smart Nutrition"
            description="Meal plans tailored to your dietary preferences and goals"
          />
          <FeatureCard 
            icon={<LineChart className="h-8 w-8 text-gold" />}
            title="Progress Tracking"
            description="Monitor your fitness journey with detailed analytics"
          />
          <FeatureCard 
            icon={<Award className="h-8 w-8 text-gold" />}
            title="Rewards & Achievements"
            description="Earn badges and FitCoins as you reach your goals"
          />
        </section>
        
        {/* Featured Workouts */}
        <FeaturedWorkouts />
        
        {/* BMI Calculator Section */}
        <section className="my-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Know Your Fitness Level</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Use our BMI calculator to determine your fitness level and get personalized recommendations
            </p>
          </div>
          <BmiCalculator />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">FitGenius</h3>
              <p className="text-gray-400">Your AI-powered fitness companion for a healthier lifestyle.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-gold">Workouts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gold">Nutrition</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gold">Progress Tracking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gold">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-gold">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gold">Fitness Tips</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gold">Nutritional Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gold">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">support@fitgenius.com</li>
                <li className="text-gray-400">1-800-FIT-GENIUS</li>
                <li className="flex space-x-4 mt-4">
                  <a href="#" className="text-gray-400 hover:text-gold">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gold">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gold">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FitGenius. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* FitBot */}
      <FitBot />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="fitness-card text-center p-6">
      <div className="mx-auto bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
};

export default Index;

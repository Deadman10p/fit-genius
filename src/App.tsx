
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Workouts from './pages/Workouts';
import WorkoutDetail from './pages/WorkoutDetail';
import Nutrition from './pages/Nutrition';
import Progress from './pages/Progress';
import Community from './pages/Community';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import GymLocator from './pages/GymLocator';
import NotFound from './pages/NotFound';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import { useAuth } from './contexts/AuthContext';
import { useOnboarding } from './contexts/OnboardingContext';
import { Layout } from './components/Layout';

function App() {
  const location = useLocation();
  const { currentUser } = useAuth();
  const { onboardingData, isLoading } = useOnboarding();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Define routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/'];
  
  // Check if user needs onboarding
  useEffect(() => {
    if (currentUser && !isLoading) {
      setShowOnboarding(!onboardingData.completed);
    } else {
      setShowOnboarding(false);
    }
  }, [currentUser, onboardingData.completed, isLoading]);
  
  // Show onboarding if needed
  if (currentUser && showOnboarding && !publicRoutes.includes(location.pathname)) {
    return <OnboardingFlow />;
  }

  // For pages that need the Layout (sidebar)
  const withLayout = (Component: React.ComponentType) => {
    return currentUser ? (
      <Layout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Component />
        </motion.div>
      </Layout>
    ) : (
      <Navigate to="/login" replace />
    );
  };
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Index />
          </motion.div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={withLayout(Profile)} />
        <Route path="/workouts" element={withLayout(Workouts)} />
        <Route path="/workouts/:id" element={withLayout(WorkoutDetail)} />
        <Route path="/nutrition" element={withLayout(Nutrition)} />
        <Route path="/progress" element={withLayout(Progress)} />
        <Route path="/community" element={withLayout(Community)} />
        <Route path="/gym-locator" element={withLayout(GymLocator)} />
        <Route path="/settings" element={withLayout(Settings)} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;

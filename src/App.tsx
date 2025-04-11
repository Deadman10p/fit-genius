
import React from 'react';
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
import NotFound from './pages/NotFound';
import { useAuth } from './contexts/AuthContext';

function App() {
  const location = useLocation();
  const { currentUser } = useAuth();
  
  // Define routes that don't require authentication
  const publicRoutes = ['/login', '/signup'];
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <RequireAuth>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Index />
              </motion.div>
            </RequireAuth>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/workouts" 
          element={
            <RequireAuth>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Workouts />
              </motion.div>
            </RequireAuth>
          } 
        />
        <Route 
          path="/workouts/:id" 
          element={
            <RequireAuth>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <WorkoutDetail />
              </motion.div>
            </RequireAuth>
          } 
        />
        <Route 
          path="/nutrition" 
          element={
            <RequireAuth>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Nutrition />
              </motion.div>
            </RequireAuth>
          } 
        />
        <Route 
          path="/progress" 
          element={
            <RequireAuth>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Progress />
              </motion.div>
            </RequireAuth>
          } 
        />
        <Route 
          path="/community" 
          element={
            <RequireAuth>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Community />
              </motion.div>
            </RequireAuth>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <RequireAuth>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Settings />
              </motion.div>
            </RequireAuth>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
  
  function RequireAuth({ children }: { children: JSX.Element }) {
    if (!currentUser && !publicRoutes.includes(location.pathname)) {
      // Redirect to login if user is not authenticated and route is not public
      return <Navigate to="/login" replace />;
    }
    
    return children;
  }
}

export default App;

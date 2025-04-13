
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { ColorThemeProvider } from './contexts/ColorThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OnboardingProvider } from './contexts/OnboardingContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ColorThemeProvider>
          <Router>
            <AuthProvider>
              <OnboardingProvider>
                <App />
                <Toaster />
              </OnboardingProvider>
            </AuthProvider>
          </Router>
        </ColorThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

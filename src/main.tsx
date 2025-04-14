
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ColorThemeProvider } from './contexts/ColorThemeContext';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <ColorThemeProvider>
              <OnboardingProvider>
                <LanguageProvider>
                  <App />
                  <Toaster position="top-right" />
                </LanguageProvider>
              </OnboardingProvider>
            </ColorThemeProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

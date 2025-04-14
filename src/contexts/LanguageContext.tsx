
import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

// The available languages and translations
export const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
];

// Translations for each language
const translations: Record<string, Record<string, string>> = {
  en: {
    // General
    'app.name': 'FitGenius',
    'app.tagline': 'Your AI-Powered Fitness Journey',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.workouts': 'Workouts',
    'nav.nutrition': 'Nutrition',
    'nav.progress': 'Progress',
    'nav.community': 'Community',
    'nav.gymLocator': 'Gym Locator',
    'nav.settings': 'Settings',
    'nav.signOut': 'Sign Out',
    'nav.toggleTheme': 'Toggle Theme',
    
    // Dashboard
    'dashboard.welcome': 'Welcome Back',
    'dashboard.todayWorkout': 'Today\'s Workout',
    'dashboard.nutritionPlan': 'Nutrition Plan',
    'dashboard.viewAll': 'View All',
    'dashboard.upcomingWorkouts': 'Upcoming Workouts',
    'dashboard.recentProgress': 'Recent Progress',
    
    // Settings
    'settings.title': 'Settings',
    'settings.appearance': 'Appearance',
    'settings.darkMode': 'Dark Mode',
    'settings.language': 'Language',
    'settings.notification': 'Notification Preferences',
    'settings.email': 'Email Notifications',
    'settings.push': 'Push Notifications',
    'settings.inApp': 'In-App Alerts',
    'settings.password': 'Change Password',
    'settings.currentPassword': 'Current Password',
    'settings.newPassword': 'New Password',
    'settings.confirmPassword': 'Confirm New Password',
    'settings.update': 'Update Password',
    'settings.signOut': 'Sign Out',
  },
  es: {
    // General
    'app.name': 'FitGenius',
    'app.tagline': 'Tu viaje de fitness potenciado por IA',
    
    // Navigation
    'nav.dashboard': 'Panel',
    'nav.profile': 'Perfil',
    'nav.workouts': 'Entrenamientos',
    'nav.nutrition': 'Nutrición',
    'nav.progress': 'Progreso',
    'nav.community': 'Comunidad',
    'nav.gymLocator': 'Localizador de Gimnasios',
    'nav.settings': 'Configuración',
    'nav.signOut': 'Cerrar Sesión',
    'nav.toggleTheme': 'Cambiar Tema',
    
    // Dashboard
    'dashboard.welcome': 'Bienvenido de nuevo',
    'dashboard.todayWorkout': 'Entrenamiento de hoy',
    'dashboard.nutritionPlan': 'Plan de nutrición',
    'dashboard.viewAll': 'Ver todo',
    'dashboard.upcomingWorkouts': 'Próximos entrenamientos',
    'dashboard.recentProgress': 'Progreso reciente',
    
    // Settings
    'settings.title': 'Configuración',
    'settings.appearance': 'Apariencia',
    'settings.darkMode': 'Modo oscuro',
    'settings.language': 'Idioma',
    'settings.notification': 'Preferencias de notificación',
    'settings.email': 'Notificaciones por correo',
    'settings.push': 'Notificaciones push',
    'settings.inApp': 'Alertas en la aplicación',
    'settings.password': 'Cambiar contraseña',
    'settings.currentPassword': 'Contraseña actual',
    'settings.newPassword': 'Nueva contraseña',
    'settings.confirmPassword': 'Confirmar nueva contraseña',
    'settings.update': 'Actualizar contraseña',
    'settings.signOut': 'Cerrar sesión',
  },
  fr: {
    // General
    'app.name': 'FitGenius',
    'app.tagline': 'Votre parcours de fitness alimenté par l\'IA',
    
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.profile': 'Profil',
    'nav.workouts': 'Entraînements',
    'nav.nutrition': 'Nutrition',
    'nav.progress': 'Progrès',
    'nav.community': 'Communauté',
    'nav.gymLocator': 'Localisateur de salles',
    'nav.settings': 'Paramètres',
    'nav.signOut': 'Déconnexion',
    'nav.toggleTheme': 'Changer de thème',
    
    // Dashboard
    'dashboard.welcome': 'Bon retour',
    'dashboard.todayWorkout': 'Entraînement du jour',
    'dashboard.nutritionPlan': 'Plan nutritionnel',
    'dashboard.viewAll': 'Voir tout',
    'dashboard.upcomingWorkouts': 'Entraînements à venir',
    'dashboard.recentProgress': 'Progrès récents',
    
    // Settings
    'settings.title': 'Paramètres',
    'settings.appearance': 'Apparence',
    'settings.darkMode': 'Mode sombre',
    'settings.language': 'Langue',
    'settings.notification': 'Préférences de notification',
    'settings.email': 'Notifications par e-mail',
    'settings.push': 'Notifications push',
    'settings.inApp': 'Alertes dans l\'application',
    'settings.password': 'Changer le mot de passe',
    'settings.currentPassword': 'Mot de passe actuel',
    'settings.newPassword': 'Nouveau mot de passe',
    'settings.confirmPassword': 'Confirmer le nouveau mot de passe',
    'settings.update': 'Mettre à jour le mot de passe',
    'settings.signOut': 'Déconnexion',
  },
  de: {
    // General
    'app.name': 'FitGenius',
    'app.tagline': 'Ihre KI-gestützte Fitness-Reise',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profil',
    'nav.workouts': 'Workouts',
    'nav.nutrition': 'Ernährung',
    'nav.progress': 'Fortschritt',
    'nav.community': 'Gemeinschaft',
    'nav.gymLocator': 'Gym-Finder',
    'nav.settings': 'Einstellungen',
    'nav.signOut': 'Abmelden',
    'nav.toggleTheme': 'Thema wechseln',
    
    // Dashboard
    'dashboard.welcome': 'Willkommen zurück',
    'dashboard.todayWorkout': 'Heutiges Workout',
    'dashboard.nutritionPlan': 'Ernährungsplan',
    'dashboard.viewAll': 'Alle anzeigen',
    'dashboard.upcomingWorkouts': 'Kommende Workouts',
    'dashboard.recentProgress': 'Neueste Fortschritte',
    
    // Settings
    'settings.title': 'Einstellungen',
    'settings.appearance': 'Erscheinungsbild',
    'settings.darkMode': 'Dunkelmodus',
    'settings.language': 'Sprache',
    'settings.notification': 'Benachrichtigungseinstellungen',
    'settings.email': 'E-Mail-Benachrichtigungen',
    'settings.push': 'Push-Benachrichtigungen',
    'settings.inApp': 'In-App-Benachrichtigungen',
    'settings.password': 'Passwort ändern',
    'settings.currentPassword': 'Aktuelles Passwort',
    'settings.newPassword': 'Neues Passwort',
    'settings.confirmPassword': 'Neues Passwort bestätigen',
    'settings.update': 'Passwort aktualisieren',
    'settings.signOut': 'Abmelden',
  },
};

const defaultLanguage = 'en';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get the language from localStorage
    const savedLanguage = localStorage.getItem('fitgenius-language');
    return savedLanguage || defaultLanguage;
  });

  // When language changes, update localStorage
  useEffect(() => {
    localStorage.setItem('fitgenius-language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) {
      return translations[defaultLanguage][key] || key;
    }
    return translations[language][key] || translations[defaultLanguage][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

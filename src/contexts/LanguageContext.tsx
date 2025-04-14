
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
    'settings.themeColors': 'Theme Colors',
    'settings.colorGold': 'Gold',
    'settings.colorRed': 'Red',
    'settings.colorBlue': 'Blue',
    'settings.colorGreen': 'Green',
    
    // Profile
    'profile.user': 'User',
    'profile.personalInfo': 'Personal Information',
    'profile.profileInfo': 'Your profile information from your account',
    'profile.name': 'Name',
    'profile.age': 'Age',
    'profile.email': 'Email',
    'profile.notProvided': 'Not provided',
    'profile.workoutPreferences': 'Workout Preferences',
    'profile.workoutSettings': 'Your workout settings and preferences',
    'profile.workoutDuration': 'Workout Duration',
    'profile.workoutDays': 'Workout Days',
    'profile.height': 'Height',
    'profile.weight': 'Weight',
    'profile.allergies': 'Allergies',
    'profile.none': 'None',
    'profile.bmi': 'BMI',
    
    // Community
    'community.title': 'Community',
    'community.description': 'Connect with fitness enthusiasts',
    'community.leaderboard': 'Leaderboard',
    'community.rank': 'Rank',
    'community.user': 'User',
    'community.points': 'Points',
    'community.streak': 'Streak',
    'community.forums': 'Forums',
    'community.events': 'Upcoming Events',
    'community.joinEvent': 'Join',
    'community.viewAll': 'View All',
    
    // Workouts
    'workouts.title': 'Workouts',
    'workouts.description': 'Find the perfect workout for your fitness level and goals',
    'workouts.custom': 'Create Custom Workout',
    'workouts.search': 'Search workouts...',
    'workouts.allLevels': 'All Levels',
    'workouts.beginner': 'Beginner',
    'workouts.intermediate': 'Intermediate',
    'workouts.advanced': 'Advanced',
    'workouts.allCategories': 'All Categories',
    'workouts.hiit': 'HIIT',
    'workouts.strength': 'Strength',
    'workouts.cardio': 'Cardio',
    'workouts.yoga': 'Yoga',
    'workouts.noResults': 'No workouts found matching your criteria',
    'workouts.clearFilters': 'Clear Filters',
    'workouts.error': 'Error loading workouts. Please try again later.',
    'workouts.retry': 'Retry',
    
    // FitBot
    'fitbot.welcome': 'Hi there! I\'m your FitBot assistant. How can I help with your fitness journey today?',
    'fitbot.assistant': 'FitBot AI Assistant',
    'fitbot.placeholder': 'Ask about workout tips...',
    'fitbot.error': 'Something went wrong with the chat. Please try again.',
  },
  es: {
    // General
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
    'settings.themeColors': 'Colores de tema',
    'settings.colorGold': 'Dorado',
    'settings.colorRed': 'Rojo',
    'settings.colorBlue': 'Azul',
    'settings.colorGreen': 'Verde',
    
    // Profile
    'profile.user': 'Usuario',
    'profile.personalInfo': 'Información Personal',
    'profile.profileInfo': 'La información de tu perfil',
    'profile.name': 'Nombre',
    'profile.age': 'Edad',
    'profile.email': 'Correo electrónico',
    'profile.notProvided': 'No proporcionado',
    'profile.workoutPreferences': 'Preferencias de Entrenamiento',
    'profile.workoutSettings': 'Tus configuraciones y preferencias de entrenamiento',
    'profile.workoutDuration': 'Duración del Entrenamiento',
    'profile.workoutDays': 'Días de Entrenamiento',
    'profile.height': 'Altura',
    'profile.weight': 'Peso',
    'profile.allergies': 'Alergias',
    'profile.none': 'Ninguna',
    'profile.bmi': 'IMC',
    
    // Community
    'community.title': 'Comunidad',
    'community.description': 'Conéctate con entusiastas del fitness',
    'community.leaderboard': 'Clasificación',
    'community.rank': 'Rango',
    'community.user': 'Usuario',
    'community.points': 'Puntos',
    'community.streak': 'Racha',
    'community.forums': 'Foros',
    'community.events': 'Próximos Eventos',
    'community.joinEvent': 'Unirse',
    'community.viewAll': 'Ver Todo',
    
    // Workouts
    'workouts.title': 'Entrenamientos',
    'workouts.description': 'Encuentra el entrenamiento perfecto para tu nivel y objetivos',
    'workouts.custom': 'Crear Entrenamiento Personalizado',
    'workouts.search': 'Buscar entrenamientos...',
    'workouts.allLevels': 'Todos los Niveles',
    'workouts.beginner': 'Principiante',
    'workouts.intermediate': 'Intermedio',
    'workouts.advanced': 'Avanzado',
    'workouts.allCategories': 'Todas las Categorías',
    'workouts.hiit': 'HIIT',
    'workouts.strength': 'Fuerza',
    'workouts.cardio': 'Cardio',
    'workouts.yoga': 'Yoga',
    'workouts.noResults': 'No se encontraron entrenamientos con ese criterio',
    'workouts.clearFilters': 'Borrar Filtros',
    'workouts.error': 'Error al cargar entrenamientos. Inténtalo de nuevo.',
    'workouts.retry': 'Reintentar',
    
    // FitBot
    'fitbot.welcome': '¡Hola! Soy tu asistente FitBot. ¿Cómo puedo ayudarte con tu viaje fitness hoy?',
    'fitbot.assistant': 'Asistente de IA FitBot',
    'fitbot.placeholder': 'Pregunta sobre consejos de entrenamiento...',
    'fitbot.error': 'Algo salió mal con el chat. Por favor, intenta de nuevo.',
  },
  fr: {
    // General
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
    'settings.themeColors': 'Couleurs du thème',
    'settings.colorGold': 'Or',
    'settings.colorRed': 'Rouge',
    'settings.colorBlue': 'Bleu',
    'settings.colorGreen': 'Vert',
    
    // Profile
    'profile.user': 'Utilisateur',
    'profile.personalInfo': 'Informations personnelles',
    'profile.profileInfo': 'Vos informations de profil',
    'profile.name': 'Nom',
    'profile.age': 'Âge',
    'profile.email': 'E-mail',
    'profile.notProvided': 'Non fourni',
    'profile.workoutPreferences': 'Préférences d\'entraînement',
    'profile.workoutSettings': 'Vos paramètres et préférences d\'entraînement',
    'profile.workoutDuration': 'Durée d\'entraînement',
    'profile.workoutDays': 'Jours d\'entraînement',
    'profile.height': 'Taille',
    'profile.weight': 'Poids',
    'profile.allergies': 'Allergies',
    'profile.none': 'Aucune',
    'profile.bmi': 'IMC',
    
    // Community
    'community.title': 'Communauté',
    'community.description': 'Connectez-vous avec des passionnés de fitness',
    'community.leaderboard': 'Classement',
    'community.rank': 'Rang',
    'community.user': 'Utilisateur',
    'community.points': 'Points',
    'community.streak': 'Série',
    'community.forums': 'Forums',
    'community.events': 'Événements à venir',
    'community.joinEvent': 'Rejoindre',
    'community.viewAll': 'Voir tout',
    
    // Workouts
    'workouts.title': 'Entraînements',
    'workouts.description': 'Trouvez l\'entraînement parfait pour votre niveau et vos objectifs',
    'workouts.custom': 'Créer un entraînement personnalisé',
    'workouts.search': 'Rechercher des entraînements...',
    'workouts.allLevels': 'Tous les niveaux',
    'workouts.beginner': 'Débutant',
    'workouts.intermediate': 'Intermédiaire',
    'workouts.advanced': 'Avancé',
    'workouts.allCategories': 'Toutes les catégories',
    'workouts.hiit': 'HIIT',
    'workouts.strength': 'Force',
    'workouts.cardio': 'Cardio',
    'workouts.yoga': 'Yoga',
    'workouts.noResults': 'Aucun entraînement trouvé correspondant à vos critères',
    'workouts.clearFilters': 'Effacer les filtres',
    'workouts.error': 'Erreur lors du chargement des entraînements. Veuillez réessayer.',
    'workouts.retry': 'Réessayer',
    
    // FitBot
    'fitbot.welcome': 'Bonjour! Je suis votre assistant FitBot. Comment puis-je vous aider dans votre parcours fitness aujourd\'hui?',
    'fitbot.assistant': 'Assistant IA FitBot',
    'fitbot.placeholder': 'Demandez des conseils d\'entraînement...',
    'fitbot.error': 'Une erreur s\'est produite avec le chat. Veuillez réessayer.',
  },
  de: {
    // General
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
    'settings.themeColors': 'Themenfarben',
    'settings.colorGold': 'Gold',
    'settings.colorRed': 'Rot',
    'settings.colorBlue': 'Blau',
    'settings.colorGreen': 'Grün',
    
    // Profile
    'profile.user': 'Benutzer',
    'profile.personalInfo': 'Persönliche Informationen',
    'profile.profileInfo': 'Ihre Profilinformationen',
    'profile.name': 'Name',
    'profile.age': 'Alter',
    'profile.email': 'E-Mail',
    'profile.notProvided': 'Nicht angegeben',
    'profile.workoutPreferences': 'Workout-Präferenzen',
    'profile.workoutSettings': 'Ihre Workout-Einstellungen und Präferenzen',
    'profile.workoutDuration': 'Workout-Dauer',
    'profile.workoutDays': 'Workout-Tage',
    'profile.height': 'Größe',
    'profile.weight': 'Gewicht',
    'profile.allergies': 'Allergien',
    'profile.none': 'Keine',
    'profile.bmi': 'BMI',
    
    // Community
    'community.title': 'Gemeinschaft',
    'community.description': 'Verbinde dich mit Fitness-Enthusiasten',
    'community.leaderboard': 'Bestenliste',
    'community.rank': 'Rang',
    'community.user': 'Benutzer',
    'community.points': 'Punkte',
    'community.streak': 'Serie',
    'community.forums': 'Foren',
    'community.events': 'Kommende Veranstaltungen',
    'community.joinEvent': 'Beitreten',
    'community.viewAll': 'Alle anzeigen',
    
    // Workouts
    'workouts.title': 'Workouts',
    'workouts.description': 'Finden Sie das perfekte Workout für Ihr Fitnesslevel und Ihre Ziele',
    'workouts.custom': 'Eigenes Workout erstellen',
    'workouts.search': 'Workouts suchen...',
    'workouts.allLevels': 'Alle Levels',
    'workouts.beginner': 'Anfänger',
    'workouts.intermediate': 'Fortgeschritten',
    'workouts.advanced': 'Experte',
    'workouts.allCategories': 'Alle Kategorien',
    'workouts.hiit': 'HIIT',
    'workouts.strength': 'Kraft',
    'workouts.cardio': 'Cardio',
    'workouts.yoga': 'Yoga',
    'workouts.noResults': 'Keine Workouts gefunden, die Ihren Kriterien entsprechen',
    'workouts.clearFilters': 'Filter löschen',
    'workouts.error': 'Fehler beim Laden der Workouts. Bitte versuche es erneut.',
    'workouts.retry': 'Wiederholen',
    
    // FitBot
    'fitbot.welcome': 'Hallo! Ich bin dein FitBot-Assistent. Wie kann ich dir heute bei deiner Fitness-Reise helfen?',
    'fitbot.assistant': 'FitBot KI-Assistent',
    'fitbot.placeholder': 'Fragen Sie nach Workout-Tipps...',
    'fitbot.error': 'Etwas ist mit dem Chat schiefgelaufen. Bitte versuche es erneut.',
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

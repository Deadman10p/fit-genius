
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { app } from "@/config/firebase";

// Initialize Firebase Analytics
let analytics: any = null;

// Initialize analytics asynchronously
async function initAnalytics() {
  try {
    if (await isSupported()) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized successfully");
    } else {
      console.warn("Firebase Analytics not supported in this environment");
    }
  } catch (error) {
    console.error("Error initializing Firebase Analytics:", error);
  }
}

// Initialize analytics when the module is loaded
initAnalytics();

/**
 * Log an event to Firebase Analytics
 * @param eventName The name of the event to log
 * @param eventParams Optional parameters to include with the event
 */
export const logAnalyticsEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (!analytics) {
    // Analytics not initialized yet
    console.warn(`Analytics not initialized. Event not logged: ${eventName}`);
    return;
  }

  try {
    logEvent(analytics, eventName, eventParams);
    console.log(`Logged analytics event: ${eventName}`, eventParams);
  } catch (error) {
    console.error(`Error logging analytics event (${eventName}):`, error);
  }
};

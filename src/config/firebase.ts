
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  browserLocalPersistence,
  setPersistence,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// Update with your Firebase project details
const firebaseConfig = {
  apiKey: "AIzaSyC_3mO1MJEoVNbhO9SeC5bFD6UiNWWo__M",
  authDomain: "fit-genius-f6318.firebaseapp.com",
  projectId: "fit-genius-f6318",
  storageBucket: "fit-genius-f6318.firebasestorage.app",
  messagingSenderId: "350597158093",
  appId: "1:350597158093:web:54529a4846348b03cb4584",
  measurementId: "G-RY8VTQFGQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Enable Firebase Auth persistence to keep users logged in
// This ensures the user session persists across page refreshes
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set successfully");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Function to update user password with reauthentication
const updateUserPassword = async (currentPassword: string, newPassword: string) => {
  const user = auth.currentUser;
  
  if (!user || !user.email) {
    throw new Error("User not logged in or email not available");
  }
  
  try {
    // Reauthenticate user before changing password
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    
    // Update password
    await updatePassword(user, newPassword);
    return true;
  } catch (error: any) {
    console.error("Error updating password:", error);
    
    // Provide better error messages
    if (error.code === 'auth/wrong-password') {
      throw new Error('Current password is incorrect');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('New password is too weak');
    } else if (error.code === 'auth/requires-recent-login') {
      throw new Error('Please log in again before updating your password');
    } else {
      throw error;
    }
  }
};

// Add error handler to catch initialization issues
try {
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { 
  app,
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged,
  updateUserPassword
};

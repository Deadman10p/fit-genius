import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  browserLocalPersistence,
  setPersistence
} from "firebase/auth";

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

// Add error handler to catch initialization issues
try {
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged
};

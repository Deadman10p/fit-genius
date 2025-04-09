import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_3mO1MJEoVNbhO9SeC5bFD6UiNWWo__M",
  authDomain: "fit-genius-f6318.firebaseapp.com",
  projectId: "fit-genius-f6318",
  storageBucket: "fit-genius-f6318.appspot.com",
  messagingSenderId: "350597158093",
  appId: "1:350597158093:web:54529a4846348b03cb4584",
  measurementId: "G-RY8VTQFGQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Enable Firebase Auth persistence to keep users logged in
// This ensures the user session persists across page refreshes
auth.setPersistence("local");

export { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged
};

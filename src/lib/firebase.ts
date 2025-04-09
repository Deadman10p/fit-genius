
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from "firebase/auth";

// Your web app's Firebase configuration from index.html
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

export { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged
};

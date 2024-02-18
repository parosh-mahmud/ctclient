// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkSI4rDU1GEJMsHlAMnI4rJQ1RD7OymqI",
  authDomain: "thecityflyerss.firebaseapp.com",
  databaseURL: "https://thecityflyerss-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thecityflyerss",
  storageBucket: "thecityflyerss.appspot.com",
  messagingSenderId: "690134396377",
  appId: "1:690134396377:web:b9d2b9e27ea987df59bdc8",
  measurementId: "G-TMRQV9GMV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const dbRealtime = getDatabase(app);
const useAuth = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // You can return user data or handle it as needed
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

 const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  return {
    signInWithGoogle,
    signOut,
    // ... (other authentication functions)
  };
};

export { useAuth,auth };
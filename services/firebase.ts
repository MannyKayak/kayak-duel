import { firebaseConfig } from "@/firebaseConfig";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  User,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

// esegue un login anonimo se l'utente non è autenticato
export const initAuth = async (): Promise<User> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("✅ Logged in as:", user.uid);
        resolve(user);
      } else {
        // utente non ancora loggato (nuovo utente)
        try {
          const cred = await signInAnonymously(auth);
          console.log("✅ Signed in anonymously:", cred.user.uid);
          resolve(cred.user);
        } catch (error) {
          console.error("❌ Auth error:", error);
          reject(error);
        }
      }
    });
  });
};

export { analytics, auth, db, firebaseApp };

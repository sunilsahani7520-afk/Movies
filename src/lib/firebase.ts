import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, set, remove, update, query, orderByChild, equalTo, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAp-Tk7DAu6fZCY214QmVr0Q3VVeCetQlk",
  authDomain: "movies-5f325.firebaseapp.com",
  databaseURL: "https://movies-5f325-default-rtdb.firebaseio.com",
  projectId: "movies-5f325",
  storageBucket: "movies-5f325.firebasestorage.app",
  messagingSenderId: "446677150841",
  appId: "1:446677150841:web:c15d24d9cf33f243c5b8a8"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { ref, onValue, push, set, remove, update, query, orderByChild, equalTo, get, signInWithEmailAndPassword, signOut, signInWithPopup };

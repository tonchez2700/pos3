import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './../config/defines'
import {
  doc,
  query,
  where,
  addDoc,
  setDoc,
  getDoc,
  orderBy,
  getDocs,
  collection,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  doc,
  query,
  where,
  addDoc,
  setDoc,
  getDoc,
  orderBy,
  getDocs,
  collection,
  onSnapshot,
  getFirestore,
}
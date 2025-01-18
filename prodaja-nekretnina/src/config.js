import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBN4IvGbCsCHx03XfNu-dBXhDn-tThr5S0",
  authDomain: "prodaja-nekretnina-54d74.firebaseapp.com",
  projectId: "prodaja-nekretnina-54d74",
  storageBucket: "prodaja-nekretnina-54d74.appspot.com",
  messagingSenderId: "340456902915",
  appId: "1:340456902915:web:581e7cdaef6bd30e421936"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
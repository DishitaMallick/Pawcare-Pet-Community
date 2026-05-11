import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAF0Pmp2G2YnZ0V07TzLQwlONN3kT3eNkk",
    authDomain: "pawcare-e7f68.firebaseapp.com",
    projectId: "pawcare-e7f68",
    storageBucket: "pawcare-e7f68.firebasestorage.app",
    messagingSenderId: "51471437695",
    appId: "1:51471437695:web:fe281f07f19421856e144a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
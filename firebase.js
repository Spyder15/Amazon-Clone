import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGQMM83vHCtW1TxnfQtXLLWpJuQiY4Ry4",
  authDomain: "clone-c21e9.firebaseapp.com",
  projectId: "clone-c21e9",
  storageBucket: "clone-c21e9.appspot.com",
  messagingSenderId: "803067765387",
  appId: "1:803067765387:web:2983c8d25276286e7c2a8e",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);

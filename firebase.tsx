// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBzFdjMjoYwex1wW0IGsvfrc7V5L4JcUEc',
  authDomain: 'authapp-fe1d0.firebaseapp.com',
  databaseURL: 'https://authapp-fe1d0.firebaseapp.com',
  projectId: 'authapp-fe1d0',
  storageBucket: 'authapp-fe1d0.appspot.com',
  messagingSenderId: '26585919598',
  appId: '1:26585919598:web:6d0796833742beace8767f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth: any = getAuth();
export const db = getFirestore(app);
export default app;

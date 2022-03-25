import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCXcXWImvPluBohKfgBr2fIfUR4ovBH8c4",
    authDomain: "crud-firebase-react-9acdb.firebaseapp.com",
    projectId: "crud-firebase-react-9acdb",
    storageBucket: "crud-firebase-react-9acdb.appspot.com",
    messagingSenderId: "1001260783350",
    appId: "1:1001260783350:web:8acb475f7169ca18f13ed7"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
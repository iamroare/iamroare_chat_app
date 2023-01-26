

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
// import 'firebase/compat/storage';
import {getStorage} from "firebase/storage";
const firebaseConfig=  {
    apiKey: "AIzaSyCJud5grTdmDAIUYXJjZmFKPSzc0Hbehb4",
    authDomain: "chatapp1-a8068.firebaseapp.com",
    projectId: "chatapp1-a8068",
    storageBucket: "chatapp1-a8068.appspot.com",
    messagingSenderId: "114958490356",
    appId: "1:114958490356:web:2d9e4ea8d80d5929471ca1"
  };

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
// const db = firebaseApp.firestore();
const db= getFirestore();
const auth = firebase.auth();
// const storage = firebase.getStorage();
// const storage = getStorage(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db,storage };

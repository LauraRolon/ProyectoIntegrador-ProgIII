import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC2hA_iRtbWdTZIRZdvllWjZ0RO1Z-5swI",
    authDomain: "progiii-integrador.firebaseapp.com",
    projectId: "progiii-integrador",
    storageBucket: "progiii-integrador.appspot.com",
    messagingSenderId: "164036583765",
    appId: "1:164036583765:web:b86707864ad67e49abcfdc",
    measurementId: "G-NTK6J3K71T"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
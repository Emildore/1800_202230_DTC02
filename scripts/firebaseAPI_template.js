//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {

  apiKey: "AIzaSyC9X1-phP90RRp0E63tDMXIym_CmsnMEpU",

  authDomain: "motivational-app-6a564.firebaseapp.com",

  projectId: "motivational-app-6a564",

  storageBucket: "motivational-app-6a564.appspot.com",

  messagingSenderId: "621250893228",

  appId: "1:621250893228:web:3e687a070f4ccf932f9609",

  measurementId: "G-3009NRPSBN"

};


//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
 apiKey: "AIzaSyBp7W8iv5fgxQgrpfXFhKfgKB12SqN03xQ",
  authDomain: "fir-ca432.firebaseapp.com",
  projectId: "fir-ca432",
  storageBucket: "fir-ca432.appspot.com",
  messagingSenderId: "1086739998382",
  appId: "1:1086739998382:web:d21460935b287b0df1af3f"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
import firebase from 'firebase';
import "firebase/storage";


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA9luJm3YpVCS8g6TTEaT6LnFcWgJa8jYI",
  authDomain: "react-menu-planning.firebaseapp.com",
  databaseURL: "https://react-menu-planning.firebaseio.com",
  projectId: "react-menu-planning",
  storageBucket: "react-menu-planning.appspot.com",
  messagingSenderId: "597760389513",
  appId: "1:597760389513:web:f1bcd0bfb857ce78ab7158",
  measurementId: "G-W699RKCGKP",
};
// Initialize Firebase
 firebase.initializeApp(firebaseConfig);



const storage = firebase.storage();

export {storage, firebase as default};



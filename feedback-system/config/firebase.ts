

import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import 'firebase/auth';
import 'firebase/compat/auth';



const firebaseConfig = {
  apiKey: "AIzaSyAXYvnHOA6k9Co1Z2qWZb5__BwvlWx9b7E",
  authDomain: "feedback-72487.firebaseapp.com",
  projectId: "feedback-72487",
  storageBucket: "feedback-72487.appspot.com",
  messagingSenderId: "66075545319",
  appId: "1:66075545319:web:1399e4731bbd7006addc42"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

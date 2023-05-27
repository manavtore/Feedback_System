import { useState } from "react";
import "./styles/login.css";
import firebase from "firebase/compat/app";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
//  import { Route, Router } from "react-router-dom";



// interface obj {
//   userName: string;
//   passWord: string;
// }
interface props {
  // Name:string;
  // Word:string;
  isTrue: (check: boolean) => void;
}

// let Accessors: obj = {
//   userName: "SUSHANT",
//   passWord: "9860336973",
// };

const LoginPage = () => {

const [email,setEmail]=useState('');

const [PassWord,setPassword]=useState('');

const [error,setError]=useState('');
  


const handellogin = async() =>
{
try{
  await signInWithEmailAndPassword(auth, email, PassWord)
  setError('');
  console.group('User logged in successfully!');
}catch(error){
  setError('Faild to login check the credentials,');
  console.error('error logging in',error);
}


}

 

  return (
    <div>
      <h1
        className="
        heading"
      >
        WELCOME TO FEEDBACK SYSTEM
      </h1>
      <div className="center">
        <h2>Login</h2>
      </div>
      <div className="login">
        
        <div className="loginForm">
          <input
          type="text" 
          placeholder="Email"
          value={email}  
          onChange={(e) => setEmail(e.target.value) }
          />
         

          <input
            type="password"
            placeholder="password"
            value={PassWord}
            onChange={(e) => setPassword(e.target.value) }
            />

          

          <button onClick={() => handellogin()}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

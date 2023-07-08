import { useState } from "react";
import { auth } from "../config/firebase";
import "./styles/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { Route, Router } from "react-router-dom";

interface obj {
  userName: string;
  passWord: string;
}

const LoginPage = () => {
  let [username, setName] = useState("");
  let [password, setPass] = useState("");

  const signin = async () => {
    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(auth.currentUser?.email);


  return (
    <div className="body">
      <div>
        <h1
          className="
        heading"
        >
          WELCOME TO FEEDBACK SYSTEM
        </h1>
      </div>

      <div className="login">
        
        <div className="loginForm">
          <h1>LOGIN</h1>
          <input
          type="text" 
          placeholder="Email"
          value={email}  
          onChange={(e) => setEmail(e.target.value) }
          />
         

          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          ></input>
          <button onClick={signin}>SUBMIT</button>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;

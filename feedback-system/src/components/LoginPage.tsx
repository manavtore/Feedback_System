import { useState } from "react";
import "./styles/login.css";
// import { Route, Router } from "react-router-dom";

interface obj {
  userName: string;
  passWord: string;
}
interface props {
  // Name:string;
  // Word:string;
  isTrue: (check: boolean) => void;
}

let Accessors: obj = {
  userName: "SUSHANT",
  passWord: "9860336973",
};

const LoginPage = (Props: props) => {
  let [username, setName] = useState("");
  let [password, setPass] = useState("");

  function handler() {
    if (Accessors.userName === username && Accessors.passWord === password) {
      console.log("SUCCESS");
      Props.isTrue(true);
    } else {
      console.warn("RETEY AGAIN");
      Props.isTrue(false);
    }
    // setpData([
    //   {
    //     userName: username,
    //     passWord: password,
    //   },
    // ]);
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
            placeholder="USERNAME"
            value={username}
            onChange={(e) => {
              setName(e.target.value);
              console.log(username);
            }}
          ></input>
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          ></input>
          <button onClick={() => handler()}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

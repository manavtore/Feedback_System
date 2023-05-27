import ImageInfo from "./imageInfo";
import { Link } from "react-router-dom";
import React, { Dispatch, SetStateAction } from 'react';
import "./styles/home.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { User } from "firebase/auth";

interface HomeProps  {
  setLoggedIn: Dispatch<SetStateAction<User | null>>
}

const Home = ({setLoggedIn}: HomeProps) => {
  return (
    

    <main>
      <h3>AMPLIFY YOUR VOICE WITH FEEDBACK SYSTEM</h3>
      <div className="img-txt">
        <div className="info">
          Feedback is one of the most effective teaching and learning techniques
          that puts out a direct impact on both teaching and learning process
          that has an immediate impact on the process of acquiring knowledge
        </div>
        <img src="src\components\images\feedback_img.jpg" alt="" />
      </div>
      <Link to="/ranking">
        <button className="blue-btn">Ranking</button>
      </Link>
      <Link to="/portal">
        <button className="white-btn">Feedback</button>
      </Link>
      <Link to={`/`}>
      <button onClick={() => {
        signOut(auth)
        setLoggedIn(null)
      }}>hello</button>
      </Link>
      <ImageInfo></ImageInfo>
    </main>
  );
};

export default Home;

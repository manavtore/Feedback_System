// import FrontPage from "./components/FrontPage";
// import LoginPage from "./components/LoginPage";
// import Portal from "./components/FeedbackPortal.tsx";
// import { useState } from "react";
// import Ranking from "./components/Ranking";

// import { Route, Routes } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Ranking from "./components/Ranking";
import Portal from "./components/FeedbackPortal";
import Navbar from "./components/Navbar";
import React from 'react';

const App = () => {
  // const handler = (check: boolean) => {
  //   if (check == true) {
  //     console.log("hurray");
  //   }
  // };
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/portal" element={<Portal />} />
        </Route>
      </Routes>
      <footer>
        <div className="images">
          <img src="src\components\images\fb_icon_325x325.png" alt="fb"></img>
          <img
            src="src\components\images\pngtree-whatsapp-icon-social-media-png-image_9015284.png"
            alt="whatsapp"
          ></img>
          <img
            src="src\components\images\Gmail_icon_(2020).svg.webp"
            alt="gmail"
          ></img>
        </div>
        <div className="text">© ALL RIGHTS RESERVED</div>
      </footer>
    </>
  );
};

export default App;

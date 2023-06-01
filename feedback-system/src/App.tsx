import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Ranking from "./components/Ranking";
import Portal from "./components/FeedbackPortal";
import Navbar from "./components/Navbar";
import { auth } from "./config/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import LoginPage from "./components/LoginPage";
import { signOut } from "firebase/auth";
import AdminNav from "./components/Admin/AdminNav";
import AdminHome from "./components/Admin/AdminHome";
import Personal from "./components/Admin/Personal";
import Rank from "./components/Admin/Rank";
import Commondata from "./components/Admin/Commondata";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <>
      {!user ? (
        <LoginPage />
      ) : (
        <>
          {user?.email === "toremanav@gmail.com" ? (
            <>
              <Routes>
                <Route path="/" element={<AdminNav />}>
                  <Route index element={<AdminHome />} />
                  <Route path="/personal" element={<Personal />} />
                  <Route path="/rank" element={<Rank />} />
                  <Route path="/CommonData" element={<Commondata />} />
                </Route>
              </Routes>

              <div className="imgs">
                <img
                  src="src\components\images\fb_icon_325x325.png"
                  alt="fb"
                  id="1"
                ></img>
                <img
                  src="src\components\images\pngtree-whatsapp-icon-social-media-png-image_9015284.png"
                  alt="whatsapp"
                  id="2"
                ></img>
                <img
                  src="src\components\images\Gmail_icon_(2020).svg.webp"
                  alt="gmail"
                  id="3"
                ></img>
              </div>


            </>
          ) : (
            <>
              <Routes>
                <Route path="/" element={<Navbar />}>
                  <Route index element={<Home setUser={setUser} />} />
                  <Route path="/ranking" element={<Ranking />} />
                  <Route path="/portal" element={<Portal />} />
                </Route>
              </Routes>
              <footer className="student-footer">
                <div className="images">
                  <img
                    src="src\components\images\fb_icon_325x325.png"
                    alt="fb"
                  ></img>
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
          )}
        </>
      )}
    </>
  );
};

export default App;

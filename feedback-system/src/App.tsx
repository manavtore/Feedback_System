import React, {useState,useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import Ranking from './components/Ranking';
import Portal from './components/FeedbackPortal';
import Navbar from './components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { User } from 'firebase/auth';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState<User | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(user)
        }
      })

      return () => unsubscribe();
    }, []);

  return (
    <>
      {!isLoggedIn ? <LoginPage /> : <>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home setLoggedIn={setLoggedIn}/>} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/portal" element={<Portal />} />
            </Route>
          </Routes>
          <footer>
            {/* Footer content */}
          </footer>
        </>}
      </>
  );
}
export default App;

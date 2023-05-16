import { Route, Routes, Link } from "react-router-dom";

import Home from "./Home";
import Ranking from "./Ranking";
import Portal from "./FeedbackPortal";

const FrontPage = () => {
  return (
    <>
      <header>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/ranking">Ranking</Link>
          </li>
          <li>
            <Link to="/portal">Feedback Portal</Link>
          </li>
        </ul>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/portal" element={<Portal />} />
      </Routes>
      {/* <header>
        <ul>
          <li key={1}>HOME</li>
          <li key={2}>FEEDBACK PORTAL</li>
          <li key={3}>RANKINGS</li>
        </ul>
      </header> */}
      {/* <footer>CONTACT US</footer> */}
    </>
  );
};

export default FrontPage;

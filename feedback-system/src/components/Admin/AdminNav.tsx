import { Link, Outlet } from "react-router-dom";
import "../styles/style/adminNav.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
const AdminNav = () => {
  return (
    <>
      <nav>
        <div className="logo-name">
          <img src="src\components\images\FEEDBACK_SYMBOL.jpg"></img>
          <h1>FEEDBACK SYSTEM</h1>
        </div>
        <div className="nav-links">
          <Link to="/">HOME</Link>
          <Link to="/rank">RANK</Link>
          <Link to="/Personal">PERSONAL</Link>
          <Link to="/CommonData">Common</Link>
        </div>
        <button
          onClick={() => {
            signOut(auth);
          }}
        >
          LogOut
        </button>
      </nav>
      <Outlet></Outlet>
    </>
  );
};

export default AdminNav;

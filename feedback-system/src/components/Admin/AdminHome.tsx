import { Link } from "react-router-dom";

import "../styles/style/adminHome.css";

const AdminHome = () => {
  return (
    <div>
      <div className="adm-home">
        <h1>WELCOME ADMIN</h1>
        <div className="main">
          <div className="content">
            <h5>
              EMPOWERING EDUCATORS, TRANSFORMING EDUCATION: INSIGHTS AT YOUR
              FINGERTIPS!
            </h5>
            <h6>
              ACCESS AND RETRIEVE THE FEEDBACK RECIEVED FROM STUDENTS.EASILY
              RETRIEVE YOUR INSIGHTS.
            </h6>
            <div className="buttons">
              <Link to="/rank">
                <button>RANKING</button>
              </Link>
              <Link to="CommonData">
                <button>COLLEGE DATA</button>
              </Link>
              <Link to="Personal">
                <button>PERSONAL INSIGHTS</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className="container">
        <div className="box1">
          <img src="src\components\images\OIP.jpg" alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
            pariatur labore eligendi officia inventore aspernatur placeat amet
            iusto ipsum, facilis nisi laudantium ratione esse quasi?
          </p>
        </div>
        <div className="box2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
            pariatur labore eligendi officia inventore aspernatur placeat amet
            iusto ipsum, facilis nisi laudantium ratione esse quasi?
          </p>
          <img src="src\components\images\disp-img-2.png" alt="" />
        </div>
        <div className="box3">
          <img src="src\components\images\disp-img-3.jpg" alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
            pariatur labore eligendi officia inventore aspernatur placeat amet
            iusto ipsum, facilis nisi laudantium ratione esse quasi?
          </p>
        </div>
      </section>
      <div className="adm-footer">
        <div className="text">© ALL RIGHTS RESERVED</div>
      </div>
    </div>
  );
};

export default AdminHome;

import React from 'react'
import { useNavigate,useLocation } from "react-router-dom";
import InstituteLogo from '../../../images/InstituteLogo.jpg';
// import './HomeHeader.css';
const HomeHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={InstituteLogo} width="37%" height="30" class="d-inline-block align-text-top mx-2" />
            PHC
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
              <button
                  className={`nav-link ${location.pathname==="/"?"fw-bolder text-primary active":""}`}
                  aria-current='page'
                  onClick={() => navigate("/")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Login
                </button>
              </li>
              <li className="nav-item">
              <button
                  className={`nav-link ${location.pathname==="/signup"?"fw-bolder text-primary active":""}`}
                  aria-current='page'
                  onClick={() => navigate("/signup")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Signup
                </button>
              </li>
              <li className="nav-item">
              <button
                  className={`nav-link ${location.pathname==="/schedule"?"fw-bolder text-primary active":""}`}
                  aria-current='page'
                  onClick={() => navigate("/schedule")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Schedule
                </button>
              </li>
              <li className="nav-item">
              <button
                  className={`nav-link ${location.pathname==="/ambulance"?"fw-bolder text-primary active":""}`}
                  aria-current='page'
                  onClick={() => navigate("/ambulance")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Ambulance
                </button>
              </li>
              <li className="nav-item">
              <button
                  className={`nav-link ${location.pathname==="/about"?"fw-bolder text-primary active":""}`}
                  aria-current='page'
                  onClick={() => navigate("/about")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  About
                </button>
              </li>
            </ul>
            <ul className='navbar-nav mx-2 ms-auto'>
              <li className='nav-item'>
                <button
                  type='button'
                  class='btn btn-primary'
                  onClick={() => navigate("/signup")}
                >
                  Patient Sign Up
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default HomeHeader

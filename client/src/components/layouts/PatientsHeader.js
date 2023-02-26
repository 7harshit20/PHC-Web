import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import InstituteLogo from '../../images/InstituteLogo.jpg';

const PatientsHeader = () => {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  const handleLogout = () => {
    logout();
  }
  return (
    <div>
      <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"> <img src={InstituteLogo} width="30" height="30" class="d-inline-block align-text-top mx-2" />
            PHC</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/patient">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/patient/doctorsSchedule">Doctors</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/patient/profile">Profile</a>
              </li>
            </ul>
            <ul className="navbar-nav mx-2 ms-auto">
              <li className="nav-item"><button type="button" class="btn btn-primary" onClick={handleLogout}>Sign Out</button></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default PatientsHeader


//patien history
//doctors availability and schedule
//update/profile
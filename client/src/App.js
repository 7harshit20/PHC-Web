import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import AuthState from "./context/auth/AuthState";
import AdminState from "./context/admin/AdminState";
import DoctorState from "./context/doctor/DoctorState";
import CompounderState from "./context/compounder/CompounderState";
import GlobalState from "./context/global/GlobalState";
import PatientState from "./context/patient/PatientState";

import Home from "./components/pages/Home";
import HomeBody from "./components/layouts/HomeBody";
import SignUpPatient from "./components/layouts/SignUpPatient";
import Ambulance from "./components/layouts/Ambulance";
import About from "./components/layouts/About";
import CheckSchedule from "./components/layouts/CheckSchedule";

import Doctor from "./components/pages/Doctor";
import DoctorsDashboard from "./components/layouts/DoctorsDashboard";
import DoctorsSchedule from "./components/layouts/DoctorsSchedule";
import DoctorsProfile from "./components/layouts/DoctorsProfile";
import PatientsList from "./components/layouts/PatientsList";
import PatientsHistory from "./components/layouts/PatientsHistory";
import ViewDocMedicine from "./components/layouts/ViewDocMedicines";
import PrescriptionForm from "./components/layouts/PrescriptionForm";

import Compounder from "./components/pages/Compounder";
import CompoundersProfile from "./components/layouts/CompoundersProfile";
import CompoundersSchedule from "./components/layouts/CompoundersSchedule";
import CompoundersDashboard from "./components/layouts/CompoundersDashboard";
import ViewCompMedicine from "./components/layouts/ViewCompMedicine";

import Admin from "./components/pages/Admin";
import AdminsDashboard from "./components/layouts/AdminsDashboard";
import AddActor from "./components/layouts/AddActor";
import AdminsProfile from "./components/layouts/AdminsProfile";
import AddStock from "./components/layouts/AddStock";
import ViewStock from "./components/layouts/ViewStock";
import ViewAdminMedicine from "./components/layouts/ViewAdminMedicine";

import Patient from "./components/pages/Patient";
import PatientsProfile from "./components/layouts/PatientsProfile";
import FamilyMembers from "./components/layouts/FamilyMembers";

const App = () => {
  return (
    <GlobalState>
      <AuthState>
        <AdminState>
          <DoctorState>
            <CompounderState>
              <PatientState>
                <Router>
                  <Routes>
                    <Route path='' element={<Home />}>
                      <Route path='/' element={<HomeBody />} />
                      <Route path='signup' element={<SignUpPatient />} />
                      <Route path='schedule' element={<CheckSchedule />} />
                      <Route path='ambulance' element={<Ambulance />} />
                      <Route path='about' element={<About />} />
                    </Route>
                    <Route path='doctor' element={<Doctor />}>
                      <Route path='/doctor' element={<DoctorsDashboard />} />
                      <Route
                        path='addRecord/:roll_number'
                        element={<PrescriptionForm />}
                      />
                      <Route path='schedule' element={<DoctorsSchedule />} />
                      <Route path='profile' element={<DoctorsProfile />} />
                      <Route path='patientsList' element={<PatientsList />} />
                      <Route
                        path='patientsHistory'
                        element={<PatientsHistory />}
                      />
                      <Route
                        path='viewDocMedicine'
                        element={<ViewDocMedicine />}
                      />
                      <Route
                        path='prescriptionForm'
                        element={<PrescriptionForm />}
                      />
                    </Route>

                    <Route path='compounder' element={<Compounder />}>
                      <Route
                        path='/compounder'
                        element={<CompoundersDashboard />}
                      />
                      <Route
                        path='schedule'
                        element={<CompoundersSchedule />}
                      />
                      <Route path='profile' element={<CompoundersProfile />} />
                      <Route path='patientsList' element={<PatientsList />} />
                      <Route
                        path='patientsHistory'
                        element={<PatientsHistory />}
                      />
                      <Route
                        path='viewCompMedicine'
                        element={<ViewCompMedicine />}
                      />
                    </Route>

                    <Route path='admin' element={<Admin />}>
                      <Route path='/admin' element={<AdminsDashboard />} />
                      <Route path='addActor' element={<AddActor />} />
                      <Route path='profile' element={<AdminsProfile />} />
                      <Route path='addStock' element={<AddStock />} />
                      <Route path='viewStock' element={<ViewStock />} />
                      <Route
                        path='viewAdminMedicine'
                        element={<ViewAdminMedicine />}
                      />
                    </Route>

                    <Route path='patient' element={<Patient />}>
                      <Route path='/patient' element={<PatientsHistory />} />
                      <Route path='profile' element={<PatientsProfile />} />
                      <Route path='familyMembers' element={<FamilyMembers />} />
                      <Route path='schedule' element={<CheckSchedule />} />
                    </Route>
                  </Routes>
                </Router>
              </PatientState>
            </CompounderState>
          </DoctorState>
        </AdminState>
      </AuthState>
    </GlobalState>
  );
};

export default App;

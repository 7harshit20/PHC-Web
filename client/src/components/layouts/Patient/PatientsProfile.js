import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import PatientContext from "../../../context/patient/PatientContext";

const PatientsProfile = () => {
  const authContext = useContext(AuthContext);
  const patientContext = useContext(PatientContext);

  const { user, loadUser } = authContext;
  const { updateProfile } = patientContext;
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    email: "",
    name: "",
    roll_number: "",
    phone: "",
    gender: "",
    birth: "",
    profession:"",
    guardian_phone: null,
    guardian_relation: null,
  });

  const onEdit = () => {
    setEdit(true);
  };
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSave = () => {
    console.log("form", form);
    const updateAndRefetch = async () => {
      await updateProfile(form);
      await loadUser();
    };
    updateAndRefetch();
    setEdit(false);
    navigate("/patient");
  };

  useEffect(() => {
    if (user) {
      setForm({
        email: user.email,
        name: user.name,
        roll_number: user.roll_number,
        phone: user.phone,
        gender: user.gender,
        birth: user.birth,
        profession:user.profession,
        guardian_phone: user.guardian_phone,
        guardian_relation: user.guardian_relation,
      });
    }
  }, [user]);

  return (
    <div class='container-xl px-4'>
      <div class='row'>
        <div class='col-xl-8' style={{ margin: "auto" }}>
          <div class='card mb-4'>
          <div class='card-header'>Account Details
              <div className="ms-auto" style={{float:"right"}}> {edit ? <i class="fa-solid fa-lg fa-user-check" style={{color:"green"}}  onClick={onSave}></i>
                  :  <i class="fa-solid fa-lg fa-user-pen" onClick={onEdit} style={{color:"blue"}}></i>
              }</div>
          </div>
            <div class='card-body'>
              <form>
                <div class='mb-3'>
                  <label class='small mb-1' for='inputemail'>
                    Email address*
                  </label>
                  <input
                    class='form-control'
                    id='inputemail'
                    type='email'
                    placeholder='Your e-mail'
                    name='email'
                    value={form.email}
                    onChange={onChange}
                    disabled={edit ? 0 : 1}
                  />
                </div>
                <div class='row gx-3 mb-3'>
                  <div class='col-md-6'>
                    <label class='small mb-1' for='inputFullName'>
                      Full name*
                    </label>
                    <input
                      class='form-control'
                      id='inputFullName'
                      type='text'
                      placeholder='Enter your full name'
                      name='name'
                      value={form.name}
                      onChange={onChange}
                      disabled={edit ? 0 : 1}
                    />
                  </div>
                  <div class='col-md-6'>
                    <label class='small mb-1' for='inputFirstName'>
                      Roll No./PF No.
                    </label>
                    <input
                      class='form-control'
                      id='inputRollNo./PFNo.'
                      type='text'
                      placeholder='Enter your Roll No./PF No.'
                      name='roll_number'
                      value={form.roll_number}
                      onChange={onChange}
                      disabled={edit ? 0 : 1}
                    />
                  </div>
                </div>
                <div class='row gx-3 mb-3'>
                  <div class='col-md-6'>
                    <label class='small mb-1' for='inputPhone'>
                      Phone number
                    </label>
                    <input
                      class='form-control'
                      id='inputPhone'
                      type='integer'
                      placeholder='Enter your phone number'
                      name='phone'
                      onChange={onChange}
                      value={form.phone}
                      disabled={edit ? 0 : 1}
                    />
                  </div>
                  <div class='col-md-2'>
                    <label class='small mb-1' for='inputGender'>
                      Gender
                    </label>
                    <select
                      class='form-select'
                      aria-label='Select Your Gender'
                      name='gender'
                      onChange={onChange}
                      value={form.gender}
                      disabled={edit ? 0 : 1}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div class='col-md-4'>
                    <label class='small mb-1' for='inputBirthday'>
                      Birthday
                    </label>
                    <input
                      class='form-control'
                      id='inputBirthday'
                      type='date'
                      placeholder='Enter your birthday'
                      name='birth'
                      onChange={onChange}
                      value={form.birth.slice(0, 10)}
                      disabled={edit ? 0 : 1}
                    />
                  </div>
                </div>
                {form.profession==="Student" && (
                <div class='row gx-3 mt-3 mb-3'>
                  <div class='col-md-6'>
                    <label class='small mb-1' for='inputGuardianPhone'>
                     Guardian's Phone number
                    </label>
                    <input
                      class='form-control'
                      id='inputGuardianPhone'
                      type='integer'
                      placeholder="Enter guardian's phone number"
                      name='guardian_phone'
                      onChange={onChange}
                      value={form.guardian_phone}
                      disabled={edit ? 0 : 1}
                    />
                  </div>
                  <div class='col-md-6'>
                  <label class='small mb-1' for='inputGuradianRelation'>
                      Guardian's Relation
                    </label>
                    <input
                      class='form-control'
                      id='inputGuradianRelation'
                      type='text'
                      placeholder='Enter relationship with guardian'
                      name='guardian_relation'
                      onChange={onChange}
                      value={form.guardian_relation}
                      disabled={edit ? 0 : 1}
                    />
                  </div>
                </div>
                )}
                {/* <div class='row gx-3 mb-3 my-3'>
                  <label class='small mb-1' for='inputAddress'>
                    Update Profile Picture
                  </label>
                  <div class='input-group'>
                    <input
                      type='file'
                      class='form-control'
                      id='inputGroupFile04'
                      aria-describedby='inputGroupFileAddon04'
                      aria-label='Upload'
                      disabled={edit ? 0 : 1}
                    />
                    <button
                      class='btn btn-outline-primary'
                      type='button'
                      id='inputGroupFileAddon04'
                    >
                      Upload
                    </button>
                  </div>
                </div> */}
                <hr />
                <div class='row gx-3 mb-3'>
                  <label class='small mb-1' for='inputAddress'>
                    Update Password
                  </label>
                  <div class='col-md-4 my-2'>
                    <input
                      type='password'
                      class='form-control'
                      id='inputCurrentPassword'
                      aria-label='Current Password'
                      placeholder='Current Password'
                      name='old_password'
                      onChange={onChange}
                      disabled={edit ? 0 : 1}
                    />
                  </div>
                  <div class='col-md-4 my-2'>
                    <input
                      type='password'
                      class='form-control'
                      id='inputNewPassword'
                      aria-label='New Password'
                      placeholder='New Password'
                      name='new_password'
                      onChange={onChange}
                      disabled={edit ? 0 : 1}
                    />
                  </div>
                  <div class='col-md-4 my-2'>
                    <input
                      type='password'
                      class='form-control'
                      id='inputConfirmNewPassword'
                      aria-label='Confirm New Password'
                      placeholder='Confirm New Password'
                      name='cnfNew_password'
                      onChange={onChange}
                      disabled={edit ? 0 : 1}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsProfile;

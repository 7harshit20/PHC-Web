import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/auth/AuthContext";
import CompounderContext from "../../../context/compounder/CompounderContext";

const CompoundersProfile = () => {
  const navigate= useNavigate();
  const authContext = useContext(AuthContext);
  const compounderContext = useContext(CompounderContext);
  const { user, loadUser } = authContext;
  const { updateProfile } = compounderContext;

  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    email: "",
    name: "",
    degree: "",
    phone: "",
    gender: "",
    birth: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onEdit = () => {
    setEdit(true);
  };

  const onSave = () => {
    console.log("form", form);
    const updateAndRefetch = async () => {
      await updateProfile(form);
      await loadUser();
    };
    updateAndRefetch();
    setEdit(false);
    navigate("/compounder");
  };

  useEffect(() => {
    if (user) {
      setForm({
        email: user.email,
        name: user.name,
        degree: user.degree,
        phone: user.phone,
        gender: user.gender,
        birth: user.birth,
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

                <div class='mb-3'>
                  <label class='small mb-1' for='inputName'>
                    Full Name*
                  </label>
                  <input
                    class='form-control'
                    id='inputName'
                    type='text'
                    placeholder='Enter your full name'
                    name='name'
                    value={form.name}
                    onChange={onChange}
                    disabled={edit ? 0 : 1}
                  />
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
                      value={form.phone}
                      onChange={onChange}
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
                    <label class='small mb-1' for='inputBirth'>
                      Birthday
                    </label>
                    <input
                      class='form-control'
                      id='inputBirth'
                      type='date'
                      placeholder='Enter your birthday'
                      name='birth'
                      value={
                        form.birth ? form.birth.slice(0, 10) : "1970-01-01"
                      }
                      onChange={onChange}
                      disabled={edit ? 0 : 1}
                    />
                  </div>
                </div>
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

export default CompoundersProfile;
// schedule password 3 phone number

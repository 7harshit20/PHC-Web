import axios from "axios";
import React, { useContext, useState } from "react";
import AdminContext from "../../../context/admin/AdminContext";

const AddDoctor = () => {
  const adminContext = useContext(AdminContext);
  const { addActor } = adminContext;
  const [form, setForm] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    cnf_password: "",
  });
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    addActor(form);
  };
  return (
    <div class='container-xl px-4'>
      <h3 className='text-center'>Create New account</h3>
      <div class='row mt-3'>
        <div class='col-xl-8' style={{ margin: "auto" }}>
          <div class='card mb-4'>
            <div class='card-header'>Account Details</div>
            <div class='card-body'>
              <form>
                <div className='mb-3'>
                  <select
                    class='form-select'
                    aria-label='Select Actor'
                    onChange={onChange}
                    name='role'
                  >
                    <option value='' disabled selected hidden>
                      Select Actor
                    </option>
                    <option value='doctor'>Doctor</option>
                    <option value='compounder'>Compounder</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>
                <div class='mb-3'>
                  <label class='small mb-1' for='inputemail'>
                    Email address
                  </label>
                  <input
                    onChange={onChange}
                    required={true}
                    name='email'
                    class='form-control'
                    id='inputemail'
                    type='email'
                    placeholder="Enter actor's e-mail"
                  />
                </div>
                <div class='mb-3'>
                  <label class='small mb-1' for='inputName'>
                    Name
                  </label>
                  <input
                    onChange={onChange}
                    required={true}
                    name='name'
                    class='form-control'
                    id='inputName'
                    type='text'
                    placeholder="Enter actor's Full name"
                  />
                </div>
                <div class='row gx-3 mt-3 mb-3'>
                  <label class='small mb-1' for='inputAddress'>
                    Set Password
                  </label>
                  <div class='col-md-6 my-2'>
                    <input
                      onChange={onChange}
                      required={true}
                      name='password'
                      type='password'
                      class='form-control'
                      id='inputPassword'
                      aria-label='Password'
                      placeholder='Password'
                    />
                  </div>
                  <div class='col-md-6 my-2'>
                    <input
                      onChange={onChange}
                      required={true}
                      name='cnf_password'
                      type='password'
                      class='form-control'
                      id='inputConfirmPassword'
                      aria-label='Password'
                      placeholder='Confirm Password'
                    />
                  </div>
                </div>
                <div class='d-grid gap-2 mt-5'>
                  <button
                    class='btn btn-primary'
                    type='button'
                    onClick={onSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;

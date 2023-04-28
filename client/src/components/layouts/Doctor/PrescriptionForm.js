import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DoctorContext from "../../../context/doctor/DoctorContext";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const PrescriptionForm = () => {
  const doctorContext = useContext(DoctorContext);
  const navigate = useNavigate();
  const [back, setBack] = useState(false);

  useEffect(() => {
    if (back === true) {
      navigate(`/doctor`);
    }
  }, [back]);

  const { getMedicines, medicines, getRelative, relative, addPrescription } =
    doctorContext;

  const [medicineList, setMedicineList] = useState(
    medicines.map((med) => {
      const medName = med.name;
      return medName;
    })
  );

  const { roll_number } = useParams();
  const [form, setForm] = useState({
    patient: roll_number,
    id: null,
    medicines: [],
  });

  const [inputMedicine, setInputMedicine] = useState([
    {
      name: "",
      quantity: "",
    },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputMedicine];
    list[index][name] = value;
    setInputMedicine(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputMedicine];
    list.splice(index, 1);
    setInputMedicine(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputMedicine([
      ...inputMedicine,
      {
         name: "", 
         type:"",
         quantity: "",
         frequency: "",
         amount: "",
         dosage_time: "",
    },
    ]);
  };

  // //handling Tests
  // const handleTestsChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...inputTests];
  //   list[index][name] = value;
  //   setInputTests(list);
  // };

  // //tests remove click
  // const handleRemoveTests = (index) => {
  //   const list = [...inputTests];
  //   list.splice(index, 1);
  //   setInputTests(list);
  // };

  // // tests add click
  // const handleAddTests = () => {
  //   setInputTests([...inputTests, { test: "" }]);
  // };

  const onChange = (e) => {
    console.log(form);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setForm({ ...form, medicines: inputMedicine});
    console.log(form);
    addPrescription(form);
  };

  useEffect(
    () => {
      setForm({ ...form, medicines: inputMedicine});
    },
    [inputMedicine],
  );

  useEffect(() => {
    const func = async () => {
      await getRelative(roll_number);
      await getMedicines();
    };
    func();
  }, []);

  useEffect(() => {
    const func = async () => {
      await getRelative(roll_number);
      await getMedicines();
    };
    func();
  }, [medicines]);

  return (
    <div class='container-xl px-4'>
      <div class='row mt-3'>
        <div class='col-xl-8' style={{ margin: "auto" }}>
          <div class='card mb-4'>
            <div
              class='card-header'
              style={{
                position: "relative",
                textAlign: "center",
                padding: "1rem",
              }}
            >
              <div style={{ position: "absolute", left: "0", top: "0.4rem"}}>
                <button
                  class={`btn ${
                    back === true ? "btn-danger" : "btn-outline-danger"
                  } mx-2 my-2`}
                  onClick={() => setBack(true)}
                >
                  Back
                </button>
              </div>
              <div style={{ display: "inline-block" }}>
                <h5>Prescription Form</h5>
              </div>
            </div>
            <div class='card-body'>
              <form>
                {/* row-1 */}
                <div class='row gx-6 mb-4'>
                  <div class='col-md-6'>
                    <label class='small mb-1' for='inputrollno'>
                      Roll No./PF No.
                    </label>
                    <input
                      name='roll_number'
                      class='form-control'
                      id='inputrollno'
                      type='Text'
                      value={roll_number}
                      disabled
                    />
                  </div>
                  <div class='col-md-6'>
                    <label class='small mb-1' for='inputrelation'>
                      Relation
                    </label>
                    <select
                      class='form-select'
                      aria-label='Select Relation'
                      onChange={onChange}
                      name='id'
                    >
                      <option selected value={""}>
                        Select family member
                      </option>
                      {relative
                        ? relative.map((rel) => (
                            <option value={rel.relative_id}>
                              {rel.name}--{rel.relation}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
                {/* row-2 */}
                <label class='small mb-1' for='inputMedicine'>
                  Medicine
                </label>
                {inputMedicine
                  ? inputMedicine.map((x, i) => {
                      return (
                        <>
                        <div class='row gx-6 my-3c'>
                          <div class='col-md-6'>
                            <Autocomplete
                              autoComplete
                              autoHighlight
                              freeSolo
                              value={x.name}
                              name='name'
                              onChange={(e, value) => {
                                const list = [...inputMedicine];
                                list[i].name = value;
                                setInputMedicine(list);
                              }}
                              options={medicineList}
                              renderInput={(data) => (
                                <TextField
                                  {...data}
                                  variant='outlined'
                                  label='Medicine Name'
                                  size='small'
                                  fullWidth
                                />
                              )}
                            />
                          </div>
                          <div class='col-md-3'>
                              <select
                                class='form-select'
                                aria-label='Select type'
                                name="type"
                                value={x.type}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value='' disabled selected hidden>
                                Select Type
                                </option>
                                <option value='Tablet'>Tablet</option>
                                <option value='Capsule'>Capsule</option>
                                <option value='Syrup'>Syrup</option>
                                <option value='Injection'>Injection</option>
                                <option value='Drops'>Drops</option>
                                <option value='Cream'>Cream</option>
                                <option value='Ointment'>Ointment</option>
                                <option value='Powder'>Powder</option>
                                <option value='Other'>Other</option>
                              </select>
                          </div>
                          <div class='col-md-3'>
                            <TextField
                              type='number'
                              InputProps={{ inputProps: { min: 1 } }}
                              variant='outlined'
                              label='Quantity'
                              size='small'
                              fullWidth
                              name='quantity'
                              value={x.quantity}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </div>
                        </div>
                        <div class='row gx-6 my-2'>
                          <div class='col-md-5'>
                              <select
                                class='form-select'
                                aria-label='Select Fequency'
                                name='frequency'
                                value={x.frequency}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                               <option value='' disabled selected hidden>
                                Frequency
                                </option>
                                <option value='Every 24 hours'>Every 24 hours</option>
                                <option value='Every 12 hours'>Every 12 hours</option>
                                <option value='Every 8 hours'>Every 8 hours</option>
                                <option value='As and When Required'>As and When Required</option>
                                <option value='Other'>Other</option>
                              </select>
                          </div>
                          <div class='col-md-3'>
                              {/* <input
                                type='number'
                                class='form-control'
                                id='inputAmount'
                                placeholder='Amount'
                                // name='amount'
                                value={x.dosage.amount}
                                onChange={(e,i)=>{
                                  const list = [...inputMedicine];
                                  list[i].dosage.amount = e.target.value;
                                  setInputMedicine(list);
                                }}
                              /> */}
                               <input
                                class='form-control'
                                id='inputAmount'
                                type='number'
                                placeholder='Enter Amount'
                                name='amount'
                                value={x.amount}
                                onChange={(e) => handleInputChange(e, i)}
                                />
                          </div>
                          <div class='col-md-3'>
                              <select
                                class='form-select'
                                aria-label='Select dosageTime'
                                name="dosage_time"
                                value={x.dosage_time}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value='' disabled selected hidden>
                                Dosage Time
                                </option>
                                <option value='Before Food'>Before Food</option>
                                <option value='After Food'>After Food</option>
                                <option value='Before Sleep'>Before Sleep</option>
                                <option value='Other'>Other</option>
                              </select>
                          </div>
                          <div className='col-md-1'>
                            {inputMedicine.length !== 1 && (
                              <i
                                class='fa-solid fa-lg fa-circle-minus mx-1 my-1'
                                style={{ color: "#DC4C64" }}
                                onClick={() => handleRemoveClick(i)}
                              ></i>
                            )}
                            {inputMedicine.length - 1 === i && (
                              <i
                                class='fa-solid fa-lg fa-circle-plus mx-1 my-1'
                                style={{ color: "green" }}
                                onClick={handleAddClick}
                              ></i>
                            )}
                          </div>
                        </div>
                        </>
                      );
                    })
                  : null}
                {/* row-2-end */}
                {/* row-5-start */}
                {/* <label class='small mb-2' for='inputTests'>
                  Tests (if any)
                </label>
                {inputTests.map((x, i) => {
                  return (
                    <div class='row gx-6 my-2'>
                      <div class='col-md-11'>
                        <TextField
                          onChange={(e) => handleTestsChange(e, i)}
                          name='test'
                          // defaultValue={"None"}
                          // value={x.test}
                          id='inputTest'
                          type='text'
                          label='Test'
                          variant='outlined'
                          size='small'
                          fullWidth
                        />
                      </div>
                      <div className='col-md-1'>
                        {inputTests.length !== 1 && (
                          <i
                            class='fa-solid fa-lg fa-circle-minus mx-1 my-1'
                            style={{ color: "#DC4C64" }}
                            onClick={() => handleRemoveTests(i)}
                          ></i>
                        )}
                        {inputTests.length - 1 === i && (
                          <i
                            class='fa-solid fa-lg fa-circle-plus mx-1 my-1'
                            style={{ color: "green" }}
                            onClick={handleAddTests}
                          ></i>
                        )}
                      </div>
                    </div>
                  );
                })} */}
                {/* row-5 -end*/}

                <div class='row gx-3 my-3'>
                  <div class='col-md-12'>
                    {/* <label class='small mb-2' for='inputDiagnosis'>
                      Diagnosis
                    </label> */}
                    <TextField
                      onChange={onChange}
                      name='tests'
                      id='inputTests'
                      type='text'
                      size='small'
                      fullWidth
                      label='Tests'
                      variant='outlined'
                    />
                  </div>
                </div>

                {/* row-3 -start*/}
                <div class='row gx-3 my-3'>
                  <div class='col-md-12'>
                    {/* <label class='small mb-2' for='inputDiagnosis'>
                      Diagnosis
                    </label> */}
                    <TextField
                      onChange={onChange}
                      name='diagnosis'
                      id='inputDiagnosis'
                      type='text'
                      size='small'
                      fullWidth
                      label='Diagnosis'
                      variant='outlined'
                    />
                  </div>
                </div>
                {/* row-3-end */}

                {/* row-4 start*/}
                <div class='row gx-3 my-3'>
                  <div class='col-md-12'>
                    {/* <label class='small mb-2' for='inputSymptoms'>
                      Symptoms
                    </label> */}
                    <TextField
                      onChange={onChange}
                      name='symptoms'
                      id='inputSymptoms'
                      type='text'
                      size='small'
                      fullWidth
                      label='Symptoms'
                      variant='outlined'
                    />
                  </div>
                </div>
                {/* row-4-end */}

                {/* row 6 -start*/}

                <div class='row gx-3 my-3'>
                  <div class='col-md-12'>
                    {/* <label class='small mb-2' for='inputRemarks'>
                      Remarks
                    </label> */}
                    <TextField
                      onChange={onChange}
                      name='remarks'
                      id='inputRemarks'
                      type='text'
                      size='small'
                      fullWidth
                      label='Remarks'
                      variant='outlined'
                    />
                  </div>
                </div>

                {/* row 6 -end*/}
                <div class='d-grid gap-2 mt-4'>
                  <button
                    onClick={onSubmit}
                    class='btn btn-primary'
                    type='button'
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

export default PrescriptionForm;

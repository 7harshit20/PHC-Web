import React,{useState,useContext,useEffect} from 'react'
import CompounderContext from '../../../context/compounder/CompounderContext'
import PrescriptionContent from '../Doctor/PrescriptionContent';


const PatientsListCompounder = () => {
  const compounderContext = useContext(CompounderContext);
  const { getPrescriptionByDate, allPrescription } = compounderContext;

  let defaultDate = new Date().toLocaleDateString("en-CA");
  const [date, setDate] = useState(defaultDate);

  const func = async (date) => {
    await getPrescriptionByDate(date);
  };
  const onSetDate = (event) => {
    setDate(event.target.value);
    console.log(event.target.value, "date");
    func(event.target.value);
  };
  useEffect(() => {
    console.log(defaultDate, "defaultDate");
    func(defaultDate);
  }, []);

  return (
    <div class='container-xl px-4'>
      <div className='text-center'>
        <label for='date'>
          <h4>Select Record Date</h4>
        </label>
        <br />
        <input
          className='form-control my-2'
          type='date'
          value={date}
          onChange={onSetDate}
          style={{ width: "280px", margin: "auto", textAlign: "center" }}
        />
      </div>
      {allPrescription && allPrescription.length>0? (
        allPrescription.map((item, index) => {
          return <PrescriptionContent item={item} index={index} />;
        })
      ) : (
        <div
          class='alert alert-success align-items-center text-center my-4'
          role='alert'
          style={{ width: "60%", margin: "auto" }}
        >
          No Records on this Date.
        </div>
      )}
    </div>
  );
}

export default PatientsListCompounder
{/*e-mail Name Age Gender DateOfConsultation Diagnosis Prescription Addition Notes viewPatientMedicalRecord*/}
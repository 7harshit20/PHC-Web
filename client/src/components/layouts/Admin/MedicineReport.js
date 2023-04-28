import React,{useState,useContext, useEffect} from 'react'
import AdminContext from '../../../context/admin/AdminContext';
import {useNavigate} from 'react-router-dom';

const MedicineReport = () => {
    const adminContext = useContext(AdminContext);
    const navigate = useNavigate();
    const {getAllMedicineDetails,allMedicineDetails} = adminContext;

    const [from,setFrom]=useState('');
    const [to,setTo]=useState('');

    const onSubmit=()=>{
      const func=async()=>{
          await getAllMedicineDetails({from,to});
      }
      func();
      if(from!==''&& to!=='' &&from<=to){
      navigate('/admin/reportContent');
      }
        // console.log("dates in report",from,to);
    }
  return (
     <div className='m-4 text-center'>
       <div className='text-center'>
            <h3>Medicine Report</h3>
         <hr className='mx-4 my-4' />
         <div style={{ margin: "auto", width: "300px" }}>
            <label
            className='form-label fw-bold fst-italic'
            style={{ width: "100%", margin: "auto", textAlign: "center" }}
            >
            From
            </label>
            <input
            className='form-control my-2'
            type='date'
            value={from}
            onChange={(e)=>setFrom(e.target.value)}
            style={{ width: "100%", margin: "auto", textAlign: "center" }}
            />
            <label
            className='form-label fw-bold fst-italic'
            style={{ width: "100%", margin: "auto", textAlign: "center" }}
            >
            To
            </label>
            <input
            className='form-control my-2'
            type='date'
            value={to}
            onChange={(e)=>setTo(e.target.value)}
            style={{ width: "100%", margin: "auto", textAlign: "center" }}
            />
           <div class='d-grid gap-2'>
           <button 
            className="btn btn-primary my-3"
            type='submit'
            onClick={onSubmit}
            >
                Get Report
            </button>
           </div>
         </div>
       </div>
   </div>
  )
}

export default MedicineReport
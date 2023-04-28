import React,{useState} from 'react'
import Availability from './Availability'
import CheckCompoundersSchedule from './CheckCompounderSchedule'
import CheckDoctorsSchedule from './CheckDoctorsSchedule'

const CheckSchedule = () => {
  const [role,setRole]=useState("availability")
  return (
    <div className="container text-center mt-3">
        <button class={`btn ${role==="availability"?'btn-info':'btn-outline-info'} mx-2 my-2`} onClick={() => setRole("availability")}>
          Currently Available Doctors
        </button>
        <button class={`btn ${role==="doctor"?'btn-success':'btn-outline-success'} mx-2 my-2`} onClick={() => setRole("doctor")}>
          Doctors Timings
        </button>
        <button class={`btn ${role==="compounder"?'btn-primary':'btn-outline-primary'} mx-2 my-2`} onClick={() => setRole("compounder")}>
          Compounders Timings
        </button>
        {role==="doctor"?<CheckDoctorsSchedule/>:(role==="compounder"?<CheckCompoundersSchedule/>:<Availability/>)}
    </div>
  )
}

export default CheckSchedule

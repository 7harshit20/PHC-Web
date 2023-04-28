import React, { useContext, useState, useEffect } from "react";
import styles from "../../../CSSFiles/SideProfile.module.css";
import PatientsContentSP from "./PatientsContentSP";
import GlobalContext from "../../../context/global/GlobalContext";

const PatientsSP = () => {
  const globalContext = useContext(GlobalContext);
  const {isMobile} = globalContext;
  console.log(isMobile);
  return (
    <div class={`${styles.accordian} accordion`} id="accordionExample">
      <div class="accordion-item" hidden={!isMobile}>
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" style={{height:"0.1rem"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            User Info
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body">
             {isMobile?<PatientsContentSP isMobile={isMobile}/>:''}
          </div>
        </div>
      </div>
          {!isMobile?<PatientsContentSP isMobile={isMobile}/>:''}
    </div>
  );
};

export default PatientsSP;

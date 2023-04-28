import React, {useContext } from "react";
import styles from "../../../CSSFiles/SideProfile.module.css";
import CompoundersContentSP from "./CompoundersContentSP";
import GlobalContext from "../../../context/global/GlobalContext";

const CompoundersSP = () => {
  const globalContext = useContext(GlobalContext);
  const {isMobile} = globalContext;
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
             {isMobile?<CompoundersContentSP isMobile={isMobile}/>:''}
          </div>
        </div>
      </div>
          {!isMobile?<CompoundersContentSP isMobile={isMobile}/>:''}
    </div>
  );
};

export default CompoundersSP;

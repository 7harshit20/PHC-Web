import React, { useContext, useState } from "react";
import ViewFamilyMembers from "./ViewFamilyMembers";
import AddFamilyMembers from "./AddFamilyMembers";

const FamilyMembers = () => {
  const [action, setAction] = useState("view");
  return (
    <div className='container mt-3'>
      <div className="mb-3 text-center">
      <button
        class={`btn ${
          action === "view" ? "btn-info" : "btn-outline-info"
        } mx-2 my-2`}
        onClick={() => setAction("view")}
        >
        View Family Members
      </button>
      <button
        class={`btn ${action === "add" ? "btn-info" : "btn-outline-info"} mx-2 my-2`}
        onClick={() => setAction("add")}
        >
        Add New Members
      </button>
      </div>
      {action === "view" ? <ViewFamilyMembers /> : <AddFamilyMembers />}
    </div>
  );
};

export default FamilyMembers;

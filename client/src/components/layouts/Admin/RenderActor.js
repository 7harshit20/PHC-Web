import React, { useEffect, useState, useContext } from "react";
import AdminContext from "../../../context/admin/AdminContext";

const RenderActor = (props) => {
  const adminContext = useContext(AdminContext);
  const { actors } = adminContext;
  const { actorType } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    if (actorType === "doctor") {
      setData(actors.doctors);
    } else if (actorType === "compounder") {
      setData(actors.compounders);
    } else {
      setData(actors.admins);
    }
  }, [actors, actorType]);

  return (
    <div class='card-body' style={{display:'block',overflowX:'auto'}}>
      <table
        class='table my-3 text-center'
        style={{ width: "80%", margin: "auto" }}
      >
        <thead class='table-dark'>
          <tr>
            <th scope='col'>S.No</th>
            <th scope='col'>Name</th>
            {actorType === "doctor" ? <th scope='col'>Degree</th> : null}
            <th scope='col'>Email</th>
            <th scope='col'>Phone</th>
            {actorType === "doctor" ? (
              <th scope='col'>Present Availability</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((item, index) => {
                return (
                  <tr>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.name}</td>
                    {actorType == "doctor" ? (
                      <td>{item.degree ? item.degree : "NA"}</td>
                    ) : null}
                    <td>{item.email}</td>
                    <td>{item.phone ? item.phone : "NA"}</td>
                    <td
                      class={`${
                        item.availability ? "text-success" : "text-danger"
                      }`}
                    >
                      {actorType === "doctor"
                        ? item.availability
                          ? "Available"
                          : "Unavailable"
                        : null}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default RenderActor;

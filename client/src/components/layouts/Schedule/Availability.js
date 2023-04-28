import React, { useContext, useEffect, useState } from "react";

import GlobalContext from "../../../context/global/GlobalContext";

const Availability = () => {
  const globalContext = useContext(GlobalContext);
  const { getAvailable, available } = globalContext;
  useEffect(() => {
    const fetchData = async () => {
      await getAvailable();
    };
    fetchData();
  }, []);
  return (
    <div class='card-body my-4'>
      {available ? (
        available.length === 0 ? (
          <div
            class='alert alert-danger align-items-center'
            role='alert'
            style={{ width: "60%", margin: "auto" }}
          >
            No Doctors available at the moment.
          </div>
        ) : (
          <div style={{display:'block',overflowX:'auto'}}>
          <table
            class='table text-center'
            style={{ width: "80%", margin: "auto" }}
          >
            <thead class='table-dark'>
              <tr>
                <th scope='col'>S.No</th>
                <th scope='col'>Name</th>
                <th scope='col'>Suffix</th>
              </tr>
            </thead>
            <tbody>
              {available.map((item, index) => {
                return (
                  <tr>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.degree}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        )
      ) : null}
    </div>
  );
};

export default Availability;

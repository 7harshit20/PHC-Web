import React, { useContext, useState, useEffect } from "react";
import AdminContext from "../../../context/admin/AdminContext";
import {useNavigate } from "react-router-dom";

const ReportContent = () => {
    const navigate = useNavigate();
   const adminContext = useContext(AdminContext);
    const { allMedicineDetails } = adminContext;
    console.log(allMedicineDetails);

    const Print = () => {
        let printContents = document.getElementById(`printDiv`).innerHTML;
        let originalContents = document.body.innerHTML;
        let printWindow = window.open('', '_blank', 'width=800,height=600');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<style>table {border-collapse: collapse;} th, td {border: 1px solid black;}</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContents);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.addEventListener('afterprint', () => {
          document.body.innerHTML = originalContents;
        });
      };

  return (
    <div className="text-center mx-4 my-4">
         <div style={{ float: "right" }}>
             <button
                type="button"
                className="btn btn-danger"
                onClick={Print}
                >
                Print 
                <i class="fa-solid fa-file-pdf" onClick={Print} style={{marginLeft:"1rem"}}> </i>
            </button>           
        </div>
        <div style={{ float: "left" }}>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => navigate("/admin/medicineReport")}
                >
                Back
                </button>
        </div>
        <div id='printDiv'>
        <h3 className="mb-5">Medicine Report</h3>
        <div style={{display:'block',overflowX:'auto'}}>
        <table class='table text-center table-bordered'>
            <thead>
            <tr>
                <th scope='col'>S.no</th>
                <th scope='col'>Name</th>
                <th scope='col'>Type</th>
                <th scope='col'>Category</th>
                <th scope='col'>Number of Stocks</th>
                <th scope='col'>Initial Quantity</th>
                <th scope='col'>Expendend Quantity</th>
                <th scope='col'>Balance Quantinty</th>
            </tr>
            </thead>
            <tbody>
            {allMedicineDetails?allMedicineDetails.map((item, index) => {
                return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.category}</td>
                    <td>{item.NumberOfStocks}</td>
                    <td>{item.totalInitialQuantity}</td>
                    <td>{item.totalExpendQuantity}</td>
                    <td>{item.totalQuantity}</td>
                </tr>
                );
            }):""}
            </tbody>
        </table>
        </div>
        </div>
    </div>
  )
}

export default ReportContent
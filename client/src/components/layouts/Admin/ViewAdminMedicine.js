import React, { useEffect, useState, useContext } from "react";
import AdminContext from "../../../context/admin/AdminContext";
import Select from "react-select";

const ViewAdminMedicine = () => {
  const adminContext = useContext(AdminContext);
  const {getMedicines, medicines } = adminContext;
  const [data, setData] = useState(medicines);

  const [action, setAction] = useState("viewAll");

  const [sortQuantity, setSortQuantity] = useState(false);

  const medOptions = medicines
    ? medicines.map((opt) => ({ label: opt.name, value: opt.name }))
    : null;

  const [selectedOption, setSelectedOption] = useState(null);
  const onChange = (e) => {
    setAction("search");
    setSelectedOption(e);
  };

  useEffect(() => {
    const func = async () => {
      await getMedicines();
      // setData(medicines);
    };
    func();
  }, []);

  useEffect(() => {
    if (action === "viewAll") {
      setData(medicines);
    } else if (action === "search") {
      setData(medicines.filter((item) => item.name === selectedOption.value));
    }
  }, [action, selectedOption]);

  useEffect(() => {
    if (action === "viewAll" && sortQuantity === false) {
      setData(medicines);
    } else if (action === "viewAll" && sortQuantity === true) {
      setData(
        medicines
          .sort((q1, q2) =>
            q1.quantity < q2.quantity ? 1 : q1.quantity > q2.quantity ? -1 : 0
          )
          .reverse()
      );
    } else if (action === "search" && sortQuantity === false) {
      setData(medicines.filter((item) => item.name === selectedOption.value));
    } else if (action === "search" && sortQuantity === true) {
      setData(
        medicines
          .filter((item) => item.name === selectedOption.value)
          .sort((q1, q2) =>
            q1.quantity < q2.quantity ? 1 : q1.quantity > q2.quantity ? -1 : 0
          )
          .reverse()
      );
    }
    const func = async () => {
      await getMedicines();
    };
    func();
  }, [action, sortQuantity, selectedOption]);
  return (
    <div class='container-xl px-4'>
      <div style={{ width: "280px", margin: "auto" }}>
        <Select
          options={medOptions}
          placeholder='Search medicine...'
          value={action === "search" ? selectedOption : ""}
          onChange={onChange}
        />
      </div>
      <div className='m-4 text-center'>
        <button
          class={`btn ${
            action === "viewAll" ? "btn-info" : "btn-outline-info"
          } mx-2 my-2`}
          onClick={() => setAction("viewAll")}
        >
          All Medicines
        </button>
        <button
          class={`btn ${
            sortQuantity === true ? "btn-info" : "btn-outline-info"
          } mx-2 my-2`}
          onClick={() => setSortQuantity(true)}
        >
          Sort By Quantity
        </button>
        <button
          class={`btn ${
            sortQuantity === false ? "btn-info" : "btn-outline-info"
          } mx-2 my-2`}
          onClick={() => setSortQuantity(false)}
        >
          Sort By Date
        </button>
      </div>
      <div style={{display:'block',overflowX:'auto'}}>
      <table
        class='table my-3 text-center'
        style={{ width: "80%", margin: "auto" }}
      >
        <thead class='table-dark'>
          <tr>
            <th scope='col'>S.No</th>
            <th scope='col'>Type</th>
            <th scope='col'>Medicine</th>
            <th scope='col'>Category</th>
            <th scope='col'>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((item, index) => {
                return (
                  <tr>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.type}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ViewAdminMedicine;

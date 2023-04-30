import React,{useContext,useEffect,useState} from 'react'
import AdminContext from '../../../context/admin/AdminContext';
const AddMedicine = () => {
    const adminContext = useContext(AdminContext);
    const {addMedicine,medicines } = adminContext;
    const [form, setForm] = useState({
        name:"",
        type:"",
        category:"",
        // description:"",
        // composition:"",
        // company:"",
    });
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        addMedicine(form);
        setForm({
            name:"",
            type:"",
            category:"",
        })
        // console.log(medicines);
    };
  return (
    <div class='row'>
    <div class='col-xl-8' style={{ margin: "auto" }}>
    <div class='card mb-4'>
        <div class='card-header'>Add a New Medicine</div>
        <div class='card-body'>
        <form>
            {/* row-1 starts */}
            <div class='row gx-3 mb-3'>
                <div class='col-md-6'>
                        <label class='small mb-1' for='inputType'>
                        Type*
                        </label>
                        <select
                            class='form-select'
                            aria-label='Select Type'
                            onChange={onChange}
                            value={form.type}
                            name='type'
                        >
                            <option value='' disabled selected hidden>
                            Select Type
                            </option>
                            <option value='Tablet'>Tablet</option>
                            <option value='Capsule'>Capsule</option>
                            <option value='Syrup'>Syrup</option>
                            <option value='Injection'>Injection</option>
                            <option value='Drops'>Drops</option>
                            <option value='Cream'>Cream</option>
                            <option value='Ointment'>Ointment</option>
                            <option value='Powder'>Powder</option>
                            <option value='Other'>Other</option>
                        </select>
                </div>
                <div class='col-md-6'>
                    <label class='small mb-1' for='inputName'>
                    Name*
                    </label>
                    <input
                    class='form-control'
                    id='inputName'
                    type='text'
                    placeholder='Enter Medicine Name'
                    name='name'
                    value={form.name}
                    onChange={onChange}
                    />
                </div>
            </div>
            {/* row-1 ends */}
            {/* row-2 starts */}
            <div class='row gx-3 mb-3'>    
                <div class='col-md-6'>
                    <label class='small mb-1' for='inputCategory'>
                    Category*
                    </label>
                    <select
                        class='form-select'
                        aria-label='Select Category'
                        onChange={onChange}
                        name='category'
                        value={form.category}
                    >
                        <option value='' disabled selected hidden>
                        Select Category
                        </option>
                        <option value='Generic'>Generic</option>
                        <option value='Brand'>Brand</option>
                    </select>
                </div>
                <div class='col-md-6'>
                    <label class='small mb-1' for='inputCompany'>
                    Company
                    </label>
                    <input
                    class='form-control'
                    id='inputCompany'
                    type='text'
                    placeholder='Enter Company'
                    name='company'
                    // value={form.company}
                    value={form.company?form.company:""}
                    onChange={onChange}
                    />
                </div>
            </div>
            {/* row-2 ends */}
            {/* row-3 starts */}
            <div class='row gx-3 mb-3'> 
                <div class='col-md-6'>
                    <label class='small mb-1' for='inputComposition'>
                    Composition
                    </label>
                    <input
                    class='form-control'
                    id='inputComposition'
                    type='text'
                    placeholder='Enter Composition'
                    name='composition'
                    // value={form.composition}
                    value={form.composition?form.composition:""}
                    onChange={onChange}
                    />
                </div>
                <div class='col-md-6'>
                    <label class='small mb-1' for='inputDescription'>
                    Description
                    </label>
                    <input
                    class='form-control'
                    id='inputDescription'
                    type='text'
                    placeholder='Enter Description'
                    name='description'
                    // value={form.description}
                    value={form.description?form.description:""}
                    onChange={onChange}
                    />
                </div>
            </div>
            {/* row 3 --ends */}
            <button
                class='btn btn-primary'
                type='button'
                onClick={onSubmit}
            >
                Add Medicine
            </button>
        </form>
        </div>
    </div>  
    </div>
</div>
  )
}

export default AddMedicine
import React,{useContext,useEffect,useState} from 'react'
import AdminContext from '../../context/admin/AdminContext';
import StockContent from './StockContent';
import Select from 'react-select';
const ViewStock = () => {
    const adminContext = useContext(AdminContext);
    const { getStock,stocks,medicines} = adminContext;
    const [data,setData]=useState(stocks);

    const [action,setAction]=useState("viewAll");

    const [sortExpiry,setSortExpiry]=useState(false);

    const medOptions=stocks?stocks.map(opt => ({ label: opt.name, value: opt.name })):null;

    const [selectedOption, setSelectedOption] = useState(null);
    const onChange = (e) => {
      setAction("search");
      setSelectedOption(e);
    };

    useEffect(() => {
      const func = async () => {
        await getStock();
      };
      func();
    },[]);
    useEffect(() => {
        if(action==="viewAll"){
          setData(stocks);
        }
        else if(action==="search"){
          setData(stocks.filter(item => item.name===selectedOption.value));
        }
      },[action,selectedOption]);
      
    useEffect(() => {
        if(action==="viewAll"&&sortExpiry===false){
          setData(stocks);
        }
        else if(action==="viewAll"&&sortExpiry===true){
          setData(stocks.sort((a,b) => new Date(a.expiry) - new Date(b.expiry)));
        }
        else if(action==="search" && sortExpiry===false){
          setData(stocks.filter(item => item.name===selectedOption.value));
        }
        else if(action==="search" && sortExpiry===true){
          setData(stocks.filter(item => item.name===selectedOption.value).sort((a,b) => new Date(a.expiry) - new Date(b.expiry)));
        }
      const func = async () => {
        await getStock();
      };
      func();
    },[action,sortExpiry,selectedOption]);
  return (
    <div class='container-xl px-4'>
      
        <div style={{width:"40%",margin:"auto"}}>
          <Select options={medOptions} 
          placeholder="Search stock..." 
          value={selectedOption}
          onChange={onChange}/>
        </div>
         <div className="m-4 text-center">
            <button class={`btn ${action === "viewAll" ? "btn-info" : "btn-outline-info"} mx-2 my-2`} onClick={() => setAction("viewAll")}>
              All Stocks
            </button>
            <button
              class={`btn ${sortExpiry === true ? "btn-info" : "btn-outline-info"} mx-2 my-2`}
              onClick={() => setSortExpiry(true)}
              >
              Sort By Expiry
            </button> 
            <button
              class={`btn ${sortExpiry === false ? "btn-info" : "btn-outline-info"} mx-2 my-2`}
              onClick={() => setSortExpiry(false)}
              >
              Sort By Date
            </button> 
          </div>

          {data?data.map((item,index) => {
              return( <StockContent item={item} index={index}/> )
          }):null}

    </div>
  )
}

export default ViewStock
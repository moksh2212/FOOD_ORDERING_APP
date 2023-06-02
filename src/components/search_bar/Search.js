import React,{useEffect,useState} from "react";
const Search = () => {

    const [data,setData]=useState([]);
    const [filterVal,setfilterVal]=useState('');
    const [searchApiData,setSearchApidata]=useState('');
    useEffect(()=>{
        const fetchData=()=>{
            fetch('https://react-http-8aaef-default-rtdb.firebaseio.com/Meals.json')
            .then(Response => Response.json())
            .then(json=>{
                setData(json)
            })
        }
        fetchData();
    },[])
const handlefilter=(e)=>{
if(e.target.value =='' ) {
   setData(searchApiData)
}
else {
  const filterresult= searchApiData.filter(item=>item.name.toLowerCase().includes(e.target.value.toLowerCase())) ;
    setData(filterresult);
}
setfilterVal(e.target.value);
}
    return (
        <div>
       <input value={filterVal} onInput={(e)=>handlefilter(e)}/>
       </div>
    )
};

export default Search;

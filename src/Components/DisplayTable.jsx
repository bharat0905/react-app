import {React,useState,useEffect  } from 'react'
import import_Data from '../tmp_data.json'
import {Table} from 'react-bootstrap'
import { type } from '@testing-library/user-event/dist/type';


function DisplayTable() {    
  var rowcount = document.querySelectorAll("table tbody tr");
  console.log(rowcount)
  // var rowcount = document.getElementsByClassName("table_tag").rows;
  // console.log(rowcount)
  

  // we use this variable to store user enetred text
  const [search, setSearch] = useState('')
  // although both import_data and geojson data are object, but in js we have to create a variable with usestate in order to call it elsewhere its quite important to get this step right
    // you cant loop each item from import_data, usestate helps solve this
  const [geojsonData, setGeojsonData] = useState(import_Data);


  function handleSetView() {console.log('setview');}
  function handleFlyTo() {console.log('flyto');}




    return (
      <>
      
      <div onChange={(e)=> setSearch(e.target.value)} 
          style={{textAlign:'center',}}>
            <input type="text" name="search" placeholder='Search .....' />
        </div>
        <div style={{textAlign:'right',padding:'1%'}}>{"count:" + rowcount.length}</div>
        <br></br>
        {/* for styling we created class in App.css */}
        <Table style={{width:'100%'}}>
          <thead>
            <tr style={{position:'sticky',top:'0px'}}>
              <th style={{width:'45%'}}>Title</th>
              <th style={{width:'30%'}}>Type</th>
              <th style={{width:'25%'}}>Company</th>
            </tr>
          </thead>
          <tbody>
            {/* here we styled the table with width and height */}
            
            {/* here we loop inside json file with map function. Always go through geojson/json structure properly to get this step right */}
            {/* file.json->features->properties this is common strcutre of json, here we loop inisde file.json->features*/}
            {/* its important to pass key parameter in any div/table tag when using map, as our file doesnt have any id column we use index to generate uid */}
            {geojsonData.features.filter((feature)=>{
            // here filter function is used. As the data is stored as an array (JSON), we use filter array function 
              // it checks if entered text is blank if it is than it shows all the features(these are being created by this very function)
              //  return condition>return :(else) condition ||(or) condition
              return  search.toLowerCase() === '' ? feature : feature.properties.title.toLowerCase().includes(search) || feature.properties.company.toLowerCase().includes(search) ;
            }).map((feature, index) => (
              <tr key={index}>
                <td onClick={handleFlyTo}>{feature.properties.title}</td>
                <td>{feature.properties.job_type}</td>
                <td>{feature.properties.company}</td>
                {/* Add more columns based on your data */}
              </tr>
            ))}  
          </tbody>
        </Table>
      
      </>);
  }
  
  export default DisplayTable;
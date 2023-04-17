import { useState, useEffect } from "react";
import "react-tabulator/css/tabulator.css";
import { ReactTabulator } from "react-tabulator";
import "../style/field.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Modal } from "../components/Modal";

function Field() {
  const jwt = localStorage.getItem("jwt");

  // for extracting user_id
  const decoded = jwt_decode(jwt);

  var date = new Date();

  // Modifies date format to be compatible with Message form date input field
  var currentDateTime = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .replace(/.\d+Z$/g, "")
    .split("T")
    .join("T");

  //toggles Message draft area
  const [isInputVisible, setIsInputVisible] = useState(false);

  const showMessages = () => {
    setIsInputVisible(true);
  };
  const hideMessages = () => {
    setIsInputVisible(false);
  };

  //toggles boolean vs integer container visibility
  const [isVisible, setIsVisible] = useState(true);

  const toggleDiv = () => {
    setIsVisible(!isVisible);
  }
  //Submits data for Message
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/messages.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        setIsInputVisible(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  // Find Rig User is On
  const [username, setUsername] = useState("");
  const handleRig = () => {
    axios
      .get(`http://localhost:3000/users/${decoded.user_id}.json`)
      .then((response) => {
        localStorage.setItem("rig", response.data.rig_id);
        setUsername(response.data.first_name);
      });
  };

  useEffect(handleRig);

  const userRig = localStorage.getItem("rig");

  // Retrieving booleanChecklist for this Rig/User

  const [booleanChecklist, setBooleanChecklist] = useState({});
  const handleChecklist = () => {
    setBooleanChecklist("");
    axios
      .get(`http://localhost:3000/boolean_checklists/${userRig}.json`)
      .then((response) => {
        console.log(response.data);
        setBooleanChecklist({ ...response.data });
      });
  };
  useEffect(handleChecklist, []);

  // Retrieving itemChecklist for this Rig/User

  const [itemChecklist, setItemChecklist] = useState({});
  const handleItemChecklist = () => {
    setItemChecklist("");
    axios
      .get(`http://localhost:3000/item_checklists/${userRig}.json`)
      .then((response) => {
        console.log(response.data);
        setItemChecklist({ ...response.data });
      });
  };
  useEffect(handleItemChecklist, []);

  //Tabulator

  const columns = [
    { title: "Item", field: "item", width: 300, responsive: 0 },
    {
      title: "Is Done",
      field: "is_done",
      editor: "tickCross",
      editable: true,
      editorParams: {
        trueValue: true,
        falseValue: false,
        tristate: false,
        elementAttributes: {
          maxlength: "10", //set the maximum character length of the input element to 10 characters
        },
      },
      widthGrow: 1,
      responsive: 0,
    },
  ];

  var data = [
    {
      id: 1,
      item: `${Object.keys(booleanChecklist)[1]}`,
      is_done: `${Object.values(booleanChecklist)[1]}`,
    },
    {
      id: 2,
      item: `${Object.keys(booleanChecklist)[4]}`,
      is_done: `${Object.values(booleanChecklist)[4]}`,
    },
    {
      id: 3,
      item: `${Object.keys(booleanChecklist)[3]}`,
      is_done: `${Object.values(booleanChecklist)[3]}`,
    },
  ];

  // item tabulator
  const itemColumns = [
    {
      title: "Name",
      field: "name",
      editable: false,
      editorParams: {
        trueValue: true,
        falseValue: false,
        tristate: false,
        elementAttributes: {
          maxlength: "10", //set the maximum character length of the input element to 10 characters
        },
      },
      widthGrow: 1,
      responsive: 0,
    },
    {
      title: "Minimum",
      field: "minimum",
      editable: false,
      editorParams: {
        trueValue: true,
        falseValue: false,
        tristate: false,
        elementAttributes: {
          maxlength: "10", //set the maximum character length of the input element to 10 characters
        },
      },
      widthGrow: 1,
      responsive: 0,
    },
    {
      title: "Actual",
      field: "actual",
      editable: true,
      editor: "number",
      editorParams: {
        elementAttributes: {
          maxlength: "3", //set the maximum character length of the input element to 10 characters
        },
      },
      widthGrow: 1,
      responsive: 0,
    },
  ];

  var itemData = [
    {
      id: 1,
      name: `${Object.keys(itemChecklist)[1]}`,
      minimum: `${Object.values(itemChecklist)[1]}`,
      actual: `${Object.values(itemChecklist)[2]}`,
    },
    {
      id: 2,
      name: `${Object.keys(itemChecklist)[3]}`,
      minimum: `${Object.values(itemChecklist)[3]}`,
      actual: `${Object.values(itemChecklist)[4]}`,
    },
    {
      id: 3,
      name: `${Object.keys(itemChecklist)[5]}`,
      minimum: `${Object.values(itemChecklist)[5]}`,
      actual: `${Object.values(itemChecklist)[6]}`,
    },
  ];
  return (
    <div className="App">
      
      
        <div className="field_container">
        <div className="welcome">Welcome, {username.toUpperCase()}</div>
      
      {isVisible ? 
                <div className="boolean_container">
                <ReactTabulator
                  
                  data={data}
                  columns={columns}
                  layout={"fitDataFill"}
                  layoutColumnsOnNewData={"true"}
                  responsiveLayout={"collapse"}
                  textDirection={"rtl"}
                />
                </div>
                : 
                  <div className="integer_container">
                  <ReactTabulator
                  
                    data={itemData}
                    columns={itemColumns}
                    layout={"fitDataFill"}
                    layoutColumnsOnNewData={"true"}
                    responsiveLayout={"collapse"}
                    textDirection={"rtl"}
                  />
          
                </div>}
      

 
        </div>
        
          
          <Modal show={isInputVisible} onClose={hideMessages}>
            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="user_id"
                defaultValue={decoded.user_id}
              ></input>
              <input
                type="hidden"
                name="date"
                defaultValue={currentDateTime}
              ></input>
              <div>Shift:</div>
              <div className="flex-shifts">
                <div>
                  <input type="radio" name="shift" value="first"></input>
                  <label>First</label>
                </div>
                <div>
                  <input type="radio" name="shift" value="second"></input>
                  <label>Second</label>
                </div>
              </div>
              <div>Message:</div>
              <textarea
                type="textarea"
                cols="25"
                rows="5"
                name="content"
              ></textarea>
              
              <button type="submit">Submit</button>
            </form>
          </Modal>
        
        <div className="bottom-Bar">
        <button className="field_button" type="button" onClick={handleChecklist}> Reset Rig {userRig} Checklist</button>
        <button className="field_button" type="button" onClick={showMessages}>Send A Message</button>
        <button className="field_button" onClick={toggleDiv}>Toggle</button>
          </div>
    
    </div>
  );
}

export default Field;





































// import React, { useState, useEffect } from 'react';
// import { Toolbar } from '../components/toolbar.js'
// import Tabulator from 'react-tabulator';
// import "tabulator-tables/dist/css/tabulator.min.css";
// import '../style/field.css';
// import IntInventory from "../components/int_inventory.js"
// import BooInventory from "../components/boo_inventory.js"

    // export const Field = () => {
    //     const [table, setTable] = useState(null);
    //     const [isInt, setIsInt] = useState(true);
    
    //     useEffect(() => {
        
    //     const table = new Tabulator("#tabulator-table", {
    //         layout: "fitDataFill", 
    //         columns: [ 
    //             { title: "ID", field: "id" }, 
    //             { title: "Name", field: "name" },
    //             { title: "Age", field: "age" }, 
    //         ],
    //         data: [], 
    //         placeholder: "No data available",
    //         });
    //     setTable(table);
    
        
    //     return () => {
    //         if (table) {
    //         table.destroy();
    //         }
    //     };
    //     }, []);
    
    //     const handleButtonClick = () => {
        
    //     setIsInt(!isInt);
    //     const inventoryData = isInt ? IntInventory : BooInventory;
    //         if (table) {
    //             table.setData(inventoryData);
    //         }
    //     };
    
    //     return (
    //     <div className="Field">
    //         <div className="FieldContainer">
    //             <div className="tabContainer">
    //             <div id="tabulator-table" />
                
    //             <button onClick={handleButtonClick}>Toggle Inventory</button>
    //             </div>
    //         </div>
    //         <Toolbar />
    //     </div>
    //     );
    // };
  
 





// export function Field(props){
//     const columns = [props.columns];

//   // Update table data callback function
//   const handleUpdateData = (newData) => {
//     props.updateData(newData);
//   }
//     return(
//         <div className="Field">
//             <div className="FieldContainer">
//                 <div className="tabContainer">
//                 <ReactTabulator
//                     maxheight={"70vh"}
//                     maxwidth={"80vw"}
//                     data={props.data}
//                     columns={columns}
//                     layout={"fitDataFill"}
//                     layoutColumnsOnNewData={"true"}
//                     responsiveLayout={"collapse"}
//                     textDirection={"rtl"}
//                 />
//                 </div>
//             </div>
//         <Toolbar onUpdateData={handleUpdateData}/>
//         </div>
//     )
// }


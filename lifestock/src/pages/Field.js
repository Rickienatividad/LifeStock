import { useState } from "react";

import "react-tabulator/css/tabulator.css";
import { Modal } from "../components/Modal";
import { BooInventory } from "../components/boo_inventory";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Field() {
  const jwt = localStorage.getItem("jwt");
  const decoded = jwt_decode(jwt);

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

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

  const handleChecklist = () => {
    console.log("Checklist reset!");
  };

  const showMessages = () => {
    setIsInputVisible(true);
  };

  const hideMessages = () => {
    setIsInputVisible(false);
  };

  const date = new Date();
  const currentDateTime = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .replace(/.\d+Z$/g, "")
    .split("T")
    .join("T");

  return (
    <div className="App">
      <div className="field_container">
        {isVisible ? (
          <div className="boolean_container">
            <BooInventory />
          </div>
        ) : (
          <div className="integer_container">
            <BooInventory />
          </div>
        )}
      </div>

      <Modal show={isInputVisible} onClose={hideMessages}>
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="user_id"
            defaultValue={decoded.user_id}
          />
          <input type="hidden" name="date" defaultValue={currentDateTime} />
          <div>Shift:</div>
          <div className="flex-shifts">
            <div>
              <input type="radio" name="shift" value="first" />
              <label>First</label>
            </div>
            <div>
              <input type="radio" name="shift" value="second" />
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
        <button
          className="field_button"
          type="button"
          onClick={handleChecklist}
        >
          Reset Rig Checklist
        </button>
        <button className="field_button" type="button" onClick={showMessages}>
          Send A Message
        </button>
        <button className="field_button" onClick={toggleDiv}>
          Toggle
        </button>
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


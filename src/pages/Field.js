import { useState, useEffect } from "react";
import "react-tabulator/css/tabulator.css";
import { ReactTabulator } from "react-tabulator";
import "../style/field.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Modal } from "../components/Modal.js";
import Sidebar from "../components/Sidebar";

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

  let userId = decoded.user_id;

  useEffect(handleRig, []);

  const userRig = localStorage.getItem("rig");

  //Retrieving rig_checklist for this Rig/User
  const [rigChecklist, setRigChecklist] = useState({});
  const handleChecklist = () => {
    setRigChecklist("");
    axios
      .get(`http://localhost:3000/rig_checklists/${userRig}.json`)
      .then((response) => {
        console.log(response.data);
        setRigChecklist({ ...response.data });
      });
  };
  useEffect(handleChecklist, [username]);

  //Retrieving booleanChecklist for this Rig/User

  const [booleanChecklist, setBooleanChecklist] = useState({});
  const handleBooleanChecklist = () => {
    setBooleanChecklist("");
    axios
      .get(`http://localhost:3000/boolean_checklists/${userRig}.json`)
      .then((response) => {
        console.log(response.data);
        setBooleanChecklist({ ...response.data });
      });
  };
  useEffect(handleBooleanChecklist, []);



  // item tabulator
  const itemColumns = [
    {
      title: "Item",
      field: "item",
      editable: false,
      editorParams: {
        resizable: false,
        trueValue: true,
        falseValue: false,
        tristate: false,
        elementAttributes: {
          maxlength: "10",
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
        resizable: false,
        trueValue: true,
        falseValue: false,
        tristate: false,
        elementAttributes: {
          maxlength: "10",
        },
      },
      widthGrow: 1,
      responsive: 0,
    },
    {
      title: "Actual",
      field: "actual_count",
      editable: true,
      editor: "number",
      editorParams: {
        resizable: false,
        elementAttributes: {
          maxlength: "3",
        },
      },
      widthGrow: 1,
      responsive: 0,
    },
  ];

  let array = [];

  Object.entries(rigChecklist).map((item) => {
    array.push(item[1]);
    return item;
  });
  let itemData = array;

  //Holds updated table data.
  const [updatedTableData, setUpdatedTableData] = useState([]);
  //updates when data changes.
  const handleDataChange = (newData) => {
    setUpdatedTableData(newData);
  };
   //Calls sendData() on state change.
   useEffect(() => {
    sendData();
  }, [updatedTableData]);
  //Sends Data and handles response.
  const sendData = () => {
    axios
      .patch("http://localhost:3000/rig_checklists/1.json", updatedTableData)
      .then((response) => {
        console.log(response.data);
      })
  };

  
  

  return (
    <div className="App">
      <div className="field_container">
        {/* <Sidebar id={userId} username={username} userRig={userRig} /> */}
        <h4 className="welcome">{Date()}</h4>

        <div className="field_subcontainer">
          <ReactTabulator
            data={itemData}
            dataChanged={handleDataChange}
            columns={itemColumns}
            layout={"fitDataFill"}
            layoutColumnsOnNewData={true}
            responsiveLayout={"collapse"}
            textDirection={"rtl"}
            selectable={false}
            resizableRows={false}
            formatter={"textarea"}
          />
        </div>
        <div className="field_options">
          <button type="button" onClick={handleChecklist}>
            Reset Rig {userRig} Checklist
          </button>
          <button type="button" onClick={showMessages}>
            Send A Message
          </button>
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
        </div>
        <button onClick={sendData}>Send Data</button>
        <div className="bottom-Bar">Field Tech Portal</div>
      </div>
    </div>
  );
}

export default Field;

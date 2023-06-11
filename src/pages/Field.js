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
        // console.log(response.data);
        setRigChecklist({ ...response.data });
      });
  };
  useEffect(handleChecklist, [username]);

  let array = [];

  Object.entries(rigChecklist).map((item) => {
    item[1].rand = Math.random();
    array.push(item[1]);
    return item;
  });

  let currentManifest;
  const findManifest = (event) => {
    currentManifest = event;
    return currentManifest;
  };

  useEffect(findManifest);

  //updating manifests/checklists
  const requestArray = [];
  const requestObj = {};

  const addRequest = (event) => {
    requestObj[currentManifest] = event.target.value;
    requestArray.push(requestObj);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const payload = requestArray[requestArray.length - 1];
    for (const [key, value] of Object.entries(payload)) {
      axios
        .patch(`http://localhost:3000/manifests/${key}.json`, {
          actual_count: value,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    }

    axios
      .patch(`http://localhost:3000/rig_checklists/${userRig}.json`, {
        signed_by: username,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div className="App">
      <div className="field_container">
      
        <Sidebar id={userId} username={username} userRig={userRig} />
        
        <div className="field-checklist-container">
        <div className="checklist-item-container">
          <h6>Item</h6>
          <h6>Minimum</h6>
          <h6>Actual Count</h6>
        </div>
        <div className="field-form-wrapper">
        {array.map((item) => (
          <form key={item.rand} className="item-form">
            <div
              className="item-flex items"
              defaultValue={item.manifest_id}
              onClick={() => findManifest(item.manifest_id)}
            >
              <input defaultValue={item.item} readOnly></input>
              <input defaultValue={item.minimum} readOnly></input>
              <input
                defaultValue={item.actual_count}
                type="number"
                // onBlur={updateManifest}
                onBlur={addRequest}
              ></input>
            </div>
          </form>
        ))}
        </div>
        <form onSubmit={handleUpdate}>
          <label>Signed by:</label>
          <input type="text" name="signed_by" defaultValue={username}></input>
          <button type="submit">Save Checklist</button>
        </form>
        <div className="field_options">
          <button type="button" onClick={handleChecklist}>
            Reset Rig {userRig} Checklist
          </button>

          </div>
          </div>
          <div className="field-messages-container">
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
                <div className="shift">
                  <input type="radio" name="shift" value="first"></input>
                  <label>First</label>
                </div>
                <div className="shift">
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
          <button type="button" onClick={showMessages}>
            Send A Message
          </button>
          </div>
        
        <div className="bottom-Bar">
        <h4 className="welcome">{Date()}</h4>
        </div>
      </div>
    </div>
  );
}

export default Field;
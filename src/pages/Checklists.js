import axios from "axios";
import { useState, useEffect } from "react";
import "../style/Checklists.css";

export function Checklists() {
  const [items, setItems] = useState([]);
  const handleItems = () => {
    axios.get("http://localhost:3000/items.json").then((response) => {
      setItems(response.data);
      console.log(response.data);
    });
  };
  useEffect(handleItems, []);

  const [manifests, setManifests] = useState([]);

  const handleManifests = () => {
    axios.get("http://localhost:3000/manifests.json").then((response) => {
      setManifests(response.data);
    });
  };

  useEffect(handleManifests, []);

  const [searchFilter, setSearchFilter] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/manifests.json", params)
      .then((response) => {
        console.log(response.data);
        handleManifests();
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  const [selectedItem, setSelectedItem] = useState("");

  const itemId = (event) => {
    let chosenId;
    const chosenItem = event.target.value;
    for (let item of items) {
      if (item.name === chosenItem) {
        chosenId = item.id;
      }
    }
    console.log(chosenId);
    setSelectedItem(chosenId);
  };
  return (
    <div className="checklist_container">
      <div className="checklist_interface" id="card">
        <div className="checklist_interface_title">ITEMS → RIG:</div>
        <label className="card_label">Choose a Rig</label>
        <input
          type="text"
          value={searchFilter}
          onChange={(event) => setSearchFilter(event.target.value)}
          list="rig_checklist_id"
        />
        {/* <select id="rig_checklist_id">
          {manifests.map((manifest) => (
            <option key={manifest.id}>{manifest.rig_checklist_id}</option>
          ))}
        </select> */}

        {/* <div className="add_item"> */}
          <form className="manifest_form" onSubmit={handleSubmit}>
            <label className="card_label">Add Item to Checklist:</label>

            <select id="item" name="id" onChange={itemId}>
              {items.map((item) => (
                <option key={item.id} name="item_id">
                  {item.name}
                </option>
              ))}
            </select>
            {/* <label hidden>Item Id</label> */}
            <input
              type="number"
              name="item_id"
              value={selectedItem}
              hidden
            ></input>
            {/* <label hidden>Rig:</label> */}
            <input
              type="number"
              value={searchFilter}
              name="rig_checklist_id"
              hidden
            ></input>
            <button type="submit">add to list</button>
          </form>
        {/* </div> */}
      </div>
      <div className="checklist_display" id="card">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Minimum</th>
            </tr>
          </thead>
          <tbody>
            {manifests
              .filter((manifest) => manifest.rig_checklist_id == searchFilter)
              .map((manifest) => (
                <tr key={manifest.id}>
                  <td>{manifest.item_name}</td>
                  <td>{manifest.item_minimum}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import axios from "axios";
import { useState, useEffect } from "react";
import "../style/Checklists.css";

export function Checklists() {
  const [manifests, setManifests] = useState([]);

  const handleManifests = () => {
    axios.get("http://localhost:3000/manifests.json").then((response) => {
      setManifests(response.data);
      console.log(response.data);
    });
  };

  useEffect(handleManifests, []);

  const [searchFilter, setSearchFilter] = useState("");

  return (
    <div className="checklist_container">
      <div className="checklist_interface">
      <h6>View/Add Current Rig Items: </h6>
      <p>Choose a Rig</p>
      <input
        type="text"
        value={searchFilter}
        onChange={(event) => setSearchFilter(event.target.value)}
        list="rig_checklist_id"
      />
      <datalist id="rig_checklist_id">
        {manifests.map((manifest) => (
          <option key={manifest.id}>{manifest.rig_checklist_id}</option>
        ))}
      </datalist>
      </div>

          <div className="checklist_display">
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
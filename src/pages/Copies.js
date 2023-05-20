import { useState, useEffect } from "react";
import axios from "axios";
import { Fragment } from "react";

export function Copies() {
  // acquire rig checklist index for all rigs
  const [checklists, setChecklists] = useState([]);

  const handleChecklists = () => {
    axios
      .get("http://localhost:3000/rig_checklists.json")
      .then((response) => {
        setChecklists(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  useEffect(handleChecklists, []);

  let array = [];
  let listArray = [];

  Object.entries(checklists).map((item) => {
    listArray.push(item[1]);
    item[1].manifests.forEach((item) => {
      array.push(item);
    });
    return item;
  });

  return (
    <div>
      <button type="button">Checklists Per Rig</button>
      <div>
        {listArray.map((list) => (
          <table key={list.id}>
            <thead>
              <tr>
                <td>Item</td>
                <td>Minimum Count</td>
                <td>Actual Count</td>
                <td>Rig Id: {list.rig_id}</td>
              </tr>
            </thead>
            {array.map((manifest) =>
              manifest.checklist_id === list.id ? (
                <tbody key={Math.random(manifest.id)}>
                  <tr>
                    <td>{manifest.item}</td>
                    <td>{manifest.minimum}</td>
                    <td>{manifest.actual}</td>
                  </tr>
                </tbody>
              ) : (
                // <></>
                <Fragment key={Math.random()} />
              )
            )}
            <tbody>
              <tr>
                <td>Rig {list.rig_id}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";
import { Fragment } from "react";
import "../style/Copies.css";
import { Link } from "react-router-dom";
import { Modal } from "../components/Modal";

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

  const [isListVisible, setIsListVisible] = useState(false);
  const [currentList, setCurrentList] = useState({});

  const showList = (list) => {
    setIsListVisible(true);
    setCurrentList(list);
  };

  const hideList = () => {
    setIsListVisible(false);
  };

  return (
    <div className="main">
      <div>
        {listArray
          .sort((a, b) => a.rig_id - b.rig_id)
          .map((list) => (
            <div key={list.id}>
              <Link to="#" onClick={showList}>
                Rig: {list.rig_id} - {list.date}
              </Link>
              <table style={{ display: isListVisible ? "block" : "none" }}>
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
            </div>
          ))}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";
import "../style/Copies.css";
import { SupeModal } from "../components/SupeModal";
import { ListsIndex } from "./ListsIndex";
import { ListsShow } from "./ListsShow";
import { ChecklistNumbers } from "./ChecklistNumbers";

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
      <div className="flex-container">
        <ChecklistNumbers />
        <ListsIndex checklists={checklists} onSelectList={showList} />
      </div>

      <SupeModal show={isListVisible} onClose={hideList}>
        <ListsShow list={currentList} array={array} />
      </SupeModal>
    </div>
  );
}

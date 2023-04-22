import React, { useState, useEffect } from 'react';
import ReactTabulator from 'react-tabulator';
import axios from 'axios';
import Rigs from './Rigs';

export function BooInventory(){
  const { userRig, username } = Rigs();
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
  //Populates the Tabulator Render
  const data = Object.entries(booleanChecklist).map(([key, value], index) => ({
    id: index + 1,
    item: key,
    is_done: value,
  }));

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
          maxlength: "10",
        },
      },
      widthGrow: 1,
      responsive: 0,
    },
  ];

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <ReactTabulator data={data} columns={columns} />
    </div>
  );
}










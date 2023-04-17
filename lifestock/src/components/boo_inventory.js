import axios from "axios";
import { useState, useEffect } from 'react'

const BooInventory = () => {
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
}
  
export default BooInventory;
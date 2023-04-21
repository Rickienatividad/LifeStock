import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Rigs = () => {
  const [userRig, setUserRig] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      axios
        .get(`http://localhost:3000/users/${decoded.user_id}.json`)
        .then((response) => {
          localStorage.setItem("rig", response.data.rig_id);
          setUsername(response.data.first_name);
          setUserRig(response.data.rig_id);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return { userRig, username };
};

export default Rigs;



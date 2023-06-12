import React, { useState } from "react";
import "../style/Sidebar.css";

function Sidebar(props) {
  const userId = props.id;
  const username = props.username;
  const userRig = props.userRig;

  return (
    <div className={`sidebar`}>
      <div
        className="sidebar-1"
        // style={{
        //   backgroundImage: `url("../assets/${userId}.jpg")`,
        // }}
      ></div>
      <div className="sidebar-info">
        <div className="sidebar-2">
          <h1 className="name">{username}</h1>
        </div>

        <div className="sidebar-4">
          <h5>Assignment: rig {userRig}</h5>
        </div>

        <div className="sidebar-5"></div>
      </div>
    </div>
  );
}

export default Sidebar;

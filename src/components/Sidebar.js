import React, { useState } from "react";
import "../style/Sidebar.css";

function Sidebar(props) {
  const userId = props.id;
  const username = props.username;
  const userRig = props.userRig;

  const [isOpen, setIsOpen] = useState(false);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <span className={`toggle-icon ${isOpen ? "open" : ""}`}>≡</span>
        </button>
        <div className={`sidebar-content ${isOpen ? "open" : ""}`}>
          <div
            className="sidebar-1"
            style={{
              backgroundImage: `url("/img/${userId}.png")`,
            }}
          ></div>
          <div className="sidebar-2">
            <h1 className="name">{username}</h1>
          </div>
          <div className="sidebar-3"></div>
          <div className="sidebar-4">
            <h5>Assignment: rig {userRig}</h5>
          </div>

          <div className="sidebar-5"></div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

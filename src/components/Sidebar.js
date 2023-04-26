import React, { useState } from "react";
import "../style/Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <span className={`toggle-icon ${isOpen ? "open" : ""}`}>≡</span>
      </button>
      <div className={`sidebar-content ${isOpen ? "open" : ""}`}>
        <div className="sidebar-1"></div>
        <div className="sidebar-2"></div>
        <div className="sidebar-3"></div>
        <div className="sidebar-4"></div>
        <div className="sidebar-5"></div>
      </div>
    </div>
  );
}

export default Sidebar;



import axios from "axios";
import { useState, useEffect } from "react";
import "../style/Modal.css";

export function Modal() {
  const [messages, setMessages] = useState([]);

  const handleMessages = () => {
    axios.get("http://localhost:3000/messages.json").then((response) => {
      setMessages(response.data);
    });
  };

  // Renders messages on load
  useEffect(handleMessages, []);

  return (
      <section className="modal-main" id='card'>
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className="message">
              <p>
                <span className="bold">date:</span> {message.date}
              </p>
              <p>
                <span className="bold">shift:</span> {message.shift}
              </p>
              <p>
                <span className="bold">field tech: </span>
                {message.user_first} {message.user_last}{" "}
              </p>
              <p>
                <span className="bold">message:</span> {message.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    
  );
}

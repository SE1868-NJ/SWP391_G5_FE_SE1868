import React, { useState } from "react";
import styles from "./Chatbot.module.css";
import  { chatIcon, iconCart, iconSend, sendIcon } from "../icon/Icon";


const MenuList = ({setShowChat}) => {
    return (
      <div className={styles.chatContainer_icon}>
      <ul className={styles.menuList} onClick={()=> setShowChat(true)}>
        <li className={styles.menuItem} style={{ "--i": "#56CCF2", "--j": "#2F80ED" }}>
          <span className={styles.icon} style={{margin: 0}}>{chatIcon}</span>
          <span className={styles.title}>Hỏi đáp</span>
        </li>
      </ul>
      </div>
    );
  };

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
    { text: "Hello! I need a Chatbot!", sender: "user" },
  ]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);


  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  if(showChat){
    return (
      <div className={styles.chatContainer}>
       <div className={styles.chatHeader} onClick={()=> setShowChat(false)}>
          <h2>Chatbot</h2>
          <div className={styles.onlineStatus}>Trực tuyến</div>
        </div>
  
        <div className={styles.chatDisplay}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.chatMessage} ${
                msg.sender === "user" ? styles.userMessage : styles.botMessage
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
  
        <div className={styles.chatInputContainer}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.chatInput}
          />
          <button onClick={handleSend} className={styles.sendButton}>
          {sendIcon}
          </button>
        </div>
      </div>
    );
  }
  return <MenuList setShowChat={setShowChat}/>
 
};

export default Chatbot;

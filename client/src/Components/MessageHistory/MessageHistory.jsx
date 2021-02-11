
import React from "react";
import "./message-history.css"



export const MessageHistory = ({ msg }) => {
  if (!msg) return null;


  return msg.map((row, i) => (
    
      <div key={i} className= "message-history">
        <div>
          <div className= "message-name">{row.sender}</div>
          <div className= "message-name">
            {row.msgAt && new Date(row.msgAt).toLocaleString()}
          </div>
        </div>
        <div className = "message">{row.message}</div>
      </div>
    
  ));
};

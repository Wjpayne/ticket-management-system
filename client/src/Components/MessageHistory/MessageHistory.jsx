
import { makeStyles } from "@material-ui/core";
import React from "react";
import { useContext } from "react";
import DarkModeContext from "../../DarkModeContext/DarkModeContext";
import "./message-history.css"

const messageStyles = makeStyles(() => ({

  messageName: {
    fontWeight: "bold",
    color: "black",
    transition: " all 0.30s ease-in-out",
  },

  messageNameDark: {
    fontWeight: "bold",
    color: "white",
    transition: " all 0.30s ease-in-out",
  }

}))



export const MessageHistory = ({ msg }) => {

  const classes = messageStyles()

  const { darkMode } = useContext(DarkModeContext)

  if (!msg) return null;




  return msg.map((row, i) => (
    
      <div key={i} className= "message-history">
        <div>
          <div className= {!darkMode ? classes.messageName : classes.messageNameDark}>{row.sender}</div>
          <div className= {!darkMode ? classes.messageName : classes.messageNameDark}>
            {row.msgAt && new Date(row.msgAt).toLocaleString()}
          </div>
        </div>
        <div className = "message">{row.message}</div>
      </div>
    
  ));
};

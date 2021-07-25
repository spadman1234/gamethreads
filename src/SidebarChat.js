import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";

const SidebarChat = (props) => {
  return (
    <div className="sidebarChat">
      <div className="sidebarChat-logo">
        <Avatar src={props.img} />
      </div>
      <div className="sidebarChat-info">
        <h2>{props.title}</h2>
        <p>{props.subtitle}</p>
      </div>
    </div>
  );
};

export default SidebarChat;

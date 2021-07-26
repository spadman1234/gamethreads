import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";

const SidebarChat = (props) => {
  let subtitle = props.subtitle;
  if (subtitle[subtitle.length - 1] === "Z") {
    const date = new Date(subtitle);
    subtitle = date.toLocaleTimeString();
  }
  return (
    <div className="sidebarChat">
      <div className="sidebarChat-logo">
        <Avatar src={props.img} />
      </div>
      <div className="sidebarChat-info">
        <h2>{props.title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default SidebarChat;

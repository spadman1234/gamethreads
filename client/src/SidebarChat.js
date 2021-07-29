import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";
import images from "./images.js";

const SidebarChat = (props) => {
  let subtitle = props.subtitle;
  if (subtitle[subtitle.length - 1] === "Z") {
    const date = new Date(subtitle);
    subtitle = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (subtitle[0] === "0") {
      subtitle = subtitle.substring(1);
    }
  }

  const logoName = props.img;
  console.log(props.img);
  return (
    <div className="sidebarChat">
      <div className="sidebarChat-logo">
        <Avatar src={images[logoName].default} />
      </div>
      <div className="sidebarChat-info">
        <h2>{props.title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default SidebarChat;

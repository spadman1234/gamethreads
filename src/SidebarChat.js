import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";

const SidebarChat = () => {
  return (
    <div className="sidebarChat">
      <div className="sidebarChat-logo">
        <Avatar src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-original-577x577/s3/052014/mlb.png?itok=4WGm1016" />
      </div>
      <div className="sidebarChat-info">
        <h2>New York Mets vs Washington Nationals</h2>
        <p>Last message</p>
      </div>
    </div>
  );
};

export default SidebarChat;

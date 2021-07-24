import React from "react";
import "./Sidebar.css";
import { Avatar } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import ChatIcon from "@material-ui/icons/Chat";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar />
        <div className="sidebar-title">
          <h1>gamethreads</h1>
          <ChatIcon />
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-search-container">
          <SearchOutlined />
          <input placeholder="Search for gamethreads" type="text" />
        </div>
      </div>
      <div className="sidebar-chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;

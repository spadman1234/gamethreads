import { Avatar } from "@material-ui/core";
import { InsertEmoticon, Send } from "@material-ui/icons";
import React from "react";
import "./Chat.css";

const ChatMessage = (props) => {
  return (
    <div className="chat-message-container">
      <p
        className={
          props.sent ? "chat-message chat-message-sent" : "chat-message"
        }
      >
        <span className="chat-message-name">{props.username}</span>
        {props.message}
      </p>
      <span className="chat-message-date">
        {new Date().toLocaleTimeString()}
      </span>
    </div>
  );
};

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-original-577x577/s3/052014/mlb.png?itok=4WGm1016" />
        <div className="chat-header-info">
          <h2>New York Mets vs Washington Nationals</h2>
          <p>MLB - July 23, 2021 - 7:00pm EDT</p>
        </div>
      </div>
      <div className="chat-body">
        <ChatMessage
          message="This is a test message!"
          username="spadman"
          sent={false}
        />
        <ChatMessage
          message="Another message"
          username="superspad"
          sent={true}
        />
        <ChatMessage
          message="Yessirski lets go"
          username="mrbluesky"
          sent={false}
        />
      </div>
      <div className="chat-footer">
        <InsertEmoticon />
        <form>
          <input placeholder="Type a message" type="text" />
          <button type="submit">
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

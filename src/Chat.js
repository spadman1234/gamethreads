import { Avatar } from "@material-ui/core";
import { Close, InsertEmoticon, Send } from "@material-ui/icons";
import React, { useState } from "react";
import "./Chat.css";
import Picker from "emoji-picker-react";

const ChatMessage = (props) => {
  return (
    <div
      className={
        props.sent ? "chat-message-container-sent" : "chat-message-container"
      }
    >
      <Avatar
        className="chat-message-flair"
        src="http://loodibee.com/wp-content/uploads/nfl-new-york-jets-team-logo.png"
      />
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

const Chat = (props) => {
  const [chatboxValue, setChatboxValue] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const onChatboxChange = (event) => {
    setChatboxValue(event.target.value);
  };

  const onEmojiSelect = (event, emojiObject) => {
    setChatboxValue(chatboxValue.concat(emojiObject.emoji));
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };

  const closeEmojiPicker = () => {
    setEmojiPickerVisible(false);
  };
  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src="http://loodibee.com/wp-content/uploads/nfl-league-logo.png" />
        <div className="chat-header-info">
          <h2>New York Jets vs Carolina Panthers</h2>
          <p>NFL - September 6 - 1:00pm EDT</p>
        </div>
        <div className="chat-exit-button" onClick={props.onClose}>
          <Close></Close>
        </div>
      </div>
      <div className="chat-body" onClick={closeEmojiPicker}>
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
        {emojiPickerVisible ? (
          <div className="chat-footer-emoji-picker">
            <Picker onEmojiClick={onEmojiSelect} />
          </div>
        ) : (
          <div></div>
        )}
        <InsertEmoticon onClick={toggleEmojiPicker} />

        <form>
          <input
            placeholder="Type a message"
            type="text"
            onChange={onChatboxChange}
            value={chatboxValue}
            onClick={closeEmojiPicker}
          />
          <button type="submit">
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

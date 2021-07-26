import { Avatar } from "@material-ui/core";
import { Close, InsertEmoticon, Send } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Picker from "emoji-picker-react";
import Pusher from "pusher-js";
import axios from "./axios";

const ChatMessage = (props) => {
  return (
    <div
      className={
        props.sent ? "chat-message-container-sent" : "chat-message-container"
      }
    >
      <Avatar className="chat-message-flair" src={props.flair} />
      <p
        className={
          props.sent ? "chat-message chat-message-sent" : "chat-message"
        }
      >
        <span className="chat-message-name">{props.username}</span>

        {props.message}
      </p>
      <span className="chat-message-date">{props.timestamp}</span>
    </div>
  );
};

const Chat = (props) => {
  const [chatboxValue, setChatboxValue] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  let subtitle = props.subtitle;
  if (subtitle[subtitle.length - 1] === "Z") {
    const date = new Date(subtitle);
    subtitle = date.toLocaleTimeString();
  }

  useEffect(() => {
    axios.get("/api/v1/messages/sync").then((response) => {
      setMessages(
        response.data.filter((message) => message.chatroom === props.title)
      );
    });
  }, [props.title]);

  console.log(messages);

  useEffect(() => {
    const pusher = new Pusher("6afaa4f9c8ed5946ac96", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      if (props.title === newMessage.chatroom) {
        setMessages([...messages, newMessage]);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, props.title]);

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

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    axios.post("/api/v1/messages/new", {
      message: chatboxValue,
      name: props.username,
      timestamp: new Date().toLocaleTimeString(),
      flair: props.flair,
      received: false,
      chatroom: props.title,
    });
    setChatboxValue("");
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src={props.img} />
        <div className="chat-header-info">
          <h2>{props.title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="chat-exit-button" onClick={props.onClose}>
          <Close></Close>
        </div>
      </div>
      <div className="chat-body" onClick={closeEmojiPicker}>
        {messages.map((message) => (
          <ChatMessage
            message={message.message}
            flair={message.flair}
            username={message.name}
            timestamp={message.timestamp}
            sent={message.name === props.username}
          />
        ))}
        <div ref={messagesEndRef} />
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
            autoFocus={true}
          />
          <button onClick={sendMessage} type="submit">
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

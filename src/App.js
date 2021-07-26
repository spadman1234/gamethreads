import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

const HomeScreen = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [usernameValue, setUsernameValue] = useState("");

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleConfirm = (e) => {
    if (e) {
      e.preventDefault();
    }
    setDialogOpen(false);
    props.setUsername(usernameValue);
  };

  const handleUsernameValueChange = (event) => {
    setUsernameValue(event.target.value);
  };

  return (
    <div className="home-screen">
      <h1>{props.username ? `Welcome, ${props.username}` : "Welcome"}</h1>
      <p>
        {props.username
          ? "Choose your flair, select a chat, and join the conversation"
          : ""}
      </p>
      {props.username ? (
        <div></div>
      ) : (
        <Button variant="outlined" color="default" onClick={handleClickOpen}>
          Choose a username
        </Button>
      )}
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <form onSubmit={handleConfirm} autoComplete="off">
            <TextField
              value={usernameValue}
              onChange={handleUsernameValueChange}
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              variant="outlined"
              type="username"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

function App() {
  const handleChatClose = () => {
    setCurrentChat(null);
  };

  const [currentFlair, setCurrentFlair] = useState("");
  const [username, setUsername] = useState("");
  const [currentChat, setCurrentChat] = useState();

  const handleSetChat = (chat) => {
    setCurrentChat(chat);
  };

  const handleSetFlair = (flair) => {
    setCurrentFlair(flair);
  };

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar
          username={username}
          setChat={handleSetChat}
          setFlair={handleSetFlair}
        />
        {currentChat ? (
          <Chat
            img={currentChat.img}
            title={currentChat.title}
            subtitle={currentChat.subtitle}
            onClose={handleChatClose}
            username={username}
            flair={currentFlair}
          />
        ) : (
          <HomeScreen username={username} setUsername={setUsername} />
        )}
      </div>
    </div>
  );
}

export default App;

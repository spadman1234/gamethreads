import { useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

function App() {
  const handleChatClose = () => {
    setCurrentView(null);
  };

  const [currentView, setCurrentView] = useState(
    <Chat onClose={handleChatClose} />
  );

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        {currentView}
      </div>
    </div>
  );
}

export default App;

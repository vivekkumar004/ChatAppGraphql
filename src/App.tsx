import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ChatApp from "./components/ChatApp";
import AppContextProvider from "./context/AppContextProvider";

function App() {
  return (
    <React.StrictMode>
      <AppContextProvider>
        <div className="App">
          <ChatApp />
        </div>
      </AppContextProvider>
    </React.StrictMode>
  );
}

export default App;

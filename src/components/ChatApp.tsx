import React, { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import { channelOption, usersOption } from "../utils/data";

const mainStyle = {};

function ChatApp() {
  const { user, setUser, channel, setChannel } = useContext(AppContext);
  return (
    <div
      className="main"
      style={{
        backgroundColor: "rgb(244, 245, 251)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <section
        style={{ width: "35vw", borderRight: "1px solid rgb(230, 236, 243)" }}
      >
        <h5>1. Choose your </h5>
        <select>
          {usersOption.map((user) => (
            <option>{user}</option>
          ))}
        </select>

        <h5>2. Choose your Channel</h5>
        {channelOption.map((channel) => (
          <p>{channel}</p>
        ))}
      </section>
      <section>
        <h1>hello</h1>
      </section>
    </div>
  );
}

export default ChatApp;

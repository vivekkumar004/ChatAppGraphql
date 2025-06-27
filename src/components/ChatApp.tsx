import React, { useContext } from "react";
import {
  AppContext,
  ChannelType,
  UserType,
} from "../context/AppContextProvider";
import { channelOption, usersOption } from "../utils/data";
import { headerStyle, StyledText } from "../styles/MainPageStyles";
import ChatScreen from "./chat/ChatScreen";

function ChatApp() {
  const { user, setUser, channel, setChannel } = useContext(AppContext);

  const handleChannelClick = (channel: ChannelType) => {
    setChannel(channel);
  };

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
        style={{
          width: "30vw",
          borderRight: "1px solid rgb(230, 236, 243)",
          marginTop: "3vh",
          paddingLeft: "1rem",
          display: "flex",
          gap: "0.8rem",
          flexDirection: "column",
        }}
      >
        <h5 style={headerStyle}>1. Choose your </h5>
        <select
          value={user}
          onChange={(event) => {
            const selectedOption = event.target.value as UserType;
            setUser(selectedOption);
          }}
          style={{
            height: "2.5rem",
            borderRadius: 5,
            borderColor: "#ced4da",
            fontSize: "1rem",
            padding: 10,
          }}
        >
          {usersOption.map((user, index) => (
            <option key={index}>{user}</option>
          ))}
        </select>

        <h5 style={headerStyle}>2. Choose your Channel</h5>
        {channelOption.map((channelItem, index) => (
          <StyledText
            onClick={() => {
              handleChannelClick(channelItem);
            }}
            key={index}
            style={{
              background:
                channelItem === channel
                  ? "linear-gradient(to right, rgb(247, 249, 251), rgb(255, 255, 255))"
                  : "transparent",
            }}
          >
            {channelItem}
          </StyledText>
        ))}
      </section>

      <section style={{ width: "70vw", padding: 20 }}>
        <ChatScreen />
      </section>
    </div>
  );
}

export default ChatApp;

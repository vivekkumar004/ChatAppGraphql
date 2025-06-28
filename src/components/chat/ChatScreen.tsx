import React, { useContext, useEffect, useState } from "react";
import { commonButtonStyle, headerStyle } from "../../styles/MainPageStyles";
import { AppContext } from "../../context/AppContextProvider";
import { toast } from "react-toastify";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_LATEST_MESSAGE, FETCH_OLDER_MESSAGE } from "../../GraphQL/Queries";
import { SEND_MESSAGE } from "../../GraphQL/Mutations";
import { channelOption } from "../../utils/data";
import Messages from "./Messages";
import { MessagesType, ProcessedMessageType } from "../../utils/types";

const IoIosSend = require("react-icons/io").IoIosSend;
const TiArrowDownThick = require("react-icons/ti").TiArrowDownThick;
const TiArrowUpThick = require("react-icons/ti").TiArrowUpThick;

function ChatScreen() {
  const { user, channel } = useContext(AppContext);

  const [message, setMessage] = useState<string>(() => {
    return localStorage.getItem("inputText") || "";
  });
  const [latestButtonClicked, setLatestButtonClicked] = useState(false);
  const [lastMessageId, setLastMessageId] = useState("");
  const [messagesArray, setMessagesArray] = useState<ProcessedMessageType[]>(
    []
  );

  const [getMessage, { error, data }] = useLazyQuery(GET_LATEST_MESSAGE);

  const getMessages = () => {
    const channelId = String(channelOption.indexOf(channel) + 1);
    getMessage({ variables: { channelId }, fetchPolicy: "network-only" });
  };

  useEffect(() => {
    if (data) {
      const processedData = data.fetchLatestMessages.map(
        (item: MessagesType) => {
          const date = new Date(item.datetime);

          const time = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

          return {
            messageId: item.messageId,
            text: item.text,
            datetime: time,
            userId: item.userId,
            statusSuccess: true,
          };
        }
      );
      setMessagesArray(processedData);
    }
    if (error) toast.error("Error occured when fetching messages");
  }, [data, error]);

  const [
    getOlderMessages,
    { error: olderMessageError, data: olderMessageData },
  ] = useLazyQuery(FETCH_OLDER_MESSAGE);

  useEffect(() => {
    if (olderMessageData) {
      const processedData = olderMessageData.fetchMoreMessages.map(
        (item: MessagesType) => {
          const date = new Date(item.datetime);

          const time = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

          return {
            messageId: item.messageId,
            text: item.text,
            datetime: time,
            userId: item.userId,
            statusSuccess: true,
          };
        }
      );
      setMessagesArray(processedData);
    }
    if (olderMessageError)
      toast.error("Error occured when fetching latest messages");
  }, [olderMessageData, olderMessageError]);

  const handleShowLatestMessage = () => {
    setLatestButtonClicked(true);
    const channelId = String(channelOption.indexOf(channel) + 1);
    const messageId = messagesArray[0]?.messageId || lastMessageId;
    setLastMessageId(messageId);
    console.log("from lates", messageId);

    getOlderMessages({
      variables: { channelId, messageId, old: false },
      fetchPolicy: "network-only",
    });
  };

  const handleShowPreviousMessage = () => {
    setLatestButtonClicked(false);
    const channelId = String(channelOption.indexOf(channel) + 1);
    const messageId =
      messagesArray[messagesArray.length - 1]?.messageId || lastMessageId;
    setLastMessageId(messageId);
    console.log("from previosu", messageId);

    getOlderMessages({
      variables: { channelId, messageId, old: true },
      fetchPolicy: "network-only",
    });
  };

  const handleMutationError = () => {
    const prevMessage = localStorage.getItem("inputText");
    localStorage.removeItem("inputText");
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const id = String(Math.random() * 100);
    setMessagesArray((prev) => [
      {
        statusSuccess: false,
        datetime: time,
        text: String(prevMessage),
        messageId: id,
        userId: user,
      },
      ...prev,
    ]);
  };

  const [postMessage, { error: mutationError, data: mutationData }] =
    useMutation(SEND_MESSAGE, {
      onError: (error) => {
        handleMutationError();
        toast.error(error.message || "failed to send Message please try again");
      },
    });

  useEffect(() => {
    if (mutationData) {
      getMessages();
      localStorage.removeItem("inputText");
    }
  }, [mutationData, mutationError]);

  useEffect(() => {
    getMessages();
  }, [channel, user]);

  const handleTextChange = (text: string) => {
    setMessage(text);
    localStorage.setItem("inputText", text);
  };

  const HandleSendMessage = () => {
    setMessage("");
    const channelId = String(channelOption.indexOf(channel) + 1);

    postMessage({
      variables: {
        channelId: channelId,
        text: message,
        userId: user,
      },
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <h5
        style={{
          ...headerStyle,
          borderBottom: "1px solid rgb(230, 236, 243)",
          paddingBlock: "3vh",
          paddingLeft: "1rem",
        }}
      >
        {channel}
      </h5>
      <div style={{ height: "67vh", position: "relative" }}>
        <button
          disabled={messagesArray.length < 1 && !latestButtonClicked}
          onClick={handleShowPreviousMessage}
          style={{
            ...commonButtonStyle,
            position: "absolute",
            top: 10,
            ...(messagesArray.length < 1 &&
              !latestButtonClicked && { opacity: 0.5 }),
          }}
        >
          Read More
          <TiArrowUpThick />
        </button>
        <button
          onClick={handleShowLatestMessage}
          disabled={messagesArray.length < 1 && latestButtonClicked}
          style={{
            ...commonButtonStyle,
            position: "absolute",
            bottom: 10,
            ...(messagesArray.length < 1 &&
              latestButtonClicked && { opacity: 0.5 }),
          }}
        >
          Read More <TiArrowDownThick />
        </button>

        <div style={{ height: "100%" }}>
          {messagesArray.length > 0 ? (
            <Messages
              showArrayReverseOrder={latestButtonClicked}
              data={messagesArray}
            />
          ) : (
            <p
              style={{
                fontSize: "1.2rem",
                position: "absolute",
                bottom: 70,
                left: "20%",
              }}
            >
              No previous messaage available.
            </p>
          )}
        </div>
      </div>
      <span>
        <textarea
          id={"messageInput"}
          value={message}
          onChange={(event) => {
            handleTextChange(event.target.value);
          }}
          placeholder="Type your message here..."
          style={{
            width: "97%",
            padding: 8,
            fontSize: "1rem",
            color: "#495057",
            borderRadius: 4,
            fontFamily: "inherit",
          }}
          maxLength={200}
          rows={3}
        />
        <button
          disabled={message.length < 1}
          onClick={HandleSendMessage}
          style={{
            ...commonButtonStyle,
            opacity: message.length < 1 ? 0.5 : 1,
          }}
        >
          Send Message{<IoIosSend color="white" size="20px" />}
        </button>
      </span>
    </div>
  );
}

export default ChatScreen;

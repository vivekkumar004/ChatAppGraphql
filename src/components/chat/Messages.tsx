import React, { useContext } from "react";
import * as Avatars from "../../assets/images/Images";
import { ProcessedMessageType } from "../../utils/types";
import { AppContext } from "../../context/AppContextProvider";

const GoTriangleLeft = require("react-icons/go").GoTriangleLeft;
const GoTriangleRight = require("react-icons/go").GoTriangleRight;
const FaCheckCircle = require("react-icons/fa").FaCheckCircle;
const FaExclamationCircle = require("react-icons/fa").FaExclamationCircle;

const centerCommonStyle = {
  height: "4vh",
  display: "flex",
  alignItems: "flex-end",
};

const statusText = {
  fontWeight: "400",
  fontSize: "0.7rem",
  color: "#999999",
  marginLeft: 5,
};

function Messages({ data }: { data: ProcessedMessageType[] }) {
  const { user, channel } = useContext(AppContext);

  return (
    <div
      style={{
        overflow: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {data.map((item: ProcessedMessageType) => {
        return (
          <div
            key={item.messageId}
            style={{
              ...(user === item.userId && { flexDirection: "row-reverse" }),
              display: "flex",
              alignItems: "self-start",
              marginBlock: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={Avatars[item.userId]} width="50rem" height="50rem" />
              <p
                style={{ fontSize: "0.7rem", color: "#999999", marginTop: -1 }}
              >
                {item.userId}
              </p>
            </div>

            {user === item.userId ? (
              <GoTriangleRight color="#fff" style={{ fontSize: "2rem" }} />
            ) : (
              <GoTriangleLeft color="#fff" style={{ fontSize: "2rem" }} />
            )}
            <p
              style={{
                ...(user === item.userId && { marginRight: -10 }),
                marginLeft: user === item.userId ? 10 : -11,
                maxWidth: "75%",
                backgroundColor: "#fff",
                borderRadius: 5,
                padding: 10,
                fontWeight: "200",
              }}
            >
              {item.text}
            </p>

            {user === item.userId && (
              <div style={{ ...centerCommonStyle, marginLeft: 5 }}>
                {item.statusSuccess ? (
                  <>
                    <FaCheckCircle style={{ color: "#9ec94a" }} />
                    <p style={statusText}>Sent</p>
                  </>
                ) : (
                  <>
                    <FaExclamationCircle style={{ color: "#b71e3c" }} />
                    <p style={statusText}>Error</p>
                  </>
                )}
              </div>
            )}

            <div style={centerCommonStyle}>
              <p
                style={{
                  color: "#212529",
                  fontSize: "0.8rem",
                  fontWeight: "400",
                  marginLeft: "0.8rem",
                }}
              >
                {item.datetime}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Messages;

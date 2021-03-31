import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Axios from "axios";

let socket;
const CONNECTION_PORT = "localhost:3001";

function Messages() {
  const room = useState("room");

  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  const [loggedIn, setLoggedIn] = useState(false);

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const username = localStorage.getItem("username");

  const sendMessage = async () => {
    let messageContent = {
      room: room,
      content: {
        author: username,
        message: message,
      },
    };

    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  const [friendsList, setUserList] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const friendsList = Axios.get("http://localhost:3001/friends")
      .then((response) => {
        console.log(response.data);
        setUserList(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  if (loggedIn === false)
    // eslint-disable-next-line array-callback-return
    return friendsList.map((val, key) => {
      if (val.username !== localStorage.getItem("username"))
        return (
          <>
            <div>
              <h1>{val.username}</h1>
              <button onClick={connectToRoom}>
                Chat
              </button>
            </div>
          </>
        );
    });
  else
    return (
      <>
        <div className="chatContainer">
          <div className="messages">
            {messageList.map((val, key) => {
              return (
                <div
                  className="messageContainer"
                  id={val.author === username ? "You" : "Other"}
                >
                  <div className="messageIndividual">
                    {val.author}: {val.message}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="messageInputs">
            <input
              type="text"
              placeholder="Message"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </>
    );
}

export default Messages;
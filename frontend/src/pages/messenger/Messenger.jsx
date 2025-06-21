import "./messenger.css";

import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";

import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const { user: currentUser } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    // Using relative path which will work with proxy setting
    socket.current = io("/");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current?.emit("addUser", currentUser._id);
    socket.current?.on("getUsers", (users) => {
      console.log("socket users: ", users);
      setOnlineUsers(
        currentUser.followings.filter((f) => users.some((u) => u.uid === f))
      );
    });
  }, [currentUser]);

  useEffect(() => {
    socket.current?.on("welcome", (message) => {
      console.log("welcome message: ", message);
    });
  }, [socket]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(`/conversation/${currentUser._id}`);
        setConversations(res.data);
        // console.log("conversations res: ", res);
        // console.log("conversations: ", conversations);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [currentUser._id]);

  // console.log("currentChat: ", currentChat);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/message/${currentChat?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  console.log("get message: ", messages);

  const submitMessage = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      senderId: currentUser._id,
      text: newMessage,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== currentUser._id
    );

    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`/message`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <React.Fragment>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search for friends"
              type="text"
              className="chatMenuInput"
            />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <React.Fragment>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        myside={m?.senderId === currentUser._id}
                        message={m}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="Write something here"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="chatMessageInput"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={submitMessage}>
                    Send
                  </button>
                </div>
              </React.Fragment>
            ) : (
              <span className="noConversationSelected">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUserId={currentUser._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

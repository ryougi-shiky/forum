import "./chatOnline.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ChatOnline({
  onlineUsers,
  currentUserId,
  setCurrentChat,
}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        `/users/friends/${currentUserId}`
      );
      setFriends(res.data);
    };
    if (currentUserId) {
      getFriends();
    }
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (onlineFriend) => {
    try {
      const res = await axios.get(`/conversation/find/${currentUserId}/${onlineFriend._id}`);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="chatOnline">
      {onlineFriends.map((onlineFriend) => (
        <div className="chatOnlineFriend" onClick={()=>{handleClick(onlineFriend)}}>
          <div className="chatOnlineImgContainer">
            <img
              src={
                onlineFriend?.profilePicture
                  ? onlineFriend?.profilePicture
                  : "/assets/icon/person/noAvatar.png"
              }
              alt=""
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{onlineFriend?.username}</span>
        </div>
      ))}
    </div>
  );
}

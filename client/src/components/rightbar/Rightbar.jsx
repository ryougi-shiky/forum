import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "./rightbar.css";

import CakeIcon from "@mui/icons-material/Cake";

import { Users } from "../../dummyData";
import OnlineFriends from "../onlineFriends/OnlineFriends";
import { AuthContext } from "../../context/AuthContext";

import { validateProfilePage } from "../../regex/validateUrl";

export default function Rightbar() {
  // console.log("window.location.href: ", window.location.href);
  // console.log("validateProfilePage: ", validateProfilePage.test(window.location.href));
  
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);
  // console.log("rightbar user: ", user);

  useEffect(() => {
    
    const getFriends = async () => {
      try {
        // console.log("user._id: ", user._id);
        const friendList = await axios.get(`${backend_url}/users/friends/${user._id}`);
        // console.log("friends: ", friendList.data);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    
  }, []);
  
  const HomeRightbar = () => {
    return (
      <React.Fragment>
        <div className="birthdayContainer">
          <CakeIcon className="birthdayImg" />
          <span className="birthdayText">
            <b>Tifa</b> and <b>another 5 firends</b> have a birthday today
          </span>
        </div>
        <img
          src="/assets/img/2018-04-16 144229.jpg"
          alt=""
          className="rightbarAd"
        />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <OnlineFriends key={u.id} user={u} />
          ))}
        </ul>
      </React.Fragment>
    )
  }

  const ProfileRightbar = () => {
    return (
      <React.Fragment>
        <h4 className="rightbarTitle">User Info</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <soan className="rightbarInfoKey">City: </soan>
            <soan className="rightbarInfoValue">{user.city}</soan>
          </div>
          <div className="rightbarInfoItem">
            <soan className="rightbarInfoKey">From: </soan>
            <soan className="rightbarInfoValue">{user.from}</soan>
          </div>
          <div className="rightbarInfoItem">
            <soan className="rightbarInfoKey">Relationship: </soan>
            <soan className="rightbarInfoValue">{user.relation}</soan>
          </div>
        </div>
        <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={`/profile/${friend.username}`}>
              <div className="rightbarFollowing">
                <img 
                  src= {friend.profilePicture ? friend.profilePicture : "/assets/icon/person/noAvatar.png"} 
                  alt="" 
                  className="rightbarFollowingImg" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </React.Fragment>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {validateProfilePage.test(window.location.href) ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

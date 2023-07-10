import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "./rightbar.css";

import CakeIcon from "@mui/icons-material/Cake";
import { Add, Remove } from "@mui/icons-material";

import { Users } from "../../dummyData";
import OnlineFriends from "../onlineFriends/OnlineFriends";
import { AuthContext } from "../../context/AuthContext";

import { validateProfilePage } from "../../regex/validateUrl";

import Weather from "../weather/Weather";

const backend_url = process.env.REACT_APP_BACKEND_URL;

export default function Rightbar({user}) {
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(false);
  const { user:currentUser, dispatch } = useContext(AuthContext);


  // useEffect(() => {
  //   // if no user, it will be an error
  //   setFollowed(currentUser.followings.includes(user?.id));
  // }, [currentUser, user.id])
  
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`${backend_url}/users/friends/${currentUser._id}`);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser._id]);

  const handleClick = async () => {
    try {
      if (followed){
        await axios.put(`${backend_url}/users/${user._id}/unfollow`, {id: currentUser._id});
        // dispatch({type: 'UNFOLLOW', payload:user._id});
      } else {
        await axios.put(`${backend_url}/users/${user._id}/follow`, {id: currentUser._id});
        // dispatch({type: 'FOLLOW', payload:user._id});
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  }

  const HomeRightbar = () => {
    return (
      <React.Fragment>
        <Weather />
        
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
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Info</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">{user.relation}</span>
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

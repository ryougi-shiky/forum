import React from 'react'
import './onlineFriends.css';

export default function OnlineFriends({user}) {
  return (
    <li className="rightbarFriend">
      <div className="rightbarImgContainer">
        <img src={user.profilePicture} alt="" className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  )
}

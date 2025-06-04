import React from 'react';
import "./leftFriends.css";

export default function LeftFriends({user}) {
  return (
    <li className="sidebarFriend">
      <img className='sidebarFriendImg' src={user.profilePicture} alt='' />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}

import React from "react";
import "./rightbar.css";

import CakeIcon from "@mui/icons-material/Cake";

import { Users } from "../../dummyData";
import OnlineFriends from "../onlineFriends/OnlineFriends";

export default function Rightbar({profile}) {
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
            <soan className="rightbarInfoValue">Tokyo</soan>
          </div>
          <div className="rightbarInfoItem">
            <soan className="rightbarInfoKey">From: </soan>
            <soan className="rightbarInfoValue">Kyoto</soan>
          </div>
          <div className="rightbarInfoItem">
            <soan className="rightbarInfoKey">Relationship: </soan>
            <soan className="rightbarInfoValue">Single</soan>
          </div>
        </div>
        <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src="/assets/icon/person/1.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Tifa Lockhart</span>
          </div>
          <div className="rightbarFollowing">
            <img src="/assets/icon/person/2.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">www</span>
          </div>
          <div className="rightbarFollowing">
            <img src="/assets/icon/person/3.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">hash</span>
          </div>
        </div>
      </React.Fragment>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

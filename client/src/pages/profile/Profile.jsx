import React from 'react'
import "./profile.css";

import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Profile() {
  return (
    <React.Fragment>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src="/assets/icon/post/3.jpeg" alt="" className="profileCoverImg" />
              <img src="/assets/icon/person/7.jpeg" alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Ryougi Shiki</h4>
              <h4 className="profileInfoDesc">kill</h4>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile/>
          </div>
        </div>
        
      </div>
    </React.Fragment>
  )
}

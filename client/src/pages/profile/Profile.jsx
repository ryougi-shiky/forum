import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./profile.css";

import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";

import axios from "axios";

export default function Profile() {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const [user, setUser] = useState({});
  const params = useParams();
  console.log("params: ", params);

  useEffect(()=>{
    const fetchUser = async () => {
      const res = await axios.get(`${backend_url}/users?username=${params.username}`);
      console.log(res);
      setUser(res.data);
    };
    fetchUser();
  },[params.username]);

  var coverImg = "/assets/icon/person/noCover.png";
  var profilePicture = "/assets/icon/person/noAvatar.png";
  
  return (
    <React.Fragment>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={user.coverImg ? user.coverImg : coverImg} alt="" className="profileCoverImg" />
              <img src={user.profilePicture ? user.profilePicture : profilePicture} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <h4 className="profileInfoDesc">{user.desc}</h4>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={params.username}/>
            <Rightbar user={user}/>
          </div>
        </div>
        
      </div>
    </React.Fragment>
  )
}

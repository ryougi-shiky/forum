import React, { useContext } from "react";

import "./home.css";

import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const { user:currentUser } = useContext(AuthContext);

  return (
    <React.Fragment>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed username={currentUser.username}/>
        <Rightbar />
      </div>
    </React.Fragment>
  );
}

import "./moments.css";

import Topbar from '../../components/topbar/Topbar';
import Sidebar from "../../components/sidebar/Sidebar";
import FeedMoments from "../../components/feedMoments/FeedMoments";
import Rightbar from "../../components/rightbar/Rightbar";

import React, { useContext, useEffect, useRef, useReducer } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Moments() {
  const { user:currentUser } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Topbar />
      <div className="momentsContainer">
        <Sidebar />
        <FeedMoments username={currentUser.username} />
        <Rightbar />
      </div>

    </React.Fragment>
  )
}

import React, { useContext, useEffect, useRef, useReducer } from "react";

import "./home.css";

import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";

import { loginCall } from '../../apiCall';
import { AuthContext } from "../../context/AuthContext";
import AuthReducer from '../../context/AuthReducer';
import { useCookies } from 'react-cookie';

export default function Home() {
  // const { user:currentUser, isFetching, error, dispatch } = useContext(AuthContext);
  const { user:currentUser } = useContext(AuthContext);
  // const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  console.log("currentUser: ", currentUser);

  // useEffect(() => {
  //   if (cookies && currentUser){
  //     loginCall({email: currentUser.email, password: currentUser.password}, dispatch);
  //   }
  // }, []);

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

import React from 'react';
import Topbar from "./Topbar";
import Rightbar from './Rightbar';
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import "./css/home.css";

export default function Home() {
  return (
    <React.Fragment>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
      <h1>Welcome to Ani Ani ^_^</h1>
    </React.Fragment>
  )
}
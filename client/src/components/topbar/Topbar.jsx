import React, { useContext } from 'react'
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link, Navigate, redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const backend_url = process.env.REACT_APP_BACKEND_URL;

export default function Topbar() {
  const { user:currentUser } = useContext(AuthContext);

  const chatButton = () => {
    redirect('/messenger');
  }

  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration:"none" }}>
          <span className="logo">Ani Ani</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className="searchIcon"/>
          <input type="text" className="searchInput" placeholder='Search People or Posts'/>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Home</span>
          <span className="topbarLink">Moments</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person/>
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to={'/messenger'}>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">3</span>
            </div>
          </Link>
          <div className="topbarIconItem">
            <Notifications/>
            <span className="topbarIconBadge">2</span>
          </div>
        </div>
        <Link to={`/profile/${currentUser.username}`}>
          <img src={ /*user.profilePicture ? user.profilePicture :*/ '/assets/icon/person/noAvatar.png'} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  )
}

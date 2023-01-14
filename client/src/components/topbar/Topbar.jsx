import React, { useContext } from 'react';
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link, useNavigate, redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// import Dropdown from 'react-dropdown';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import SplitButton from 'react-bootstrap/SplitButton';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import { MenuItem } from '@mui/material';

import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

import "./topbar.css";

import { AuthContext } from '../../context/AuthContext';
import { Button } from '@mui/material';

const backend_url = process.env.REACT_APP_BACKEND_URL;

const menuOptions = [
  'Account', 'Log out'
];

const defaultOption = menuOptions[0];

const onSelect = ({ key }) => {
  console.log(`${key} selected`);
}

const onVisibleChange = (visible) => {
  console.log(visible);
}



export default function Topbar() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const { user:currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // const chatButton = () => {
  //   redirect('/messenger');
  // }

  console.log("topbar cookie: ", cookies);

  const logout = () => {
    removeCookie("user", {path: '/'}); 
    console.log("topbar removed cookie");
    // setCookie(null);
    navigate('/login');
    console.log("topbar redirect to login page");
  }

  const menu = (
    <Menu onSelect={onSelect}>
      <Button className='topbarMenuButton'>
        <MenuItem key="1" >Account</MenuItem>
      </Button>

      <Divider />

      <Button className='topbarMenuButton' onClick={logout} >
        <MenuItem key="2" >Log Out</MenuItem>
      </Button>
    </Menu>
  );

  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration:"none" }}>
          <span className="logo">Ani Ani</span>
        </Link>
        {/* <Dropdown ClassName="topbarMenu" options={menuOptions} placeholder="Menu"  /> */}
        <Dropdown
          trigger={['hover']}
          overlay={menu}
          animation="slide-up"
          onVisibleChange={onVisibleChange}
          className="topbarMenu"
        >
          <button style={{ width: 50 }}>Menu</button>
        </Dropdown>
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
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">3</span>
          </div>
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

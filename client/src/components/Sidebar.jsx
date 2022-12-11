import React from 'react'
import './css/sidebar.css';
import { RssFeed } from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className='sidebarIcon'/>
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon className='sidebarIcon'/>
            <span className="sidebarListItemText">Chat</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleIcon className='sidebarIcon'/>
            <span className="sidebarListItemText">Video</span>
          </li>
          <li className="sidebarListItem">
            <GroupIcon className='sidebarIcon'/>
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkIcon className='sidebarIcon'/>
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutlineIcon className='sidebarIcon'/>
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutlineIcon className='sidebarIcon'/>
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon className='sidebarIcon'/>
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <SchoolIcon className='sidebarIcon'/>
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className='sidebarHr' />
        <ul className="sidebarFriendList">
          <li className="sidebarFriend">
            <img className='sidebarFriendImg' src='/assets/img/2018-04-16 144202.jpg' alt='' />
            <span className="sidebarFriendName">Tifa</span>
          </li>
          <li className="sidebarFriend">
            <img className='sidebarFriendImg' src='/assets/img/2018-04-16 144202.jpg' alt='' />
            <span className="sidebarFriendName">Tifa</span>
          </li>
          <li className="sidebarFriend">
            <img className='sidebarFriendImg' src='/assets/img/2018-04-16 144202.jpg' alt='' />
            <span className="sidebarFriendName">Tifa</span>
          </li>
          <li className="sidebarFriend">
            <img className='sidebarFriendImg' src='/assets/img/2018-04-16 144202.jpg' alt='' />
            <span className="sidebarFriendName">Tifa</span>
          </li>
          <li className="sidebarFriend">
            <img className='sidebarFriendImg' src='/assets/img/2018-04-16 144202.jpg' alt='' />
            <span className="sidebarFriendName">Tifa</span>
          </li>
          <li className="sidebarFriend">
            <img className='sidebarFriendImg' src='/assets/img/2018-04-16 144202.jpg' alt='' />
            <span className="sidebarFriendName">Tifa</span>
          </li>
          <li className="sidebarFriend">
            <img className='sidebarFriendImg' src='/assets/img/2018-04-16 144202.jpg' alt='' />
            <span className="sidebarFriendName">Tifa</span>
          </li>
          <li className="sidebarFriend">
            <img className='sidebarFriendImg' src='/assets/img/2018-04-16 144202.jpg' alt='' />
            <span className="sidebarFriendName">Tifa</span>
          </li>
          <li className="sidebarFriend">
            <img className='sidebarFriendImg' src='/assets/img/2018-04-16 144202.jpg' alt='' />
            <span className="sidebarFriendName">Tifa</span>
          </li>
          <li className="sidebarFriend">
            <img className='sidebarFriendImg' src='/assets/img/2018-04-16 144202.jpg' alt='' />
            <span className="sidebarFriendName">Tifa</span>
          </li>
          <li className="sidebarFriend">
            <img className='sidebarFriendImg' src='/assets/img/2018-04-16 144202.jpg' alt='' />
            <span className="sidebarFriendName">Tifa</span>
          </li>
          <li className="sidebarFriend">
            <img className='sidebarFriendImg' src='/assets/img/2018-04-16 144202.jpg' alt='' />
            <span className="sidebarFriendName">Tifa</span>
          </li>
          <li className="sidebarFriend">
            <img className='sidebarFriendImg' src='/assets/img/2018-04-16 144202.jpg' alt='' />
            <span className="sidebarFriendName">Tifa</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

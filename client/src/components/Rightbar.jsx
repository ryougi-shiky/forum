import React from 'react'
import './css/rightbar.css';

import CakeIcon from '@mui/icons-material/Cake';

export default function Rightbar() {
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <CakeIcon className='birthdayImg'/>
          <span className="birthdayText">
            <b>Tifa</b> and <b>another 5 firends</b> have a birthday today
          </span>
        </div>
        <img src="/assets/img/2018-04-16 144229.jpg" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          <li className="rightbarFriend">
            <div className="rightbarImgContainer">
              <img src="/assets/img/2018-04-16 144202.jpg" alt="" className="rightbarProfileImg" />
              <span className="rightbarOnline">tifa</span>
            </div>
            <span className="rightbarUsername">Tifa</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarImgContainer">
              <img src="/assets/img/2018-04-16 144202.jpg" alt="" className="rightbarProfileImg" />
              <span className="rightbarOnline">tifa</span>
            </div>
            <span className="rightbarUsername">Tifa</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarImgContainer">
              <img src="/assets/img/2018-04-16 144202.jpg" alt="" className="rightbarProfileImg" />
              <span className="rightbarOnline">tifa</span>
            </div>
            <span className="rightbarUsername">Tifa</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarImgContainer">
              <img src="/assets/img/2018-04-16 144202.jpg" alt="" className="rightbarProfileImg" />
              <span className="rightbarOnline">tifa</span>
            </div>
            <span className="rightbarUsername">Tifa</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

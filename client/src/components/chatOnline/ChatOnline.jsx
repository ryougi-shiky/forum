import './chatOnline.css';

import React from 'react'

export default function ChatOnline() {
  return (
    <div className='chatOnline'>
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img src="/assets/img/2018-03-27 141504.jpg" alt="" className="chatOnlineImg" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Tifa</span>
      </div>
    </div>
  )
}

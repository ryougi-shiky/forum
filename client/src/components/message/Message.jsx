import './message.css'

import React from 'react'

export default function Message({myside}) {
  return (
    <div className={myside ? "message myside" : "message"}>
      <div className="messageTop">
        <img src="/assets/img/2018-03-27 141504.jpg" alt="" className="messageImg" />
        <p className="messageText">This is a message</p>
      </div>
      <div className="messageTop">
        <img src="/assets/img/2018-03-27 141504.jpg" alt="" className="messageImg" />
        <p className="messageText">This is a long long long long long long long long long long long long long long long 
        long long long long long long long long long long long long long long long long long long long long long message</p>
      </div>
      <div className="messageBottom">
        1 hour ago
      </div>
    </div>
  )
}

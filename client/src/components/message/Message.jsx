import './message.css'

import React from 'react'

export default function Message({myside, message}) {
  const messageTime = new Date(message.createdAt);
  // const messageTime = { $dateToString: { format: "%Y-%m-%d-%H:%M:%S", date: `${message.createdAt}` } };
  return (
    <div className={myside ? "message myside" : "message"}>
      <div className="messageTop">
        <img src="/assets/img/2018-03-27 141504.jpg" alt="" className="messageImg" />
        <p className="messageText">{message?.text}</p>
      </div>
      <div className="messageBottom">
        {messageTime}
      </div>
    </div>
  )
}

import './message.css'

import React from 'react'
import {format} from 'timeago.js'

export default function Message({myside, message}) {
  return (
    <div className={myside ? "message myside" : "message"}>
      <div className="messageTop">
        <img src="/assets/img/2018-03-27 141504.jpg" alt="" className="messageImg" />
        <p className="messageText">{message?.text}</p>
      </div>
      <div className="messageBottom">
        {format(message?.createdAt)}
      </div>
    </div>
  )
}

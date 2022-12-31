import React, { useContext } from 'react';

import "./messenger.css";
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';


export default function Messenger() {
  const { user } = useContext(AuthContext);
  console.log("messenger user: ", user);
  return (
    <React.Fragment>
      {/* <Topbar /> */}
      <div className='messenger'>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder='Search for friends' type="text" className="chatMenuInput" />
            <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message myside={true} />
              <Message />
              <Message />
              <Message myside={true} />
              <Message />
              <Message />
              <Message myside={true} />
              <Message />
              <Message />
              <Message myside={true} />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea name="" id="" cols="30" rows="10" className="chatMessageInput"></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

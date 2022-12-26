import React, { useContext, useRef } from 'react'
import "./share.css";

import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';

export default function Share() {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const {user} = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img className='shareProfileImg' src={user.profilePicture ? user.profilePicture : '/assets/icon/person/noAvatar.png'} alt='' />
          <input placeholder="What's in your mind?" type="text" className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <label htmlFor='file' className="shareOption">
              <PermMedia htmlColor='tomato' className='shareIcon' />
              <span className="shareOptionText">Photo or Video</span>
              <input 
                style={{display: 'none'}} 
                type="file" 
                id="file" 
                accept='.png,.jpeg,.jpg' 
                onChange={(e) => setFile(e.target.files[0])} />
            </label>
            <div className="shareOption">
              <Label htmlColor='blue' className='shareIcon' />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor='green' className='shareIcon' />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
              <span className="shareOptionText">Feeling</span>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </div>
        
      </div>
    </div>
  )
}

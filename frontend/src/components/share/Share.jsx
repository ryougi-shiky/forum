import React, { useContext, useRef } from 'react'
import "./share.css";

import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';

import { decodeImg } from "../../decodeImg";


export default function Share({ onPostCreate }) {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const {user} = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!user || !user._id || !user.username || !desc.current) {
      setError("User information is missing");
      return;
    }
    
    if (!desc.current.value.trim()) {
      setError("Post cannot be empty");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const newPost = {
      uid: user._id,
      username: user.username,
      desc: desc.current.value
    }
    
    try {
      await axios.post(`${backend_url}/users/post/create`, newPost);
      if (onPostCreate) {
        onPostCreate(); // notify the parent component to refresh posts
      }
      desc.current.value = ""; // Clear the input field after successful post
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return null; // Don't render the share component if user is not available
  }

  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img 
            className='shareProfileImg' 
            src={user.profilePicture && user.profilePicture.data 
              ? `data:image/jpeg;base64,${decodeImg(user.profilePicture.data)}` 
              : '/assets/icon/person/noAvatar.png'} 
            alt='' 
          />
          <input 
            placeholder="Share something here" 
            type="text" 
            className="shareInput" 
            ref={desc} 
          />
        </div>
        <hr className="shareHr" />
        {error && <div className="shareError">{error}</div>}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor='file' className="shareOption">
              <PermMedia htmlColor='tomato' className='shareIcon' />
              <span className="shareOptionText">Photo or Video</span>
              <input 
                style={{display: 'none'}} 
                type="file" 
                id="file" 
                accept='.png,.jpeg,.jpg' 
                onChange={(e) => setFile(e.target.files?.[0])} 
              />
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
          <button 
            className="shareButton" 
            type='submit'
            disabled={loading}
          >
            {loading ? 'Sharing...' : 'Share'}
          </button>
        </form>
      </div>
    </div>
  )
}

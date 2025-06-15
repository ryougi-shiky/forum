import React, { useRef, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import "./profile.css";

import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import { decodeImg } from "../../decodeImg";

const backend_url = process.env.REACT_APP_BACKEND_URL;

export default function Profile() {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const fileInput = useRef(); // reference to the file input element
  const [snackbarOpenOversize, setSnackbarOpenOversize] = useState(false); // Notification window
  const [snackbarOpenUploading, setSnackbarOpenUploading] = useState(false); // Notification window

  useEffect(() => {
    const fetchUser = async () => {
      if (!params.username) {
        setError("Username not provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`${backend_url}/users?username=${params.username}`);
        if (res.data) {
          setUser(res.data);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [params.username]);

  const coverImg = "/assets/icon/person/noCover.png";
  const defaultProfilePicture = "/assets/icon/person/noAvatar.png";

  const handleProfilePictureClick = () => {
    if (user && currentUser && user._id === currentUser._id) {
      fileInput.current?.click(); // simulate a click on the file input element
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (user && currentUser && user._id && currentUser._id && file.size <= 256000) { // Ensure file is less than 256KB
      try {
        const formData = new FormData();
        formData.append('profilePicture', file);
        formData.append('userId', user._id);

        setSnackbarOpenUploading(true); // Notify user that image is uploading.

        const response = await axios.put(`${backend_url}/users/${currentUser._id}/profilePicture`, formData);
        
        if (response.status === 200) {
          try {
            const updatedUserResponse = await axios.get(`${backend_url}/users?username=${currentUser.username}`);
            if (updatedUserResponse.status === 200 && updatedUserResponse.data) {
              // dispatch the action to update the user in your context
              dispatch({ type: 'UPDATE_USER', payload: updatedUserResponse.data });
              // Update the local user state as well
              if (user.username === currentUser.username) {
                setUser(updatedUserResponse.data);
              }
            }
          } catch (err) {
            console.error("Error updating user after profile picture change:", err);
          }
        }
      } catch (err) {
        console.error("Error uploading profile picture:", err);
      } finally {
        setSnackbarOpenUploading(false);
      }
    } else {
      setSnackbarOpenOversize(true); // Notify user that image is too large
    }
  };
  
  if (loading) {
    return (
      <React.Fragment>
        <Topbar />
        <div className="profile">
          <Sidebar />
          <div className="profileRight">
            <div className="profileLoading">Loading user profile...</div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  if (error) {
    return (
      <React.Fragment>
        <Topbar />
        <div className="profile">
          <Sidebar />
          <div className="profileRight">
            <div className="profileError">{error}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img 
                src={user && user.coverImg ? user.coverImg : coverImg} 
                alt="" 
                className="profileCoverImg" 
              />
              <img
                src={user && user.profilePicture && user.profilePicture.data 
                  ? `data:image/jpeg;base64,${decodeImg(user.profilePicture.data)}` 
                  : defaultProfilePicture}
                alt=""
                className="profileUserImg"
                onClick={handleProfilePictureClick}
              />
              <input
                ref={fileInput}
                type="file"
                hidden
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user ? user.username : ''}</h4>
              <h4 className="profileInfoDesc">{user ? user.desc : ''}</h4>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={params.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpenOversize}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpenOversize(false)}
      >
        <Alert onClose={() => setSnackbarOpenOversize(false)} severity="warning" sx={{ width: '100%' }}>
          Your image is too large to upload! Please select an image smaller than 256KB.
        </Alert>
      </Snackbar>

      <Snackbar
        open={snackbarOpenUploading}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpenOversize(false)}
      >
        <Alert onClose={() => setSnackbarOpenUploading(false)} severity="warning" sx={{ width: '100%' }}>
          Your image is uploading.
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}

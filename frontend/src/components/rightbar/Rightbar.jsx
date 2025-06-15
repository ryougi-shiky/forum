import React, {useState, useEffect, useContext, useRef} from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import "./rightbar.css";

import CakeIcon from "@mui/icons-material/Cake";
import {Add, Remove} from "@mui/icons-material";

import {Users} from "../../dummyData";
import OnlineFriends from "../onlineFriends/OnlineFriends";
import {AuthContext} from "../../context/AuthContext";

import {validateProfilePage} from "../../regex/validateUrl";
import {decodeImg} from "../../decodeImg";

import Weather from "../weather/Weather";

const backend_url = process.env.REACT_APP_BACKEND_URL;

export default function Rightbar({user}) {
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const {user: currentUser, dispatch} = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const inputAge = useRef();
  const inputFrom = useRef();

  // Check if the current user is following the profile user
  useEffect(() => {
    if (currentUser && currentUser.followings && user && user._id) {
      setFollowed(currentUser.followings.includes(user._id));
    } else {
      setFollowed(false);
    }
  }, [currentUser, user]);

  // Fetch friends of the profile user
  useEffect(() => {
    const getFriends = async () => {
      if (!user || !user._id) {
        setFriends([]);
        return;
      }

      try {
        setLoading(true);
        const friendList = await axios.get(`${backend_url}/users/friends/${user._id}`);
        if (friendList.data && Array.isArray(friendList.data)) {
          setFriends(friendList.data);
        } else {
          setFriends([]);
        }
      } catch (err) {
        console.error("Error fetching friends:", err);
        setFriends([]);
      } finally {
        setLoading(false);
      }
    };
    
    getFriends();
  }, [user]);

  const handleFollow = async () => {
    if (!user || !user._id || !currentUser || !currentUser._id) {
      return;
    }

    try {
      setLoading(true);
      if (followed) {
        await axios.put(`${backend_url}/users/${user._id}/unfollow`, {id: currentUser._id});
        dispatch({type: 'UNFOLLOW', payload: user._id});
      } else {
        await axios.put(`${backend_url}/users/${user._id}/follow`, {id: currentUser._id});
        dispatch({type: 'FOLLOW', payload: user._id});

        // Create a new notification to the user who is being followed
        await axios.post(`${backend_url}/users/notify/create/follow`, {
          senderId: currentUser._id,
          receiverId: user._id
        });
      }
      setFollowed(!followed);
    } catch (err) {
      console.error("Error following/unfollowing user:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = () => {
    setIsEditing(!isEditing);
  }

  const handleCancel = () => {
    setIsEditing(false);
  }

  const handleSave = async (event) => {
    event.preventDefault();
    
    if (!currentUser || !currentUser._id || !inputAge.current || !inputFrom.current) {
      return;
    }

    const newAge = inputAge.current.value;
    const newFrom = inputFrom.current.value;

    try {
      setLoading(true);
      const res = await axios.put(`${backend_url}/users/update/userinfo/${currentUser._id}`,
        {age: newAge, from: newFrom});
      
      if (res.status === 200) {
        // Update the current user in context
        const updatedUser = {...currentUser, age: newAge, from: newFrom};
        dispatch({type: 'UPDATE_USER', payload: updatedUser});
        
        // Update the profile user if it's the current user's profile
        if (user && user._id === currentUser._id) {
          user.age = newAge;
          user.from = newFrom;
        }
        
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error updating user info:", err);
    } finally {
      setLoading(false);
    }
  }

  const HomeRightbar = () => {
    return (
      <React.Fragment>
        <Weather/>
        {/* <div className="birthdayContainer">
          <CakeIcon className="birthdayImg" />
          <span className="birthdayText">
            <b>Tifa</b> and <b>another 5 firends</b> have a birthday today
          </span>
        </div>
        <img src="/assets/img/2018-04-16 144229.jpg" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <OnlineFriends key={u.id} user={u} />
          ))}
        </ul> */}
      </React.Fragment>
    )
  }

  const ProfileRightbar = () => {
    if (!user || !currentUser) {
      return <div className="rightbarNoUser">User information not available</div>;
    }

    return (
      <React.Fragment>
        {user.username !== currentUser.username && (
          <button 
            className="rightbarFollowButton" 
            onClick={handleFollow}
            disabled={loading}
          >
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove/> : <Add/>}
          </button>
        )}
        <h4 className="rightbarTitle">User Info
          {user.username === currentUser.username &&
            (<div className="rightbarUserinfoEditButtons">
              {!isEditing && <button className="rightbarEditButton" onClick={handleEdit}>Edit</button>}
              {isEditing && <button className="rightbarEditButton" onClick={handleSave} disabled={loading}>Save</button>}
              {isEditing && <button className="rightbarEditButton" onClick={handleCancel} disabled={loading}>Cancel</button>}
            </div>)}
        </h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Age: </span>
            {
              isEditing
                ? <input 
                    className="rightbarInfoValue" 
                    type="number" 
                    ref={inputAge} 
                    placeholder="Edit your age"
                    defaultValue={user.age || ''}
                  />
                : <span className="rightbarInfoValue">{user.age || 'Not specified'}</span>
            }
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            {
              isEditing
                ? <input 
                    className="rightbarInfoValue" 
                    type="text" 
                    ref={inputFrom} 
                    placeholder="Edit your location"
                    defaultValue={user.from || ''}
                  />
                : <span className="rightbarInfoValue">{user.from || 'Not specified'}</span>
            }
          </div>
        </div>
        {/* <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={`/profile/${friend.username}`}>
              <div className="rightbarFollowing">
                <img 
                  src= {friend.profilePicture ? `data:image/jpeg;base64,${decodeImg(friend.profilePicture.data)}` : "/assets/icon/person/noAvatar.png"} 
                  alt="" 
                  className="rightbarFollowingImg" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div> */}
      </React.Fragment>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {loading ? (
          <div className="rightbarLoading">Loading...</div>
        ) : validateProfilePage.test(window.location.href) ? (
          <ProfileRightbar/>
        ) : (
          <HomeRightbar/>
        )}
      </div>
    </div>
  );
}

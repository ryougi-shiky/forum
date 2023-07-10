import React, { useState, useEffect, useContext } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Bar } from 'recharts';
import { Link } from 'react-router-dom';
import axios from "axios";
import "./rightbar.css";

import CakeIcon from "@mui/icons-material/Cake";
import { Add, Remove } from "@mui/icons-material";

import { Users } from "../../dummyData";
import OnlineFriends from "../onlineFriends/OnlineFriends";
import { AuthContext } from "../../context/AuthContext";

import { validateProfilePage } from "../../regex/validateUrl";

const backend_url = process.env.REACT_APP_BACKEND_URL;

export default function Rightbar({user}) {
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(false);
  const { user:currentUser, dispatch } = useContext(AuthContext);
  const [weather, setWeather] = useState();


  // useEffect(() => {
  //   // if no user, it will be an error
  //   setFollowed(currentUser.followings.includes(user?.id));
  // }, [currentUser, user.id])
  
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`${backend_url}/users/friends/${currentUser._id}`);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser._id]);

  const handleClick = async () => {
    try {
      if (followed){
        await axios.put(`${backend_url}/users/${user._id}/unfollow`, {id: currentUser._id});
        // dispatch({type: 'UNFOLLOW', payload:user._id});
      } else {
        await axios.put(`${backend_url}/users/${user._id}/follow`, {id: currentUser._id});
        // dispatch({type: 'FOLLOW', payload:user._id});
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  }

  // Retrieve weather information
  const getWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("latitude: ", latitude, "  longitude: ", longitude);
        const options = {
          method: 'GET',
          url: `https://open-weather13.p.rapidapi.com/city/fivedaysforcast/${latitude}/${longitude}`,
          headers: {
            'X-RapidAPI-Key': '9c4b3c4369msh7ff621c01df1d07p1172edjsn74e33213befb',
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
          }
        };
    
        try {
          const response = await axios.request(options);
          setWeather(response.data);
          console.log("weather: ", weather)
        } catch (error) {
          console.error(error);
        }
      }, (error) => {
        console.error("Error obtaining location: ", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  
  useEffect(() => {
    getWeather();
  }, []);
  
  
  
  const HomeRightbar = () => {
    // Prepare the data for the composed chart
    const chartData = weather?.list.map(item => ({
      date: item.dt_txt,
      temp: item.main.temp - 273.15, // convert from Kelvin to Celsius
      windSpeed: item.wind.speed,
      humidity: item.main.humidity,
    }));

    return (
      <React.Fragment>
        <ComposedChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="windSpeed" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="temp" stroke="#ff7300" />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
        </ComposedChart>

        {weather ? (
        <div>
          <h2>City: </h2>
          <h3>{weather.city.name}, {weather.city.country}</h3>
          {weather.list.map((item, index) => (
            <div key={index}>
              <h3>Date: {item.dt_txt}</h3>
              <p>Temperature: {item.main.temp}°C</p>
              <p>Weather: {item.weather[0].main}</p>
              <p>Description: {item.weather[0].description}</p>
              <p>Wind Speed: {item.wind.speed} m/s</p>
              <p>Humidity: {item.main.humidity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
        <div className="birthdayContainer">
          
          <CakeIcon className="birthdayImg" />
          <span className="birthdayText">
            <b>Tifa</b> and <b>another 5 firends</b> have a birthday today
          </span>
        </div>
        <img
          src="/assets/img/2018-04-16 144229.jpg"
          alt=""
          className="rightbarAd"
        />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <OnlineFriends key={u.id} user={u} />
          ))}
        </ul>
      </React.Fragment>
    )
  }

  const ProfileRightbar = () => {
    return (
      <React.Fragment>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Info</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">{user.relation}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={`/profile/${friend.username}`}>
              <div className="rightbarFollowing">
                <img 
                  src= {friend.profilePicture ? friend.profilePicture : "/assets/icon/person/noAvatar.png"} 
                  alt="" 
                  className="rightbarFollowingImg" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </React.Fragment>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {validateProfilePage.test(window.location.href) ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

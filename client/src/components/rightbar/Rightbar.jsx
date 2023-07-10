import React, { useState, useEffect, useContext } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ComposedChart, Bar, ResponsiveContainer, Label, BarChart,
  LabelList } from 'recharts';
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
const weather_api_key = process.env.REACT_APP_OPEN_WEATHER_RAPID_API_KEY;

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
  // See endpoint in https://rapidapi.com/worldapi/api/open-weather13/
  // Code	Description
  // 200	Success: Alls is fine
  // 400	Bad Request: Please check the query parameters
  // 401	Unauthorized: Make sure to send a valid RapidAPI key
  // 403	Forbidden: You're not allowed to access this endpoint
  // 404	Not Found: This endpoint doesn't exist
  // 429	Too Many Requests: You've exceeded the quota
  // 503	Service Temporarily Unavailable: The API is currently down
  const getWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("latitude: ", latitude, "  longitude: ", longitude);
        const options = {
          method: 'GET',
          url: `https://open-weather13.p.rapidapi.com/city/sevendaysforcast/${latitude}/${longitude}`,
          headers: {
            'X-RapidAPI-Key': `${weather_api_key}`,
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

  // Custom Tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', borderRadius: '5px' }}>
          <p className="label">{`Date: ${label}`}</p>
          <p className="temp">{`Temperature: ${payload[0].value}°C`}</p>
          <p className="desc">{`Weather: ${payload[0].payload.desc}`}</p>
          <p className="humid">{`Humidity: ${payload[0].payload.humidity}%`}</p>
        </div>
      );
    }

    return null;
  };

  // Get the current date time and the date time 24 hours later
  const now = new Date();
  const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const HomeRightbar = () => {
    // Prepare the data for the composed chart
    const chartData7Days = weather?.list
      .reduce((acc, item) => {
        const date = item.dt_txt.substring(0, 10);  // take only date part
        const temp_min = Math.round(item.main.temp_min - 273.15); // min temperature
        const temp_max = Math.round(item.main.temp_max - 273.15); // max temperature

        // if this date doesn't exist in acc yet, add it with current item's data
        if (!acc[date]) {
          acc[date] = { date, temp_min, temp_max };
        } else {
          // if this date exists in acc, compare and update min and max temps
          if (temp_min < acc[date].temp_min) {
            acc[date].temp_min = temp_min;
          }
          if (temp_max > acc[date].temp_max) {
            acc[date].temp_max = temp_max;
          }
        }

        return acc;
      }, {});  // initial value is an empty object

    // Convert the accumulated object to array
    const chartDataArray = Object.values(chartData7Days || {});

    const chartData24Hours = weather?.list
      .filter(item => {
        let itemDate = new Date(item.dt_txt);
        return itemDate >= now && itemDate <= next24Hours;
      }).map(item => ({
        time: item.dt_txt.substring(11, 16),  // take only time part
        temp: parseFloat((item.main.temp - 273.15).toFixed(2)),// convert from Kelvin to Celsius
        desc: item.weather[0].description,
      }));


    const chartData = weather?.list
      .filter(item => {
        let itemDate = new Date(item.dt_txt);
        return itemDate >= now && itemDate <= next24Hours;
      }).map(item => ({
        date: item.dt_txt,
        temp: parseFloat((item.main.temp - 273.15).toFixed(2)),// convert from Kelvin to Celsius
        temp_min: parseFloat((item.main.temp_min - 273.15).toFixed(2)), // min temperature
        temp_max: parseFloat((item.main.temp_max - 273.15).toFixed(2)), // max temperature
        desc: item.weather[0].description,
        humidity: item.main.humidity,
      }));

    return (
      <React.Fragment>
        <h2 className="weatherTitle">Weather Forecast</h2>
        {weather && <h3 className="weatherTitle">{weather.city.name},{weather.city.country}</h3>}

        {weather ?
          <ResponsiveContainer className="weather7days" width="100%" height={300}>
            <ComposedChart
              data={chartDataArray}
              margin={{
                top: 20, right: 30, left: 0, bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
              <XAxis dataKey="date" stroke="#ffffff" padding={{ left: 30, right: 30 }} tickFormatter={(str) => {
                const date = str.split('-');
                return `${date[2]}/${date[1]}`;
              }}>
                <Label value="Date" offset={-15} position="insideBottom" fill="#ffffff" />
              </XAxis>
              <YAxis domain={['auto', 'auto']} stroke="#ffffff">
                <Label value="Temp (°C)" angle={-90} position="insideLeft" fill="#ffffff" />
              </YAxis>
              <Tooltip />
              <Line type="monotone" dataKey="temp_min" stroke="#8884d8" dot>
                <LabelList dataKey="temp_min" position="bottom" fill="#8884d8" />
              </Line>
              <Line type="monotone" dataKey="temp_max" stroke="#82ca9d" dot>
                <LabelList dataKey="temp_max" position="top" fill="#82ca9d" />
              </Line>
            </ComposedChart>
          </ResponsiveContainer>
          : <p className="loadingWeatherNotify">Loading weather...</p>}

        {weather ?
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData24Hours}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
              <XAxis dataKey="time" stroke="#ffffff">
                <Label value="Time" offset={-5} position="insideBottom" fill="#ffffff" />
              </XAxis>
              <YAxis stroke="#ffffff">
                <Label value="Temp (°C)" angle={-90} position="insideLeft" fill="#ffffff" />
              </YAxis>
              <Tooltip />
              <Bar dataKey="temp" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          : <p className="loadingWeatherNotify">Loading weather...</p>}

        {weather ? 
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart
            data={chartData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
            <XAxis dataKey="date" stroke="#ffffff">
              <Label value="Date" offset={-5} position="insideBottom" fill="#ffffff" />
            </XAxis>
            <YAxis stroke="#ffffff">
              <Label value="Temp (°C)" angle={-90} position="insideLeft" fill="#ffffff" />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="temp" stroke="#ff7300" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
        : <p className="loadingWeatherNotify">Loading weather...</p>}
        
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

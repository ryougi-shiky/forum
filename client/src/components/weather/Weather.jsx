import "./weather.css";

import React, { useState, useEffect, useContext } from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, ComposedChart, Bar, ResponsiveContainer, Label, BarChart,
    LabelList
} from 'recharts';

import axios from "axios";

const weather_api_key = process.env.REACT_APP_OPEN_WEATHER_RAPID_API_KEY;

export default function Weather() {
    const [weather, setWeather] = useState();
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
                    url: `https://open-weather13.p.rapidapi.com/city/fivedaysforcast/${latitude}/${longitude}`,
                    headers: {
                        'X-RapidAPI-Key': `${weather_api_key}`,
                        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
                    }
                };

                try {
                    const response = await axios.request(options);
                    setWeather(response.data);
                    // console.log("weather response.data: ", response.data)
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


    // Prepare the data for the composed chart
    const chartData5Days = weather?.list
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
    const chartDataArray = Object.values(chartData5Days || {});

    const chartData24Hours = weather?.list
        .filter(item => {
            let itemDate = new Date(item.dt_txt);
            return itemDate >= now && itemDate <= next24Hours;
        }).map(item => ({
            time: item.dt_txt.substring(11, 16),  // take only time part
            temp: Math.round(item.main.temp - 273.15),// convert from Kelvin to Celsius
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
          <ResponsiveContainer className="weather5days glassSty" width="100%" height={300}>
            <ComposedChart
              data={chartDataArray}
              margin={{
                top: 20, right: 30, left: 0, bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="none" />
              <XAxis 
                dataKey="date" 
                stroke="none" 
                padding={{ left: -20, right: 0 }} 
                interval={0}
                tick={({ x, y, payload })=>{
                    const date = payload.value.split('-');
                    return (
                    <text x={x} y={y} fill="#666" textAnchor="middle" dy={20} style={{fontSize: '10px'}}>
                        {`${date[2]}/${date[1]}`}
                    </text>
                    )
                }}>
                <Label value="Date" offset={-20} position="insideBottom" fill="none" />
							</XAxis>
							<YAxis domain={['auto', 'auto']} stroke="none">
								<Label value="Temp (°C)" angle={-90} position="insideLeft" fill="none" />
							</YAxis>
							<Line type="linear" dataKey="temp_min" stroke="#8884d8" dot>
								<LabelList
									dataKey="temp_min"
									position="bottom"
									fill="none"
									style={{ fontSize: '10px' }}
									content={({ x, y, value }) => (
										<text x={x} y={y + 15} fill="#000000" fontSize="10" textAnchor="middle">
											{`${value}°`}
										</text>
									)}
								/>
							</Line>
							<Line type="linear" dataKey="temp_max" stroke="#82ca9d" dot>
								<LabelList
									dataKey="temp_max"
									position="top"
									fill="none"
									style={{ fontSize: '10px' }}
									content={({ x, y, value }) => (
										<text x={x} y={y - 7} fill="#000000" fontSize="10" textAnchor="middle">
											{`${value}°`}
										</text>
									)}
								/>
							</Line>
            </ComposedChart>
          </ResponsiveContainer>
          : <p className="loadingWeatherNotify">Loading weather...</p>}

        {weather ?
          <ResponsiveContainer className="weather24h glassSty" width="100%" height={300}>
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
        
        
      </React.Fragment>
    )
}


import React, { useContext, useRef, useReducer } from 'react';

import { AuthContext } from '../../context/AuthContext';
import AuthReducer from '../../context/AuthReducer';
import { loginCall } from '../../apiCalls';

import "./login.css";

import axios from "axios";
// import { CircularProgress } from '@chakra-ui/react'
import { CircularProgress } from '@mui/material';

export default function Login() {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const email = useRef();
  const password = useRef();
  const {user, isFetching, error, dispatch} = useContext(AuthContext);
  
  const handleClick = (e) => {
    e.preventDefault();
    console.log("email: ", email.current.value, " password: ", password.current.value, " dispatch: ", dispatch);
    loginCall({email: email.current.value, password: password.current.value}, dispatch)
  }

  console.log("user: ", user);

  return (
    <React.Fragment>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Ani Ani Login</h3>
            <span className="loginDesc">
              Connect with another Ani friends here ^&^
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
              <input 
                placeholder='Email' 
                required 
                type="email" 
                className="loginInput" 
                ref={email} />
              <input 
                placeholder='Password' 
                required 
                type="password" 
                className="loginInput" 
                ref={password} 
                minLength="6" />
              <button className="loginButton" type='submit' disabled={isFetching}>
                { isFetching 
                ? (<CircularProgress value={80} color='white' size='20px' />)
                : ("Log In") }
              </button>
              <span className="loginForgot">Forgot Password?</span>
              <button className="loginRegisterButton">Register</button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

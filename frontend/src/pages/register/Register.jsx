import React from 'react';
import { useRef, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import "./register.css";
import { AuthContext } from '../../context/AuthContext';
import { loginCall } from '../../apiCall';
import axios from 'axios';

export default function Register() {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const {user, isFetching, error, dispatch} = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [unameDupErr, setUnameDupErr] = useState(""); // error message when username is already used
  const [emailDupErr, setEmailDupErr] = useState(""); // error message when email is already used

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setUnameDupErr(""); // reset the error message
    setEmailDupErr("");

    if (passwordAgain.current.value !== password.current.value){
      password.current.setCustomValidity("Passwords don't match !");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        const res = await axios.post(`${backend_url}/users/auth/register`, user);
        navigate('/login');
      } catch (err) {
        if (err.response.status === 400){
          if (err.response.data.type === "unameDupErr"){
            setUnameDupErr(err.response.data.message);
            console.log("setUnameDupErr: ", setUnameDupErr);
          } else if (err.response.data.type === "emailDupErr"){
            setEmailDupErr(err.response.data.message);
            console.log("setEmailDupErr: ", setEmailDupErr);
          }
          
        } else {
          console.log(err);
        }
      }
    }
  }
  console.log("register page user: ", user);

  useEffect(() => {
    if (cookies.user){
      loginCall({email: cookies.user.email, password: cookies.user.password}, dispatch);
    }
  }, []);

  console.log("register page cookie: ", cookies);

  return (
    <React.Fragment>
      <div className="register">
        <div className="registerWrapper">
          <div className="registerLeft">
            <h3 className="registerLogo">Ani Ani Register</h3>
            <span className="registerDesc">
              Connect with another Ani friends here ^&^
            </span>
          </div>
          <div className="registerRight">
            <form className="registerBox" onSubmit={handleClick}>
              <input placeholder='Username' type="text" className="registerInput" ref={username} required />
              {unameDupErr && <p className="error-msg">{unameDupErr}</p>} {/*show username already used error message*/}
              <input placeholder='Email' type="email" className="registerInput" ref={email} required />
              {emailDupErr && <p className="error-msg">{emailDupErr}</p>} {/*show email already used error message*/}
              <input placeholder='Password' type="password" className="registerInput" ref={password} required minLength={6} />
              <input placeholder='Password Again' type="password" className="registerInput" ref={passwordAgain} required />
              <button className="registerButton" type='submit'>Sign Up</button>
              <span className="registerForgot">Already had an account?</span>
              <Link to='/login'><button className="registerRegisterButton">Log into Account</button></Link>
            </form>
            {/* <button className="registerRegisterButton" type='button' onClick={toLogin} >Log into Account</button> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

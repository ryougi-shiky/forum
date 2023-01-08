import React from 'react';
import { useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import "./register.css";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Register() {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const {user, isFetching, error, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
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
        console.log(err);
      }
      
    }
  }
  console.log(user);

  const toLogin = () => {
    navigate('/login');
  }

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
              <input placeholder='Email' type="email" className="registerInput" ref={email} required />
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

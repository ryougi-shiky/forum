import React from 'react'
import "./login.css";

export default function Login() {
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
            <div className="loginBox">
              <input placeholder='Email' type="text" className="loginInput" />
              <input placeholder='Password' type="text" className="loginInput" />
              <button className="loginButton">Log In</button>
              <span className="loginForgot">Forgot Password?</span>
              <button className="loginRegisterButton">Register</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

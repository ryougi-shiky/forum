import React from 'react'
import "./register.css";

export default function Register() {
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
            <div className="registerBox">
              <input placeholder='Username' type="text" className="registerInput" />
              <input placeholder='Email' type="text" className="registerInput" />
              <input placeholder='Password' type="text" className="registerInput" />
              <input placeholder='Password Again' type="text" className="registerInput" />
              <button className="registerButton">Sign Up</button>
              <span className="registerForgot">Already had an account?</span>
              <button className="registerRegisterButton">Log into Account</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

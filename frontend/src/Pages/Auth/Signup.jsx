import React from "react";
import "./Login.scss";
import { SiChinaeasternairlines } from "react-icons/si";
import { NavLink } from "react-router-dom";

const Signup = () => {
  return (
    <div className="loginBody">
      <div className="container">
        <form>
          <div className="logo">
            <SiChinaeasternairlines />

            <h2>Fly Easy </h2>
          </div>
          <div className="inputs">
            <input type="text" placeholder=" E-mail" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Name" />

            <input type="text" placeholder="Phone Number" />
            <input type="text" placeholder="Adress" />
          </div>

          <button>Sign Up</button>
          <div className="foot">
            <p>Forgot Password ?</p>
            <p>
              <NavLink to="/login">Log In</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

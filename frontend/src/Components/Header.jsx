import React, { createContext, useContext } from "react";
import "./Component.scss";
import { SiChinaeasternairlines } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { context } from "../../src/main";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/user/logout", {
        withCredentials: true,
      });

      toast.success(response.data.message);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      toast.error(error);
      setIsAuthenticated(true);
    }
  };
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <h2>Fly Easy </h2>
          <div>
            {" "}
            <SiChinaeasternairlines />
          </div>
        </div>
        <div className="links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about-us">About us</NavLink>
          <NavLink to="/where-we-fly">Where We Fly</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/my-ticket">Ticket</NavLink>
        </div>
        <div className="auth">
          {!isAuthenticated ? (
            <>
              <div className="login ls">
                {" "}
                <NavLink to="/login">Log in</NavLink>
              </div>
              <div className="signup ls">
                <NavLink to="/signup">Sign up</NavLink>
              </div>
            </>
          ) : (
            <div className="logout">
              <button onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;

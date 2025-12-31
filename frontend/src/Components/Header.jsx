import { useContext, useEffect, useState } from "react";
import "./Component.scss";
import { SiChinaeasternairlines } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

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
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="logo">
          <div className="logo-icon">
            <SiChinaeasternairlines />
          </div>
          <h2>Fly Easy</h2>
        </div>

        {/* CSS-only toggle for small screens: checkbox + label (hamburger) */}
        <input type="checkbox" id="nav-toggle" className="nav-toggle" aria-hidden="true" />
        <label htmlFor="nav-toggle" className="nav-toggle-label" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <div className="links" id="home-links">
          <NavLink to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >Home</NavLink>
          <NavLink to="/about-us">About us</NavLink>
          <NavLink to="/blog">Reviews</NavLink>
          <NavLink to="/my-ticket">Ticket</NavLink>
        </div>
        <div className="auth">
          {!isAuthenticated ? (
            <>
              <div className="login ls">
                <NavLink to="/login">Log in</NavLink>
              </div>
              <div className="signup ls">
                <NavLink to="/signup">Sign up</NavLink>
              </div>
            </>
          ) : (
            <div className="logout">
              <button onClick={handleLogout} aria-label="Logout"></button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;

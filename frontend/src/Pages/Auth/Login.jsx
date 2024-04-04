import React, { useContext, useState } from "react";
import "./Login.scss";
import { SiChinaeasternairlines } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { context } from "../../main";
import { useCookies } from "react-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const [cookies, setCookies] = useCookies("token");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "/api/user/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.data.success) {
      toast.success("Login successful");
      setCookies("token", response.data.token);
      setIsAuthenticated(true);
      localStorage.setItem("token", response.data.token);
    
      navigate("/");
    }
    else {
      toast.error(response.data.message);
      setIsAuthenticated(false);
    }
  };

  

  return (
    <div className="loginBody">
      <div className="container">
        <form>
          <div className="logo">
            <SiChinaeasternairlines />

            <h2>Fly Easy </h2>
          </div>
          <div className="inputs">
            <input
              type="text"
              placeholder="Username or E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={handleLogin}>Sign In</button>
          <div className="foot">
            <p>Forgot Password ?</p>
            <p>
              <NavLink to="/signup">Sign Up</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

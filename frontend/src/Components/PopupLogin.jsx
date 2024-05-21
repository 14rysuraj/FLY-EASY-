import React, { useContext, useState } from "react";
import "./PopupLogin.scss";
import { context, showLogin } from "../main";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";

function PopupLogin() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { showPopupLogin, setShowPopupLogin } = useContext(showLogin);
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
          toast.success("Logged In Successfully");
          setCookies("token", response.data.token);
          setIsAuthenticated(true);
          localStorage.setItem("token", response.data.token);
          
            setShowPopupLogin(false);

            window.location.reload();
         
    
        }
        else {
          toast.error(response.data.message);
            setIsAuthenticated(false);
            
        }
      };

  const handleClose = () => {
   setShowPopupLogin(false);
  };

  return (
    <>
      {showPopupLogin ? (
        <div className="popuplogin">
          <div className="popup">
            <div className="popup-inner">
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <label>
                  Email:
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label>
                  Password:
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <button type="submit" onClick={handleLogin}>Login</button>
                <button className="close" onClick={handleClose}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default PopupLogin;

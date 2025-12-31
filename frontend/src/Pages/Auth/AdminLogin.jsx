import React, { useContext, useState } from "react";
import { adminContext } from "../../main";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AdminLogin = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies("admintoken");
  const { isAdminAuthenticated, setIsAdminAuthenticated } =
    useContext(adminContext);
  
    const handleLogin = async (e) => {
      try {
        e.preventDefault();
  
        if (!email) return toast.error("Please enter your email address!");
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        return toast.error("Invalid Email Address!");
        if (!password) return toast.error("Please enter your password!");
  
        const response = await axios.post(
          "/api/admin/login",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // this is to make the cookie available for cross domain access
          }
        );
  
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem("admintoken", response.data.admintoken);
          setIsAdminAuthenticated(true);
          navigate("/admin/user-details");
        } else {
          toast.error(response.data.message);
          setIsAdminAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
  

  return (
    <div className="admin-login">
    
      <div className="container">
      <h2>Admin Login</h2>
      <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
       <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
};

export default AdminLogin;

import React, { useState } from "react";
import "./Login.scss";
import { SiChinaeasternairlines } from "react-icons/si";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");



  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) return toast.error("Please enter your name!");

    


      if (!phone)
        return toast.error("Please provide a valid phone number!");
      if (phone.length !== 10) {
        return toast.error("Please enter a valid phone number!");
      }

      if (!email) return toast.error("Please enter your email address!");
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        return toast.error("Invalid Email Address!");
      else if (!password || password.length < 8)
        return toast.error("Password must be at least 8 characters long.");
    const response = await axios.post("/api/user/signup", {
  
      email: email,
      password: password,
      name: name,
      phone: phone,
      address: address,
    },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.data.success) {
      toast.success("Signup successful");
      navigate("/login");
    } else {
      toast.error("something went wrong");
    }
  }




  return (
    <div className="loginBody">
      <div className="container">
        <form>
          <div className="logo">
            <SiChinaeasternairlines />

            <h2>Fly Easy </h2>
          </div>
          <div className="inputs">
            <input type="text" placeholder=" E-mail"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <input type="text" placeholder="Name"  value={name} onChange={(e)=>setName(e.target.value)} />

            <input type="text" placeholder="Phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            <input type="text" placeholder="Address"  value={address} onChange={(e)=>setAddress(e.target.value)}/>
          </div>

          <button onClick={handleSignup}>Sign Up</button>
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

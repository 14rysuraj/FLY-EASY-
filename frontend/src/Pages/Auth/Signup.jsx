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

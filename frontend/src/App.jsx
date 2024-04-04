import React, { useContext, useEffect, useState } from "react";
import Home from "./Pages/Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./Pages/Blog/Blog";
import Header from "./Components/Header";
import Aboutus from "./Pages/Aboutus/Aboutus";
import WhereWeFly from "./Pages/WhereWeFly/WhereWeFly";
import MyTicket from "./Pages/MyTicket/MyTicket";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import AllPosts from "./Pages/Posts/AllPosts";
import YourPosts from "./Pages/Posts/YourPosts";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import "./index.css";
import Availability from "./Pages/Availability/Availability";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { context } from "./main";
import { useCookies } from "react-cookie";

const App = () => {

  const { setIsAuthenticated } = useContext(context);
  const [cookie, setCookies] = useCookies("token");


  useEffect(() => {
    
    const user = localStorage.getItem("token");
    if (user) {
      setIsAuthenticated(true);
      setCookies("token", user);
    } else {
      setCookies("token","")
      setIsAuthenticated(false);
     
    }
  }, []);

  return (
    <>
      <PrimeReactProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blog" element={<Blog />}>
              <Route path="/blog" element={<AllPosts />} />
              <Route path="/blog/:id" element={<YourPosts />} />
            </Route>

            <Route path="/about-us" element={<Aboutus />} />
            <Route path="/where-we-fly" element={<WhereWeFly />} />
            <Route path="/my-ticket" element={<MyTicket />} />
            <Route path="/availability" element={<Availability />} />
          </Routes>
        </BrowserRouter>
      </PrimeReactProvider>
      <ToastContainer />
    </>
  );
};

export default App;

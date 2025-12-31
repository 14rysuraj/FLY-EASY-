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
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import "./index.css";
import Availability from "./Pages/Availability/Availability";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminContext, context } from "./main";
import { useCookies } from "react-cookie";
import Footer from "./Components/Footer";
import Payment from "./Pages/Payment/Payment";
import PopupLogin from "./Components/PopupLogin";
import Modify from "./Pages/ModifyBooking/Modify";
import Admin from "./Pages/Admin/Admin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import UserDetails from "./Pages/Admin/UserDetails";
import BookingDetails from "./Pages/Admin/BookingDetails";
import ManageFlights from "./Pages/Admin/ManageFlights";
import AdminLogin from "./Pages/Auth/AdminLogin";

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useContext(adminContext);
  const [cookie, setCookies] = useCookies("token");

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setIsAuthenticated(true);
      setCookies("token", user);
    } else {
      setCookies("token", "");
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const admin = localStorage.getItem("admintoken");
    if (admin) {
      setIsAdminAuthenticated(true);
    } else {
      setIsAdminAuthenticated(false);
    }
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
          {!location.pathname.startsWith("/admin") ? <Header/> :""}
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/adm-login" element={<AdminLogin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/modify" element={<Modify />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about-us" element={<Aboutus />} />

              <Route
                path="/my-ticket"
                element={isAuthenticated ? <MyTicket /> : <Login />}
              />
              <Route path="/availability" element={<Availability />} />
              <Route path="/availability/payment" element={<Payment />} />
             
         
           
            <Route path="/admin" element={isAdminAuthenticated ?<Admin />: <AdminLogin/>} >
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/user-details" element={<UserDetails />} />
              <Route path="/admin/booking-details" element={<BookingDetails />} />
              <Route path="/admin/manage-flights" element={<ManageFlights/>} />
              </Route>
            


          </Routes>

          {!location.pathname.startsWith("/admin")?<Footer/>:""}
        
        
        </BrowserRouter>
      </PrimeReactProvider>
      <ToastContainer />
    </>
  );
};

export default App;

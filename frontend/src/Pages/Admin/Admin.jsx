import React, { useContext, useEffect, useState } from "react";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
import { IoIosOptions } from "react-icons/io";
import Avatar from "react-avatar";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../../main";


const Dashboard = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useContext(adminContext);

  const handleShowSideBar = () => {
    setShowSideBar((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/admin/profile");

      setData(response.data.admin);
    };

    fetchData();
  }, []);

  console.log(data);

  const handleLogout = async (e) => {
    try {
      const response = await axios.get("/api/admin/logout", {
        withCredentials: true,
      });

      toast.success(response.data.message);
      localStorage.removeItem("admintoken");
      setIsAdminAuthenticated(false);
      navigate("/login");
    } catch (error) {
      toast.error("error occured");
      setIsAdminAuthenticated(true);
    }
  };
  

  return (
    <div className="admin">
      <nav>
        <div>
          <button onClick={handleShowSideBar} className="header-btn">
            <IoIosOptions />
          </button>
        </div>
        <div >
          <Avatar facebookId="100008343750912" size="30" round={true} />
          <span>{data?.email}</span>
          <button className="admin-logout" onClick={handleLogout}><IoIosLogOut />
</button>
        </div>
      </nav>

      <div className="admin-container">
        <div
          className="aside"
          style={{
            transform: showSideBar ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <div className="links" id="links">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/user-details"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              User Details
            </NavLink>
            <NavLink
              to="/admin/booking-details"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Booking Details
            </NavLink>
            <NavLink
              to="/admin/manage-flights"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Manage Flights
            </NavLink>
          </div>
        </div>

        <div
          className={`hero-page ${showSideBar ? "with-sidebar" : "full-width"}`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

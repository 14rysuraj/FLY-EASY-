import React, { useContext, useEffect, useState } from "react";
import "./Component.scss";
import { NavLink } from "react-router-dom";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { context, showLogin } from "../main";
import axios from "axios";

const Book = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPassengerOptions, setShowPassengerOptions] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [currentSelectionType, setCurrentSelectionType] = useState(""); // "from" or "to"
  const [searchQuery, setSearchQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [className, setClassName] = useState("Economy");
  const [tripType, setTripType] = useState("OneWay");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adult, setadult] = useState(1);
  const [child, setchild] = useState(0);
  const { showPopupLogin, setShowPopupLogin } = useContext(showLogin);
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const [bookingId, setBookingId] = useState("");
  const [email, setEmail] = useState("");
  const [flightId, setFlightId] = useState("");

  const locations = [
    "Kathmandu",
    "Pokhara",
    "Lumbini",
    "Bhaktapur",
    "Bharatpur",
    "Biratnagar",
    "Janakpur",
    "Surkhet",
    "Nepaljung",
    "Bhadrapur",
    "Bajhang",
    "Simara",
    "Dhangadhi",
    "Dolpa",
    "Ramechhap",
  ];

  const handleShowFlight = () => {
    if (!from) return toast.error("Please select a source");
    if (!to) return toast.error("Please select a destination");
    if (from === to) return toast.error("Please select a different location");
    if (!className) return toast.error("Please select a class");
    if (!tripType) return toast.error("Please select a trip type");
    if (!departureDate) return toast.error("Please select a departure date");
    if (!returnDate && tripType === "RoundTrip")
      return toast.error("Please enter a return date");

    navigate("/availability", {
      state: {
        from,
        to,
        className,
        tripType,
        departureDate,
        returnDate,
        adult,
        child,
      },
    });
  };

  console.log(from + to);

  let totalPassenger = 0;
  totalPassenger += adult + child;

  useEffect(() => {
    totalPassenger = adult + child;
  }, [adult, child]);

  const subtractAdult = (e) => {
    e.preventDefault();
    setadult((prev) => parseInt(prev) - 1);
  };
  const addAdult = (e) => {
    e.preventDefault();
    setadult((prev) => parseInt(prev) + 1);
  };

  const subtractChild = (e) => {
    e.preventDefault();
    setchild((prev) => parseInt(prev) - 1);
  };

  const addChild = (e) => {
    e.preventDefault();
    setchild((prev) => parseInt(prev) + 1);
  };

  const handleNavLinkClick = (link) => {
    setShowPopup(link === "MANAGE" ? true : false); // Show popup for manage booking
    setActiveLink(link); // Set active link
  };

  const handleSwapValue = (e) => {
    e.preventDefault();
    let tempFrom = from;
    let tempTo = to;
    setFrom(tempTo);
    setTo(tempFrom);
  };

  const handleManageBooking = async () => {
    if (!isAuthenticated) {
      setShowPopupLogin(true);
    } else {
      try {
        const response = await axios.get(`/api/flights/modify`, {
          params: {
            bookingId,
            email,
          },
        });

        if (response.data.success) {
          console.log(bookingId);

          navigate("/modify", {
            state: {
              bookingId,
            },
          });
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("An error occurred while processing your request.");
        console.error("Error in handleManageBooking:", error);
      }
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.customDropdown')) {
        setShowFromDropdown(false);
        setShowToDropdown(false);
      }
      if (!event.target.closest('.passenger')) {
        setShowPassengerOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpenLocationPopup = (type) => {
    setCurrentSelectionType(type);
    setShowLocationPopup(true);
    setSearchQuery("");
  };

  const handleSelectLocation = (location) => {
    if (currentSelectionType === "from") {
      setFrom(location);
    } else {
      setTo(location);
    }
    setShowLocationPopup(false);
    setSearchQuery("");
  };

  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let today = new Date().toISOString().split("T")[0];
  let today1 = new Date();

  return (
    <div className="bookBody">
      <div className="container">
        <div className="links">
          <NavLink
            to="/"
            style={{ color: activeLink === "SEARCH" ? "red" : "inherit" }}
            onClick={() => handleNavLinkClick("SEARCH")}
          >
            SEARCH FLIGHT
          </NavLink>
          <NavLink
            to="/"
            style={{ color: activeLink === "MANAGE" ? "red" : "inherit" }}
            onClick={() => handleNavLinkClick("MANAGE")}
          >
            MANAGE BOOKING
          </NavLink>
        </div>
        <div className="mainBook">
          <div className="fromto">
            <div
              className="locationSelector"
              onClick={() => handleOpenLocationPopup("from")}
            >
              <span className="label">FROM</span>
              <span className="value">{from || "Select Location"}</span>
            </div>
            <button onClick={handleSwapValue}>
              {" "}
              <LiaExchangeAltSolid />
            </button>
            <div
              className="locationSelector"
              onClick={() => handleOpenLocationPopup("to")}
            >
              <span className="label">TO</span>
              <span className="value">{to || "Select Location"}</span>
            </div>
          </div>
          <div className="options">
            <div className="tripType">
              <select onChange={(e) => setClassName(e.target.value)}>
                <option value="Economy">Economy</option>

                <option value="First">First</option>
                <option value="Business">Business</option>
              </select>
              <select onChange={(e) => setTripType(e.target.value)}>
                <option value="OneWay">One Way</option>
                <option value="RoundTrip">Round Trip</option>
              </select>
            </div>
            <div className="dates">
              <div className="departure dr">
                <p>Depart</p>
                <input
                  type="date"
                  value={departureDate}
                  min={today}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </div>
              <div className="return dr">
                <p>Return</p>
                {tripType === "OneWay" ? (
                  <input
                    type="date"
                    value={returnDate}
                    disabled
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                ) : (
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                )}
              </div>
            </div>
            <div className="boundry"></div>

            <div className="passenger">
              <p>Passenger ({totalPassenger})</p>
              <div className="selects">
                {showPassengerOptions ? (
                  <div className="psgoptions">
                    <div className="adult">
                      <dix className="first">
                        <h5>Adult</h5>
                        <p>12 years and above</p>
                      </dix>
                      <dix className="feature">
                        <button onClick={subtractAdult} disabled={adult <= 1}>
                          -
                        </button>
                        <p>{adult}</p>
                        <button
                          onClick={addAdult}
                          disabled={totalPassenger > 7}
                        >
                          +
                        </button>
                      </dix>
                    </div>

                    <div className="adult">
                      <dix className="first">
                        <h5>Child</h5>
                        <p>2-11 years at time of travel</p>
                      </dix>
                      <dix className="feature">
                        <button onClick={subtractChild} disabled={child <= 0}>
                          -
                        </button>
                        <p>{child}</p>
                        <button
                          onClick={addChild}
                          disabled={totalPassenger > 7}
                        >
                          +
                        </button>
                      </dix>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <h5>
                  Adult {adult} {child > 0 ? <p>, Child {child}</p> : ""}
                </h5>
                <button
                  onClick={() => setShowPassengerOptions((prev) => !prev)}
                >
                  <MdOutlineKeyboardArrowDown />
                </button>
              </div>
            </div>
            <button onClick={handleShowFlight}>Show Flight</button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup" onClick={() => setShowPopup(false)}>
          <div className="popupContent" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Booking ID"
              autoCorrect="flase"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
            />
            <input
              type="text"
              placeholder=" Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={handleManageBooking}>Submit</button>
          </div>
        </div>
      )}

      {showLocationPopup && (
        <div className="locationPopup" onClick={() => setShowLocationPopup(false)}>
          <div className="locationPopupContent" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Search location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="locationOptions">
              {filteredLocations.map((location, index) => (
                <div
                  key={index}
                  className="locationOption"
                  onClick={() => handleSelectLocation(location)}
                >
                  {location}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;

import React, { useEffect, useState } from "react";
import "./Component.scss";
import { NavLink } from "react-router-dom";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Book = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPassengerOptions, setShowPassengerOptions] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [className, setClassName] = useState("Economy");
  const [tripType, setTripType] = useState("OneWay");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adult, setadult] = useState(1);
  const [child, setchild] = useState(0);

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
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              <option value=""> FROM</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Pokhara">Pokhara</option>
              <option value="Lumbini">Lumbini</option>
              <option value="Bhaktapur">Bhaktapur</option>
            </select>
            <button onClick={handleSwapValue}>
              {" "}
              <LiaExchangeAltSolid />
            </button>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              <option value=""> TO</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Pokhara">Pokhara</option>
              <option value="Lumbini">Lumbini</option>
              <option value="Bhaktapur">Bhaktapur</option>
            </select>
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
        <div className="popup">
          <div className="popupContent">
            <input type="text" placeholder="Booking ID" autoCorrect="flase"/>
            <input type="text" placeholder="Your Name or Email" />

            <button>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;

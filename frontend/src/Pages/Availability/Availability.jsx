import React from "react";
import { useState, useEffect } from "react";
import "./Availability.scss";
import { LiaPlaneDepartureSolid } from "react-icons/lia";
import { PiAirplaneLandingBold } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Availability = () => {
  const [flightId, setFlightId] = useState("");
  console.log(flightId);
  const [showPassengerDetails, setShowPassengerDetails] = useState(false);
  const [showModify, setShowModify] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state;
  const [from, setFrom] = useState(
    () => localStorage.getItem("from") || formData?.from || ""
  );
  const [to, setTo] = useState(
    () => localStorage.getItem("to") || formData?.to || ""
  );
  const [className, setClassName] = useState(
    () => localStorage.getItem("className") || formData?.className || ""
  );

  const [tripType, setTripType] = useState(
    () => localStorage.getItem("tripType") || formData?.tripType || ""
  );
  const [departureDate, setDepartureDate] = useState(
    () => localStorage.getItem("departureDate") || formData?.departureDate || ""
  );

  const [flights, setFlights] = useState([]);
  const [totalPassenger, setTotalPassenger] = useState(
    formData.adult + formData.child
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/api/flights/search?departureAirport=${from}&arrivalAirport=${to}&departureDate=${departureDate}`
      );
      setFlights(response.data.flights);
    };
    fetchData();
  }, []);

  console.log(flights);

  useEffect(() => {
    localStorage.setItem("from", from);
    localStorage.setItem("to", to);
    localStorage.setItem("className", className);
    localStorage.setItem("tripType", tripType);
    localStorage.setItem("departureDate", departureDate);
  }, [from, to, className, tripType, departureDate]);

  useEffect(() => {
    setFrom(localStorage.getItem("from"));
    setTo(localStorage.getItem("to"));
    setClassName(localStorage.getItem("className"));
    setTripType(localStorage.getItem("tripType"));
    setDepartureDate(localStorage.getItem("departureDate"));
  }, [location]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("from");
      localStorage.removeItem("to");
      localStorage.removeItem("className");
      localStorage.removeItem("tripType");
      localStorage.removeItem("departureDate");
    };
  }, []);

  const handleSearch = () => {
    navigate(window.location.reload(), { replace: true });
  };

  //passenger filds rendereing dynamically
  const [passengerInfo, setPassengerInfo] = useState([]);

  const handleTitleChange = (e, index) => {
    const updatedPassengerInfo = [...passengerInfo];
    updatedPassengerInfo[index] = {
      ...updatedPassengerInfo[index],
      title: e.target.value,
    };
    setPassengerInfo(updatedPassengerInfo);
  };

  const handleFirstNameChange = (e, index) => {
    const updatedPassengerInfo = [...passengerInfo];
    updatedPassengerInfo[index] = {
      ...updatedPassengerInfo[index],
      firstName: e.target.value,
    };
    setPassengerInfo(updatedPassengerInfo);
  };

  const handleLastNameChange = (e, index) => {
    const updatedPassengerInfo = [...passengerInfo];
    updatedPassengerInfo[index] = {
      ...updatedPassengerInfo[index],
      lastName: e.target.value,
    };
    setPassengerInfo(updatedPassengerInfo);
  };

  const renderPassengerInputs = () => {
    let inputs = [];
    for (let i = 0; i < totalPassenger; i++) {
      inputs.push(
        <div className="passengerInfo" key={i}>
          <select onChange={(e) => handleTitleChange(e, i)}>
            <option value="">Title</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => handleFirstNameChange(e, i)}
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => handleLastNameChange(e, i)}
          />
        </div>
      );
    }
    return inputs;
  };

  const handleContinue = (e, i) => {
    setFlightId(flights[i]._id);
    setShowPassengerDetails((prev) => !prev);
  };
  console.log(flightId);

  return (
    <div className="availabilityBody">
      <div className="header">
        <div className="first">
          <div>
            <p>{departureDate}</p>
            <h2>{from}</h2>
          </div>
          <div className="logo">
            <LiaPlaneDepartureSolid />
            <p> -------Departure--------</p>
            <PiAirplaneLandingBold />
          </div>
          <div>
            <p>{departureDate}</p>
            <h2>{to}</h2>
          </div>
        </div>
        <button
          onClick={() => {
            setShowModify((prev) => !prev);
          }}
        >
          Modify Booking
        </button>
      </div>

      {showModify ? (
        <div className="showModifyOpt">
          <div className="inputs">
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              <option value="">From</option>
              <option value="Kathmandu">Kathmadu</option>
              <option value="Pokhara">Pokhara</option>
              <option value="Lumbini">Lumbini</option>
              <option value="Bhaktapur">Bhaktapur</option>
            </select>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              <option value=""> TO</option>
              <option value="Kathmandu">Kathmadu</option>
              <option value="Pokhara">Pokhara</option>
              <option value="Lumbini">Lumbini</option>
              <option value="Bhaktapur">Bhaktapur</option>
            </select>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
            <select>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First</option>
            </select>
            <select>
              <option value="OneWay">One Way</option>
              <option value="RoundTrip">Round Trip</option>
            </select>
          </div>
          <div className="buttons">
            <button
              onClick={() => {
                setShowModify((prev) => !prev);
              }}
            >
              Cancel
            </button>
            <button onClick={handleSearch}>Search Flight</button>
          </div>
        </div>
      ) : (
        ""
      )}

      {showPassengerDetails ? (
        <div className="showpassengers">
          <div className="container">
            <div className="heading">
              <h2>Passenger Details</h2>
              <button
                onClick={() => {
                  setShowPassengerDetails((prev) => !prev);
                }}
              >
                Go Back
              </button>
            </div>

            {renderPassengerInputs()}

            <div className="pay">
              <button>Pay Now</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="result">
          <div className="numOfFlight">
            <p>{flights.length} Flight found for your trip</p>
          </div>

          {flights.map((flight, i) => (
            <div key={i} className="flights">
              <div className="first">
                <p>{flight.flightNumber}</p>

                <div className="info">
                  <div className="departure a">
                    <p>
                      {new Date(flight.departureDate)
                        .toISOString()
                        .substr(0, 10)}
                    </p>
                    <h3>{flight.departureTime}</h3>
                    <h4>{flight.departureAirport}</h4>
                  </div>
                  <div className="logos">
                    <LiaPlaneDepartureSolid />
                    <p> -------FLY EASY--------</p>
                    <PiAirplaneLandingBold />
                  </div>
                  <div className="arrival a">
                    <p>
                      {new Date(flight.arrivalDate).toISOString().substr(0, 10)}
                    </p>

                    <h3>{flight.arrivalTime}</h3>

                    <h4>{flight.arrivalAirport}</h4>
                  </div>
                </div>
              </div>
              <div className="second">
                <div className="first">
                  <h3>Economy</h3>
                  <h2>{flight.price}</h2>
                </div>
                <div className="second first">
                  <p>{flight.seatsAvailable} seat left</p>
                  <button onClick={(e) => handleContinue(e, i)}>
                    Continue
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Availability;
